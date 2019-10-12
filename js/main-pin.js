'use strict';
(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var MAPS_PIN_MAIN_OFFSET = 31;
  var MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE = 84;

  var adFormAdress = document.querySelector('#address');


  // Координаты главной метки в неактивном состоянии
  var getInactiveMainPinAddress = function () {
    var mainPinCoords = window.utils.getCoords(mapPinMain);
    adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET);
  };

  // Координаты главной метки в активном состоянии
  window.getActiveMainPinAddress = function () {
    var mainPinCoords = window.utils.getCoords(mapPinMain);
    adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE);
  };
  getInactiveMainPinAddress();
})();
