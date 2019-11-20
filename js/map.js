'use strict';

(function () {
  // Перевод страницы в актовное состояние
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var MAP_FADED_CLASS = 'map--faded';
  var AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
  var MAP_FILTER_DISABLED_CLASS = 'map__filters--disabled';

  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  var map = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');

  var filterForm = document.querySelector('.map__filters');
  var filterFormElements = document.querySelectorAll('select');
  var mapFilterType = document.querySelector('#housing-type');
  var mapFilterPrice = document.querySelector('#housing-price');
  var mapFilterRoom = document.querySelector('#housing-rooms');
  var mapFilterGuest = document.querySelector('#housing-guests');
  var mapFilterFeatures = document.querySelector('#housing-features');

  var mainPinStartCoords = window.utils.getCoords(window.mapPinMain);

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  // успешная загрузка объявлений с сервера
  var onLoadOffers = function (pinOffers) {
    window.offersArr = pinOffers;
    window.sortOffersArr = window.offersArr.slice();
    window.makePin(window.sortOffersArr.slice(0, 5));
    filterFormElements.forEach(function (elem) {
      elem.removeAttribute('disabled', 'disabled');
    });
  };

  // успешная отправка формы на сервер
  var onSuccessSubmit = function () {
    var successSubmit = successTemplate.cloneNode(true);
    map.appendChild(successSubmit);
    document.addEventListener('click', onSuccessSubmitClick);
    document.addEventListener('keydown', onSuccessSubmitEscPress);
    document.activeElement.blur();
  };

  // ощибка загрузки данных с сервера
  var onLoadError = function () {
    var loadError = errorTemplate.cloneNode(true);
    map.appendChild(loadError);

    document.addEventListener('click', function (evt) {
      var errorMessage = document.querySelector('.error');
      var errorButton = evt.target.closest('.error__button');
      if (errorMessage) {
        errorMessage.remove();
        map.classList.add(MAP_FADED_CLASS);
      }
      if (errorMessage && errorButton) {
        errorMessage.remove();
        map.classList.remove(MAP_FADED_CLASS);
        window.backend.load(LOAD_URL, onLoadOffers, onLoadError);
      }
    }, {once: true});
    document.addEventListener('keydown', onErrorEscPress);
  };

  // ошибка отправки данных формы на сервер
  var onSubmitError = function () {
    var loadError = errorTemplate.cloneNode(true);
    map.appendChild(loadError);
    document.addEventListener('click', function () {
      var errorMessage = document.querySelector('.error');
      if (errorMessage) {
        errorMessage.remove();
      }
    }, {once: true});
    document.addEventListener('keydown', onErrorEscPress);
  };

  // закрытие окна сообщения об ошибке
  var onErrorEscPress = function (evt) {
    var errorMessage = document.querySelector('.error');
    var pins = map.querySelectorAll('.map__pin');
    if (evt.keyCode === ESC_KEYCODE && errorMessage && pins.length <= 1) {
      errorMessage.remove();
      map.classList.add(MAP_FADED_CLASS);
      window.mapPinMain.style.cssText = 'left: ' + mainPinStartCoords.x + 'px; top: ' + mainPinStartCoords.y + 'px;';
    } else if (evt.keyCode === ESC_KEYCODE && errorMessage) {
      errorMessage.remove();
    }
    document.removeEventListener('keydown', onErrorEscPress);
  };

  // закрытие окна сообщения об успешной загрузке
  var onSuccessSubmitClick = function () {
    var successMessage = document.querySelector('.success');
    if (successMessage) {
      successMessage.remove();
    }
    document.removeEventListener('keydown', onSuccessSubmitEscPress);
    document.removeEventListener('click', onSuccessSubmitClick);
  };

  var onSuccessSubmitEscPress = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.keyCode === ESC_KEYCODE && successMessage) {
      successMessage.remove();
    }
    document.removeEventListener('keydown', onSuccessSubmitEscPress);
    document.removeEventListener('click', onSuccessSubmitClick);
  };

  // активация и отключение элементов формы
  var makeFormElementsActive = function () {
    formFieldsets.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  };
  var makeFormElementsDisabled = function () {
    formFieldsets.forEach(function (elem) {
      elem.setAttribute('disabled', 'disabled');
    });
  };
  filterFormElements.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });

  // удаление пинов на карте
  var removeMapPin = function () {
    var pins = map.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  // перевод страницы в активный режим
  var makePageActive = function () {
    map.classList.remove(MAP_FADED_CLASS);
    adForm.classList.remove(AD_FORM_DISABLED_CLASS);
    mapFiltersForm.classList.remove(MAP_FILTER_DISABLED_CLASS);
    makeFormElementsActive();
  };

  // перевод страницы в неактивный режим
  var makePageDisabled = function () {
    removeMapPin();
    adForm.reset();
    filterForm.reset();
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

  adFormResetButton.addEventListener('click', function () {
    var offerCard = document.querySelector('.map__card');
    makePageDisabled();
    if (offerCard) {
      offerCard.remove();
    }
  });

  adFormResetButton.addEventListener('keydown', function (evt) {
    var offerCard = document.querySelector('.map__card');
    if (evt.keyCode === ENTER_KEYCODE) {
      makePageDisabled();
    }
    if (offerCard) {
      offerCard.remove();
    }
  });

  // фильтрация объявлений
  mapFilterType.addEventListener('change', function () {
    window.debounce(filterOffer)();
  });
  mapFilterPrice.addEventListener('change', function () {
    window.debounce(filterOffer)();
  });
  mapFilterRoom.addEventListener('change', function () {
    window.debounce(filterOffer)();
  });
  mapFilterGuest.addEventListener('change', function () {
    window.debounce(filterOffer)();
  });
  mapFilterFeatures.addEventListener('change', function () {
    window.debounce(filterOffer)();
  });

  var filterOffer = function () {
    var offerCard = document.querySelector('.map__card');
    window.sortOffersArr = window.offersArr.filter(function (pinOffer) {
      if (mapFilterType.value === 'any') {
        return true;
      }
      return pinOffer.offer.type === mapFilterType.value;
    }).filter(function (pinOffer) {
      var filterPriceLimit = {
        any: pinOffer.offer.type,
        middle: pinOffer.offer.price >= 10000 && pinOffer.offer.price <= 50000,
        low: pinOffer.offer.price < 10000,
        high: pinOffer.offer.price >= 50000
      };
      return filterPriceLimit[mapFilterPrice.value];
    }).filter(function (pinOffer) {
      if (mapFilterRoom.value === 'any') {
        return true;
      }
      return pinOffer.offer.rooms.toString() === mapFilterRoom.value;
    }).filter(function (pinOffer) {
      if (mapFilterGuest.value === 'any') {
        return true;
      }
      return pinOffer.offer.guests.toString() === mapFilterGuest.value;
    }).filter(function (pinOffer) {
      var featuresChekedList = mapFilterFeatures.querySelectorAll('input:checked');
      var featuresChekedListValues = [];
      featuresChekedList.forEach(function (input) {
        featuresChekedListValues.push(input.value);
      });
      if (featuresChekedListValues.length <= 0) {
        return true;
      }
      var filter = pinOffer.offer.features.filter(function (feature) {
        return featuresChekedListValues.includes(feature);
      });
      return filter.length >= featuresChekedListValues.length;
    });
    if (offerCard) {
      offerCard.remove();
    }
    removeMapPin();
    window.makePin(window.sortOffersArr.slice(0, 5));
  };
})();
