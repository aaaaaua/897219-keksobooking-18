'use strict';

(function () {
  // Перевод страницы в актовное состояние
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var MAP_FADED_CLASS = 'map--faded';
  var AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
  var MAP_FILTER_DISABLED_CLASS = 'map__filters--disabled';

  var map = document.querySelector('.map');// copy
  var mapFiltersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');

  // перевод страницы в активное состояние
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

  window.mapPinMain.addEventListener('mousedown', function () {
    if (map.classList.contains(MAP_FADED_CLASS)) {
      window.renderPins();
      makePageActive();
      window.getActiveMainPinAddress();
      window.setPinId();
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (map.classList.contains(MAP_FADED_CLASS)) {
        window.renderPins();
        makePageActive();
        window.getActiveMainPinAddress();
        window.setPinId();
      }
    }
  });

  map.addEventListener('click', window.openCardOffer);
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.openCardOffer(evt);
    }
  });

  map.addEventListener('click', function (evt) {
    if (evt.target.className !== 'popup__close') {
      return;
    }
    window.closeCardOffer(evt);
  });

  map.addEventListener('keydown', function (evt) {
    var offerCard = document.querySelector('.map__card');
    if (evt.keyCode === ESC_KEYCODE && offerCard) {
      offerCard.remove();
    }
  });
})();
