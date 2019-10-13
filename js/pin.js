'use strict';

(function () {
  window.PIN_OFFER_OFFSET_X = 25;
  window.PIN_OFFER_OFFSET_Y = 70;

  var PIN_OFFER_Y_MIN = 130;
  var PIN_OFFER_Y_MAX = 630;

  var mapsWidth = document.querySelector('.map').offsetWidth;
  var pinOfferList = document.querySelector('.map__pins');// повтор

  var renderAvatarLink = function (i) {
    return i < 10 ? 'img/avatars/user' + 0 + i + '.png' : 'img/avatars/user' + i + '.png';
  };

  var renderCoords = function () {
    return {
      x: window.utils.getRandomValue(0 + window.PIN_OFFER_OFFSET_X, mapsWidth - window.PIN_OFFER_OFFSET_X),
      y: window.utils.getRandomValue(PIN_OFFER_Y_MIN, PIN_OFFER_Y_MAX)
    };
  };

  window.setPinId = function () {
    var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');
    for (var i = 1; i < pinOffersElements.length; i++) {
      pinOffersElements[i].setAttribute('id', i);
    }
  };

  window.makePinOffer = function (i) {
    var pinCoordsХ = renderCoords().x;
    var pinCoordsY = renderCoords().y;
    var offerRooms = window.utils.getRandomIntegerValue(1, 4);

    var getOfferGuestsValue = function (rooms) {
      return rooms >= 2 ? window.utils.getRandomIntegerValue(4, 7) : window.utils.getRandomIntegerValue(1, 3);
    };

    var pinOffer = {
      author: {
        avatar: renderAvatarLink(i)
      },

      offer: {
        title: window.utils.getRandomArrValue(window.OFFER_TITLES),
        address: pinCoordsХ.toString() + ', ' + pinCoordsY.toString(),
        price: window.utils.getRandomIntegerValue(100, 5000),
        type: window.utils.getRandomArrValue(window.OFFER_TYPES),
        rooms: offerRooms,
        guests: getOfferGuestsValue(offerRooms),
        checkin: window.utils.getRandomArrValue(window.OFFER_CHECKINS),
        checkout: window.utils.getRandomArrValue(window.OFFER_CHECKINS),
        features: window.utils.getRandomArrNValues(window.OFFER_FEATURES, window.utils.getRandomIntegerValue(1, 6)),
        description: window.utils.getRandomArrValue(window.OFFER_TITLES),
        photos: window.utils.getRandomArrNValues(window.OFFER_PHOTOS, window.utils.getRandomIntegerValue(1, 3))
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
      pinOfferArr.push(window.makePinOffer(i));
    }
    return pinOfferArr;
  };
  window.pinOffers = makePinOfferArr();
})();
