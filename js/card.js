'use strict';

(function () {
  // КАРТОЧКА ОБЪЯВЛЕНИЙ
  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var mapFilterContainer = map.querySelector('.map__filters-container');

  window.renderCard = function (pinOffer) {
    var offerCardElement = cardOfferTemplate.cloneNode(true);

    var createOfferPhotoElements = function () {
      var popupPhotosList = offerCardElement.querySelector('.popup__photos');
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < pinOffer.offer.photos.length; i++) {
        var popupPhoto = offerCardElement.querySelector('.popup__photo').cloneNode(true);
        popupPhoto.src = pinOffer.offer.photos[i];
        fragment.appendChild(popupPhoto);
      }
      popupPhotosList.innerHTML = '';
      popupPhotosList.appendChild(fragment);
    };

    // отображение типа помещения
    var offerType = {
      bungalo: 'Бунгало',
      flat: 'Квартира',
      house: 'Дом',
      palace: 'Дворец'
    };

    // отображение преимуществ
    var setCardFeatures = function () {
      var fragment = document.createDocumentFragment();
      var featuresList = offerCardElement.querySelector('.popup__features');
      featuresList.innerHTML = '';

      for (var i = 0; i < pinOffer.offer.features.length; i++) {
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature', 'popup__feature--' + pinOffer.offer.features[i]);
        fragment.appendChild(popupFeature);
      }
      featuresList.appendChild(fragment);
    };

    // заполнение карточки объявления данными
    if (pinOffer.author.avatar) {
      offerCardElement.querySelector('img').src = pinOffer.author.avatar;
    } else {
      offerCardElement.querySelector('img').classList.add('visually-hidden');
    }

    if (pinOffer.offer.title) {
      offerCardElement.querySelector('.popup__title').textContent = pinOffer.offer.title;
    } else {
      offerCardElement.querySelector('.popup__title').classList.add('visually-hidden');
    }

    if (pinOffer.offer.address) {
      offerCardElement.querySelector('.popup__text--address').textContent = pinOffer.offer.address;
    } else {
      offerCardElement.querySelector('.popup__text--address').classList.add('visually-hidden');
    }

    if (pinOffer.offer.price) {
      offerCardElement.querySelector('.popup__text--price').textContent = pinOffer.offer.price + '₽/ночь';
    } else {
      offerCardElement.querySelector('.popup__text--price').classList.add('visually-hidden');
    }

    if (pinOffer.offer.type) {
      offerCardElement.querySelector('.popup__type').textContent = offerType[pinOffer.offer.type];
    } else {
      offerCardElement.querySelector('.popup__type').classList.add('visually-hidden');
    }

    if (pinOffer.offer.rooms && pinOffer.offer.guests) {
      offerCardElement.querySelector('.popup__text--capacity').textContent = pinOffer.offer.rooms + ' комнаты для ' + pinOffer.offer.guests + ' гостей';
    } else {
      offerCardElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }

    if (pinOffer.offer.checkin && pinOffer.offer.checkout) {
      offerCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;
    } else {
      offerCardElement.querySelector('.popup__text--time').classList.add('visually-hidden');
    }

    if (pinOffer.offer.features) {
      setCardFeatures();
    } else {
      offerCardElement.querySelector('.popup__features').classList.add('visually-hidden');
    }

    if (pinOffer.offer.description) {
      offerCardElement.querySelector('.popup__description').textContent = pinOffer.offer.description;
    } else {
      offerCardElement.querySelector('.popup__description').classList.add('visually-hidden');
    }

    if (pinOffer.offer.photos) {
      createOfferPhotoElements();
    } else {
      offerCardElement.querySelector('.popup__photo').classList.add('visually-hidden');
    }

    return offerCardElement;
  };

  // открытие-закрытие карточки объявления
  window.openCardOffer = function (evt) {
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
    map.insertBefore(window.renderCard(window.sortOffersArr[pin.id]), mapFilterContainer);
  };

  window.closeCardOffer = function (evt) {
    var offerCard = evt.target.closest('.map__card');
    offerCard.remove();
  };
})();
