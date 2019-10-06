'use strict';

var PIN_OFFER_Y_MIN = 130;
var PIN_OFFER_Y_MAX = 630;
var PIN_OFFER_OFFSET_X = 25;
var PIN_OFFER_OFFSET_Y = 70;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var mapsWidth = document.querySelector('.map').offsetWidth;

var MAP_FADED_CLASS = 'map--faded';
var AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
var MAP_FILTER_DISABLED_CLASS = 'map__filters--disabled';

var map = document.querySelector('.map');
var mapFilterContainer = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var MAPS_PIN_MAIN_OFFSET = 31;
var MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE = 84;

var adFormAdress = document.querySelector('#address');
var adFormGuest = document.querySelector('#capacity');
var adFormRooms = document.querySelector('#room_number');
var adFormPrice = adForm.querySelector('#price');
var adFormType = adForm.querySelector('#type');
var adFormTimein = adForm.querySelector('#timein');
var adFormTimeout = adForm.querySelector('#timeout');

var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinOfferList = document.querySelector('.map__pins');

var OFFER_TITLES = ['Нельзя пройти мимо', 'Супердом', 'Фантастично', 'Ищешь квартиру', 'Дружелюбный домик', 'Большой Дом', 'Все Новое'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// возвращает случайное целое число из заданного диапазона
var getRandomIntegerValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

// возвращает случайное число из заданного диапазона
var getRandomValue = function (min, max) {
  return min + Math.random() * (max - min);
};

// Возвращает случайное значение из массива
var getRandomArrValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Возвращает случаное колличество элементов из массива
var getRandomArrNValues = function (array, n) {
  var arrayCopy = array.slice();
  var shuffled = arrayCopy.sort(function () {
    return Math.random() - 0.5;
  });
  return shuffled.slice(0, n);
};


// Получение координат элемента
var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  return {
    y: box.y + pageYOffset,
    x: box.x + pageXOffset
  };
};

// Координаты главной метки в неактивном состоянии
var getInactiveMainPinAddress = function () {
  var mainPinCoords = getCoords(mapPinMain);
  adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET);
};

// Координаты главной метки в активном состоянии
var getActiveMainPinAddress = function () {
  var mainPinCoords = getCoords(mapPinMain);
  adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE);
};
getInactiveMainPinAddress();

// Перевод страницы в актовное состояние
var makeFormElementsActive = function (form) {
  var formFieldsets = form.querySelectorAll('fieldset');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

var makePageActive = function () {
  map.classList.remove(MAP_FADED_CLASS);
  adForm.classList.remove(AD_FORM_DISABLED_CLASS);
  mapFiltersForm.classList.remove(MAP_FILTER_DISABLED_CLASS);
  makeFormElementsActive(adForm);
};

mapPinMain.addEventListener('mousedown', function () {
  makePageActive();
  getActiveMainPinAddress();
  createPinOffers();
  // openCard();
});

// var openCard = function () {
//   var fragment = document.createDocumentFragment();
//   var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');

//   for (var i = 1; i < pinOffersElements.length; i++) {
//     pinOffersElements[i].setAttribute('id', i);
//     pinOffersElements[i].addEventListener('click', function (evt) {
//       if (map.querySelector('.map__card')) {
//         map.removeChild(map.querySelector('.map__card'));
//       }
//       fragment.appendChild(renderCard(pinOffers[evt.currentTarget.id - 1]));
//       map.appendChild(fragment);
//     });
//   }
// };

var openCardOffer = function (evt) {
  var card = evt.target.closest('.map__pin');
  var mainCard = evt.target.closest('.map__pin--main');
  var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');

  if (!card) {
    return;
  }
  if (!pinOfferList.contains(card)) {
    return;
  }
  if (pinOfferList.contains(mainCard)) {
    return;
  }
  if (map.querySelector('.map__card')) {
    map.removeChild(map.querySelector('.map__card'));
  }
  for (var i = 1; i < pinOffersElements.length; i++) {
    pinOffersElements[i].setAttribute('id', i);
  }
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(pinOffers[card.id - 1]));
  map.insertBefore(fragment, mapFilterContainer);
};

var closeCardOffer = function (evt) {
  var offerCard = evt.target.closest('.map__card');
  offerCard.remove();
};

map.addEventListener('click', function (evt) {
  openCardOffer(evt);
});

map.addEventListener('click', function (evt) {
  if (evt.target.className !== 'popup__close') {
    return;
  }
  closeCardOffer(evt);
});

map.addEventListener('keydown', function (evt) {
  var offerCard = document.querySelector('.map__card');
  if (evt.keyCode === ESC_KEYCODE && offerCard) {
    offerCard.remove();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    makePageActive();
    getActiveMainPinAddress();
    createPinOffers();
  }
});


// Генерация объектов объявления
var renderAvatarLink = function (i) {
  return i < 10 ? 'img/avatars/user' + 0 + i + '.png' : 'img/avatars/user' + i + '.png';
};

var renderCoords = function () {
  return {
    x: getRandomValue(0 + PIN_OFFER_OFFSET_X, mapsWidth - PIN_OFFER_OFFSET_X),
    y: getRandomValue(PIN_OFFER_Y_MIN, PIN_OFFER_Y_MAX)
  };
};

var makePinOffer = function (i) {
  var pinCoordsХ = renderCoords().x;
  var pinCoordsY = renderCoords().y;
  var offerRooms = getRandomIntegerValue(1, 4);

  var getOfferGuestsValue = function (rooms) {
    return rooms >= 2 ? getRandomIntegerValue(4, 7) : getRandomIntegerValue(1, 3);
  };

  var pinOffer = {
    author: {
      avatar: renderAvatarLink(i)
    },

    offer: {
      title: getRandomArrValue(OFFER_TITLES),
      address: pinCoordsХ.toString() + ', ' + pinCoordsY.toString(),
      price: getRandomIntegerValue(100, 5000),
      type: getRandomArrValue(OFFER_TYPES),
      rooms: offerRooms,
      guests: getOfferGuestsValue(offerRooms),
      checkin: getRandomArrValue(OFFER_CHECKINS),
      checkout: getRandomArrValue(OFFER_CHECKINS),
      features: getRandomArrNValues(OFFER_FEATURES, getRandomIntegerValue(1, 6)),
      description: getRandomArrValue(OFFER_TITLES),
      photos: getRandomArrNValues(OFFER_PHOTOS, getRandomIntegerValue(1, 3))
    },

    location: {
      x: pinCoordsХ,
      y: pinCoordsY
    }
  };

  return pinOffer;
};

var makePinOfferArr = function () {
  var pinOfferArr = [];
  for (var i = 1; i <= 8; i++) {
    pinOfferArr.push(makePinOffer(i));
  }

  return pinOfferArr;
};

var pinOffers = makePinOfferArr();

// КАРТОЧКА ОБЪЯВЛЕНИЙ
var renderCard = function (pinOffer) {
  var offerCardElement = cardOfferTemplate.cloneNode(true);

  // Получение адреса фотографий
  var createOfferPhotoElement = function () {
    var popupPhotos = offerCardElement.querySelector('.popup__photos').querySelectorAll('img');
    popupPhotos.forEach(function (item) {
      item.remove();
    });

    for (var i = 0; i < pinOffer.offer.photos.length; i++) {
      var popupPhoto = document.createElement('img');
      popupPhoto.classList.add('popup__photo');
      popupPhoto.setAttribute('width', '45');
      popupPhoto.setAttribute('height', '40');
      offerCardElement.querySelector('.popup__photos').appendChild(popupPhoto);

      var popupPhotoElement = offerCardElement.querySelector('.popup__photos').querySelectorAll('img');
      popupPhotoElement[i].src = pinOffer.offer.photos[i];
    }
  };
  createOfferPhotoElement();

  // // Получение адреса фотографий
  // var createOfferPhotoElement = function () {
  //   for (var i = 0; i < pinOffer.offer.photos.length - 1; i++) {
  //     var PopupPhoto = offerCardElement.querySelector('.popup__photo').cloneNode(true);
  //     offerCardElement.querySelector('.popup__photos').appendChild(PopupPhoto);
  //   }
  // };
  // createOfferPhotoElement();

  // var setOfferPhotoElementAddress = function () {
  //   var photos = offerCardElement.querySelector('.popup__photos').querySelectorAll('img');
  //   for (var i = 0; i < pinOffer.offer.photos.length; i++) {
  //     photos[i].src = pinOffer.offer.photos[i];
  //   }
  // };

  // отображение типа помещения
  var offerType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var displayType = function () {
    var type = pinOffer.offer.type;
    return offerType[type];
  };

  // отображение преимуществ
  var setCardFeatures = function () {
    var features = offerCardElement.querySelectorAll('.popup__feature');

    features.forEach(function (item) {
      item.classList.add('visually-hidden');
      for (var i = 0; i < pinOffer.offer.features.length; i++) {
        if (item.classList.contains('popup__feature--' + pinOffer.offer.features[i])) {
          item.classList.remove('visually-hidden');
        }
      }
    });
  };

  offerCardElement.querySelector('img').src = pinOffer.author.avatar;
  offerCardElement.querySelector('.popup__title').textContent = pinOffer.offer.title;
  offerCardElement.querySelector('.popup__text--address').textContent = pinOffer.offer.address;
  offerCardElement.querySelector('.popup__text--price').textContent = pinOffer.offer.price + '₽/ночь';
  offerCardElement.querySelector('.popup__type').textContent = displayType();
  offerCardElement.querySelector('.popup__text--capacity').textContent = pinOffer.offer.rooms + ' комнаты для ' + pinOffer.offer.guests + ' гостей';
  offerCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;
  setCardFeatures();
  offerCardElement.querySelector('.popup__description').textContent = pinOffer.offer.description;
  createOfferPhotoElement();

  return offerCardElement;
};

var renderPin = function (pinOffer) {
  var offerPinElement = pinOfferTemplate.cloneNode(true);

  offerPinElement.style.left = pinOffer.location.x - PIN_OFFER_OFFSET_X + 'px';
  offerPinElement.style.top = pinOffer.location.y - PIN_OFFER_OFFSET_Y + 'px';
  offerPinElement.querySelector('img').src = pinOffer.author.avatar;
  offerPinElement.querySelector('img').alt = pinOffer.offer.title;

  return offerPinElement;
};

var createPinOffers = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinOffers.length; i++) {
    fragment.appendChild(renderPin(pinOffers[i]));
  }
  pinOfferList.appendChild(fragment);
};


// Валидация формы
var setRoomGuestValue = function () {
  var adFormGuestOptions = adFormGuest.querySelectorAll('option');

  var CAPACITY = {
    forOneGuest: adFormGuestOptions[2],
    forTwoGuest: adFormGuestOptions[1],
    forThreeGuest: adFormGuestOptions[0],
    notForGuest: adFormGuestOptions[3]
  };

  var ROOM_QUANTITY = {
    one: '1',
    two: '2',
    three: '3',
    hundred: '100'
  };

  var resetAdFormGuestAttribute = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].setAttribute('disabled', 'disabled');
      array[i].removeAttribute('selected');
    }
  };
  resetAdFormGuestAttribute(adFormGuestOptions);

  CAPACITY.forOneGuest.setAttribute('selected', 'selected');
  CAPACITY.forOneGuest.removeAttribute('disabled');

  adFormRooms.onchange = function () {
    if (adFormRooms.value === ROOM_QUANTITY.one) {
      resetAdFormGuestAttribute(adFormGuestOptions);
      CAPACITY.forOneGuest.removeAttribute('disabled');
      CAPACITY.forOneGuest.setAttribute('selected', 'selected');
    } else if (adFormRooms.value === ROOM_QUANTITY.two) {
      resetAdFormGuestAttribute(adFormGuestOptions);
      CAPACITY.forTwoGuest.removeAttribute('disabled');
      CAPACITY.forOneGuest.removeAttribute('disabled');
      CAPACITY.forOneGuest.setAttribute('selected', 'selected');
    } else if (adFormRooms.value === ROOM_QUANTITY.three) {
      resetAdFormGuestAttribute(adFormGuestOptions);
      CAPACITY.forTwoGuest.removeAttribute('disabled');
      CAPACITY.forThreeGuest.removeAttribute('disabled');
      CAPACITY.forOneGuest.removeAttribute('disabled');
      CAPACITY.forOneGuest.setAttribute('selected', 'selected');
    } else if (adFormRooms.value === ROOM_QUANTITY.hundred) {
      resetAdFormGuestAttribute(adFormGuestOptions);
      CAPACITY.notForGuest.removeAttribute('disabled');
      CAPACITY.notForGuest.setAttribute('selected', 'selected');
    }
  };
};
setRoomGuestValue();

var setFormPriceAttribute = function () {
  var priceLimits = {
    bungalo: {
      min: 0
    },
    flat: {
      min: 1000
    },
    house: {
      min: 5000
    },
    palace: {
      min: 10000
    }
  };

  var getFormMinPrice = function () {
    var typeValue = adFormType.value;
    return priceLimits[typeValue].min;
  };

  adFormType.addEventListener('change', function () {
    adFormPrice.setAttribute('min', getFormMinPrice());
    adFormPrice.setAttribute('placeholder', getFormMinPrice());
  });

  adFormPrice.setAttribute('max', '1000000');
};

var setNewFormTimeInOutAttribute = function () {
  adFormTimein.onchange = function () {
    adFormTimeout.selectedIndex = this.selectedIndex;
  };
  adFormTimeout.onchange = function () {
    adFormTimein.selectedIndex = this.selectedIndex;
  };
};

var setAdFormValidAttribute = function () {
  setFormPriceAttribute();
  setNewFormTimeInOutAttribute();
};
setAdFormValidAttribute();
