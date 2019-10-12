'use strict';

(function () {
  // КАРТОЧКА ОБЪЯВЛЕНИЙ
  var cardOfferTemplate = document.querySelector('#card').content.querySelector('.map__card');

  window.renderCard = function (pinOffer) {
    var offerCardElement = cardOfferTemplate.cloneNode(true);

    var createOfferPhotoElement = function () {
      var popupPhotos = offerCardElement.querySelector('.popup__photos').querySelectorAll('img');
      var popupPhotosList = offerCardElement.querySelector('.popup__photos');
      popupPhotos.forEach(function (item) {
        item.remove();
      });

      for (var i = 0; i < pinOffer.offer.photos.length; i++) {
        var fragment = document.createDocumentFragment();
        var popupPhoto = document.createElement('img');
        popupPhoto.classList.add('popup__photo');
        popupPhoto.setAttribute('width', '45');
        popupPhoto.setAttribute('height', '40');

        fragment.appendChild(popupPhoto);
        popupPhotosList.appendChild(fragment);

        var popupPhotoElement = offerCardElement.querySelector('.popup__photos').querySelectorAll('img');
        popupPhotoElement[i].src = pinOffer.offer.photos[i];
      }
    };

    // отображение типа помещения
    var displayType = function () {
      var offerType = {
        bungalo: 'Бунгало',
        flat: 'Квартира',
        house: 'Дом',
        palace: 'Дворец'
      };
      var type = pinOffer.offer.type;
      return offerType[type];
    };

    // отображение преимуществ
    var setCardFeatures = function () {
      var featuresList = offerCardElement.querySelector('.popup__features');
      var features = offerCardElement.querySelectorAll('.popup__feature');

      features.forEach(function (item) {
        item.remove();
      });

      for (var i = 0; i < pinOffer.offer.features.length; i++) {
        var fragment = document.createDocumentFragment();
        var popupFeature = document.createElement('li');
        popupFeature.classList.add('popup__feature');

        fragment.appendChild(popupFeature);
        featuresList.appendChild(fragment);

        var popupFeaturesElement = offerCardElement.querySelector('.popup__features').querySelectorAll('li');
        popupFeaturesElement[i].classList.add('popup__feature--' + pinOffer.offer.features[i]);
      }
    };

    offerCardElement.querySelector('img').src = pinOffer.author.avatar;
    offerCardElement.querySelector('.popup__title').textContent = pinOffer.offer.title;
    offerCardElement.querySelector('.popup__text--address').textContent = pinOffer.offer.address;
    offerCardElement.querySelector('.popup__text--price').textContent = pinOffer.offer.price + '₽/ночь';
    offerCardElement.querySelector('.popup__type').textContent = displayType();
    offerCardElement.querySelector('.popup__text--capacity').textContent = pinOffer.offer.rooms + ' комнаты для ' + pinOffer.offer.guests + ' гостей';
    offerCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinOffer.offer.checkin + ', выезд до ' + pinOffer.offer.checkout;
    setCardFeatures();
    offerCardElement.querySelector('.popup__description').textContent = pinOffer.offer.description;
    createOfferPhotoElement();

    return offerCardElement;
  };
})();
