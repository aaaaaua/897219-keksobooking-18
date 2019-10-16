'use strict';

(function () {
  var pinOfferList = document.querySelector('.map__pins');// повтор

  window.setPinId = function () {
    var pinOffersElements = pinOfferList.querySelectorAll('.map__pin');
    for (var i = 1; i < pinOffersElements.length; i++) {
      pinOffersElements[i].setAttribute('id', i);
    }
  };
})();
