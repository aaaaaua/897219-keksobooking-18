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
  var formFieldsets = adForm.querySelectorAll('fieldset');

  var mainPinStartCoords = window.utils.getCoords(window.mapPinMain);

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var onLoadOffers = function (pinOffers) {
    window.makePin(pinOffers);
    window.offerArr = pinOffers;
  };

  var onSuccessSubmit = function () {
    var successSubmit = successTemplate.cloneNode(true);
    map.appendChild(successSubmit);
  };

  var onLoadError = function () {
    var loadError = errorTemplate.cloneNode(true);
    map.appendChild(loadError);
    document.addEventListener('click', function (evt) {
      var errorMessage = document.querySelector('.error');
      var errorButton = evt.target.closest('.error__button');
      if (errorMessage && errorButton) {
        makePageDisabled();
      }
      if (errorMessage) {
        errorMessage.remove();
      }
    }, {once: true});
  };

  var onSubmitError = function () {
    var loadError = errorTemplate.cloneNode(true);
    map.appendChild(loadError);
    document.addEventListener('click', function () {
      var errorMessage = document.querySelector('.error');
      if (errorMessage) {
        errorMessage.remove();
      }
    }, {once: true});
  };

  var makeFormElementsActive = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
  };

  var makeFormElementsDisabled = function () {
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].setAttribute('disabled', 'disabled');
    }
  };

  var makePageActive = function () {
    map.classList.remove(MAP_FADED_CLASS);
    adForm.classList.remove(AD_FORM_DISABLED_CLASS);
    mapFiltersForm.classList.remove(MAP_FILTER_DISABLED_CLASS);
    makeFormElementsActive(adForm);
  };

  var removeMapPin = function () {
    var pins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var makePageDisabled = function () {
    removeMapPin();
    adForm.reset();
    map.classList.add(MAP_FADED_CLASS);
    adForm.classList.add(AD_FORM_DISABLED_CLASS);
    mapFiltersForm.classList.add(MAP_FILTER_DISABLED_CLASS);
    window.mapPinMain.style.cssText = 'left: ' + mainPinStartCoords.x + 'px; top: ' + mainPinStartCoords.y + 'px;';
    makeFormElementsDisabled();
  };

  window.mapPinMain.addEventListener('mousedown', function () {
    if (map.classList.contains(MAP_FADED_CLASS)) {
      makePageActive();
      window.getActiveMainPinAddress();
      window.backend.load(LOAD_URL, onLoadOffers, onLoadError);
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (map.classList.contains(MAP_FADED_CLASS)) {
        makePageActive();
        window.getActiveMainPinAddress();
        window.backend.load(LOAD_URL, onLoadOffers, onLoadError);
      }
    }
  });

  // Открытие карточки объявления
  map.addEventListener('click', window.openCardOffer);
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.openCardOffer(evt);
    }
  });

  // Закрытие карточки объявления
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

  // Отправка своего объявления на сревер
  adForm.addEventListener('submit', function (evt) {
    var offerCard = document.querySelector('.map__card');
    window.backend.save(SAVE_URL, new FormData(adForm), function (response) {
      if (response) {
        makePageDisabled();
        onSuccessSubmit();
      }
      if (offerCard) {
        offerCard.remove();
      }
    }, onSubmitError);
    evt.preventDefault();
  });

  // Закрытие сообщения об успешной загрузке объявления на сервер
  document.addEventListener('click', function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.keyCode === ESC_KEYCODE && successMessage) {
      successMessage.remove();
    }
  });

  // Закрытие сообщения об ошибке при загрузке объявления на сервер
  document.addEventListener('keydown', function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.keyCode === ESC_KEYCODE && errorMessage) {
      errorMessage.remove();
    }
  });
})();
