'use strict';

(function () {
  var pinOfferList = document.querySelector('.map__pins');// повтор
  var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_OFFER_OFFSET_X = 25;
  var PIN_OFFER_OFFSET_Y = 70;

  // создание и отрисовка меток объявлений на карте
  var createPin = function (pinOffer) {
    var offerPinElement = pinOfferTemplate.cloneNode(true);

    offerPinElement.style.left = pinOffer.location.x - PIN_OFFER_OFFSET_X + 'px';
    offerPinElement.style.top = pinOffer.location.y - PIN_OFFER_OFFSET_Y + 'px';
    offerPinElement.querySelector('img').src = pinOffer.author.avatar;
    offerPinElement.querySelector('img').alt = pinOffer.offer.title;

    return offerPinElement;
  };

  var renderPin = function (pinOffers) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinOffers.length; i++) {
      if (pinOffers[i].offer) {
        fragment.appendChild(createPin(pinOffers[i]));
      }
    }
    pinOfferList.appendChild(fragment);
  };

  var setPinId = function () {
    var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');
    for (var i = 0; i < pinOffersElements.length; i++) {
      if (!pinOffersElements[i].classList.contains('map__pin--main')) {
        pinOffersElements[i].setAttribute('id', i);
      }
    }
  };

  window.makePin = function (pinOffers) {
    renderPin(pinOffers);
    setPinId();
  };
})();
