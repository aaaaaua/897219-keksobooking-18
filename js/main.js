'use strict';

var PIN_OFFER_Y_MIN = 130;
var PIN_OFFER_Y_MAX = 630;
var PIN_OFFER_OFFSET_X = 50;
var PIN_OFFER_OFFSET_Y = 70;
var mapsWidth = document.querySelector('.map').offsetWidth;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinOfferList = document.querySelector('.map__pins');

var OFFER_TITLES = ['Нельзя пройти мимо', 'Супердом', 'Фантастично', 'Ищешь квартиру', 'Дружелюбный домик', 'Большой Дом', 'Все Новое'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// возвращает случайное целое число из заданного диапазона
var getRandomIntegerValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1); rand = Math.round(rand); return rand;
};

// возвращает случайное число из заданного диапазона
var getRandomValue = function (min, max) {
  var rand = min + Math.random() * (max - min); return rand;
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
  var selected = shuffled.slice(0, n);
  return selected;
};

var renderAvatarLink = function (i) {
  var userAvatarLink = i < 10 ? 'img/avatars/user' + 0 + i + '.png' : 'img/avatars/user' + i + '.png'; return userAvatarLink;
};

var renderCoords = function () {
  return {
    x: getRandomValue(0, mapsWidth - PIN_OFFER_OFFSET_X),
    y: getRandomValue(PIN_OFFER_Y_MIN - PIN_OFFER_OFFSET_Y, PIN_OFFER_Y_MAX - PIN_OFFER_OFFSET_Y)
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
      features: getRandomArrNValues(OFFER_FEATURES, getRandomIntegerValue(1, 6)).toString(),
      description: getRandomArrValue(OFFER_TITLES),
      photos: getRandomArrNValues(OFFER_PHOTOS, getRandomIntegerValue(1, 3)).toString()
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

var pinOffersArrow = makePinOfferArr();

var renderOffer = function (pinOffer) {
  var offerPinElement = pinOfferTemplate.cloneNode(true);

  offerPinElement.style.left = pinOffer.location.x + 'px';
  offerPinElement.style.top = pinOffer.location.y + 'px';
  offerPinElement.querySelector('img').src = pinOffer.author.avatar;
  offerPinElement.setAttribute('alt', pinOffer.offer.title);

  return offerPinElement;
};

var createPinOffers = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pinOffersArrow.length; i++) {
    fragment.appendChild(renderOffer(pinOffersArrow[i]));
  }
  pinOfferList.appendChild(fragment);
};

createPinOffers();
