'use strict';

(function () {
  // Перевод страницы в актовное состояние
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var MAP_FADED_CLASS = 'map--faded';
  var AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
  var MAP_FILTER_DISABLED_CLASS = 'map__filters--disabled';

  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');
  var mapFiltersForm = document.querySelector('.map__filters');

  var pinOfferTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinOfferList = document.querySelector('.map__pins');

  // перевод страницы в активное состояние
  var makeFormElementsActive = function (form) {
    var formFieldsets = form.querySelectorAll('fieldset');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].removeAttribute('disabled');
    }
  };

  var makePageActive = function () {
    map.classList.remove(MAP_FADED_CLASS);
    window.adForm.classList.remove(AD_FORM_DISABLED_CLASS);
    mapFiltersForm.classList.remove(MAP_FILTER_DISABLED_CLASS);
    makeFormElementsActive(window.adForm);
  };

  window.mapPinMain.addEventListener('mousedown', function () {
    if (map.classList.contains(MAP_FADED_CLASS)) {
      renderPins();
      makePageActive();
      window.getActiveMainPinAddress();
      window.setPinId();
    }
  });

  window.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      if (map.classList.contains(MAP_FADED_CLASS)) {
        renderPins();
        makePageActive();
        window.getActiveMainPinAddress();
        window.setPinId();
      }
    }
  });


  // открытие-закрытие карточки объявления
  var openCardOffer = function (evt) {
    var pin = evt.target.closest('.map__pin');
    var card = map.querySelector('.map__card');

    if (!pin) {
      return;
    }
    if (pin === window.mapPinMain) {
      return;
    }
    if (card) {
      map.removeChild(card);
    }
    map.insertBefore(window.renderCard(window.pinOffers[pin.id - 1]), mapFilterContainer);
  };

  var closeCardOffer = function (evt) {
    var offerCard = evt.target.closest('.map__card');
    offerCard.remove();
  };

  map.addEventListener('click', openCardOffer);
  map.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openCardOffer(evt);
    }
  });

  map.addEventListener('click', function (evt) {
    if (evt.target.className !== 'popup__close') {
      return;
    }
    closeCardOffer(evt);
  });

  map.addEventListener('keydown', function (evt) {
    var offerCard = document.querySelector('.map__card');
    if (evt.keyCode === ESC_KEYCODE && offerCard) {
      offerCard.remove();
    }
  });

  // создание и отрисовка меток объявлений на карте
  var createPin = function (pinOffer) {
    var offerPinElement = pinOfferTemplate.cloneNode(true);

    offerPinElement.style.left = pinOffer.location.x - window.PIN_OFFER_OFFSET_X + 'px';
    offerPinElement.style.top = pinOffer.location.y - window.PIN_OFFER_OFFSET_Y + 'px';
    offerPinElement.querySelector('img').src = pinOffer.author.avatar;
    offerPinElement.querySelector('img').alt = pinOffer.offer.title;
    return offerPinElement;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.pinOffers.length; i++) {
      fragment.appendChild(createPin(window.pinOffers[i]));
    }
    pinOfferList.appendChild(fragment);
  };
})();
