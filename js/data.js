'use strict';

(function () {
  window.OFFER_TITLES = ['Нельзя пройти мимо', 'Супердом', 'Фантастично', 'Ищешь квартиру', 'Дружелюбный домик', 'Большой Дом', 'Все Новое'];
  window.OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  window.OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  window.OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  window.OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  window.makePinOfferArr = function () {
    var pinOfferArr = [];
    for (var i = 1; i <= 8; i++) {
      pinOfferArr.push(window.makePinOffer(i));
    }
    return pinOfferArr;
  };
})();
