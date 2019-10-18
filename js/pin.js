'use strict';

(function () {
  var pinOfferList = document.querySelector('.map__pins');// повтор
  var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  window.pinOffers = window.makePinOfferArr();

  // создание и отрисовка меток объявлений на карте
  var createPin = function (pinOffer) {
    var offerPinElement = pinOfferTemplate.cloneNode(true);

    offerPinElement.style.left = pinOffer.location.x - window.PIN_OFFER_OFFSET_X + 'px';
    offerPinElement.style.top = pinOffer.location.y - window.PIN_OFFER_OFFSET_Y + 'px';
    offerPinElement.querySelector('img').src = pinOffer.author.avatar;
    offerPinElement.querySelector('img').alt = pinOffer.offer.title;
    return offerPinElement;
  };

  window.renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pinOffers.length; i++) {
      fragment.appendChild(createPin(window.pinOffers[i]));
    }
    pinOfferList.appendChild(fragment);
  };

  window.setPinId = function () {
    var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');
    for (var i = 1; i < pinOffersElements.length; i++) {
      pinOffersElements[i].setAttribute('id', i);
    }
  };
})();
