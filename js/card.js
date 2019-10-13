'use strict';

(function () {
  // КАРТОЧКА ОБЪЯВЛЕНИЙ
  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.renderCard = function (pinOffer) {
    var offerCardElement = cardOfferTemplate.cloneNode(true);

    var createOfferPhotoElements = function () {
      var popupPhotosList = offerCardElement.querySelector('.popup__photos');
      for (var i = 0; i < pinOffer.offer.photos.length - 1; i++) {
        var PopupPhoto = offerCardElement.querySelector('.popup__photo').cloneNode(true);
        popupPhotosList.appendChild(PopupPhoto);
      }
      for (var j = 0; j < pinOffer.offer.photos.length; j++) {
        var photos = popupPhotosList.querySelectorAll('img');
        photos[j].src = pinOffer.offer.photos[j];
      }
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

    offerCardElement.querySelector('img').src = pinOffer.author.avatar;
    offerCardElement.querySelector('.popup__title').textContent = pinOffer.offer.title;
    offerCardElement.querySelector('.popup__text--address').textContent = pinOffer.offer.address;
    offerCardElement.querySelector('.popup__text--price').textContent = pinOffer.offer.price + '₽/ночь';
    offerCardElement.querySelector('.popup__type').textContent = offerType[pinOffer.offer.type];
    offerCardElement.querySelector('.popup__text--capacity').textContent = pinOffer.offer.rooms + ' комнаты для ' + pinOffer.offer.guests + ' гостей';
    offerCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;
    setCardFeatures();
    offerCardElement.querySelector('.popup__description').textContent = pinOffer.offer.description;
    createOfferPhotoElements();

    return offerCardElement;
  };
})();
