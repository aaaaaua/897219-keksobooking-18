'use strict';

var pinOfferYMin = 130;
var pinOfferYMax = 630;
var pinOfferOffsetX = 25;
var pinOfferOffsetY = 70;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinOfferList = document.querySelector('.map__pins');

var MAPS_WIDTH = document.querySelector('.map').offsetWidth;
var OFFER_TITLE = ['Нельзя пройти мимо', 'Супердом', 'Фантастично', 'Ищешь квартиру', 'Дружелюбный домик', 'Большой Дом', 'Все Новое'];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// возвращает случайное целое число из заданного диапазона
var getRandomIntegerValue = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

// возвращает случайное число из заданного диапазона
var getRandomValue = function (min, max) {
  var rand = min + Math.random() * (max - min);
  return rand;
};

// Возвращает случайное значение из массива
var getRandomArrValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Возвращает случаное колличество элементов из массива
var getRandomArrNValues = function (array, n) {
  var shuffled = array.sort(function () {
    return Math.random() - 0.5;
  });
  var selected = shuffled.slice(0, n);
  return selected;
};

var renderAvatarLink = function (i) {
  var userAvatarLink = i < 10 ? 'img/avatars/user' + 0 + i + '.png' : 'img/avatars/user' + i + '.png';

  return userAvatarLink;
};

var makePinOffer = function (i) {
  var pinOffer = {
    author: {
      avatar: renderAvatarLink(i)
    },

    offer: {
      title: getRandomArrValue(OFFER_TITLE),
      address: '',
      price: getRandomIntegerValue(100, 5000),
      type: getRandomArrValue(OFFER_TYPE),
      rooms: getRandomIntegerValue(1, 3),
      guests: '',
      checkin: getRandomArrValue(OFFER_CHECKIN),
      checkout: getRandomArrValue(OFFER_CHECKIN),
      features: getRandomArrNValues(OFFER_FEATURES, getRandomIntegerValue(1, 6)).toString(),
      description: getRandomArrValue(OFFER_TITLE),
      photos: getRandomArrNValues(OFFER_PHOTOS, getRandomIntegerValue(1, 3)).toString()
    },

    location: {
      x: getRandomValue(MAPS_WIDTH - MAPS_WIDTH - pinOfferOffsetX, MAPS_WIDTH - pinOfferOffsetX),
      y: getRandomValue(pinOfferYMin - pinOfferOffsetY, pinOfferYMax - pinOfferOffsetY)
    }
  };

  var getOfferGuestsValue = function (rooms) {
    var guestsValue = rooms >= 2 ? getRandomIntegerValue(4, 7) : getRandomIntegerValue(1, 3);
    pinOffer.offer.guests = guestsValue;
  };
  getOfferGuestsValue(pinOffer.offer.rooms);

  var getOfferAddressValue = function () {
    var addressValue = pinOffer.location.x.toString() + ' ' + pinOffer.location.y.toString();
    pinOffer.offer.address = addressValue;
  };
  getOfferAddressValue();

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
