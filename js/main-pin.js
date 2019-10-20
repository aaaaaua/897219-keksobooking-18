'use strict';
(function () {
  window.mapPinMain = document.querySelector('.map__pin--main');
  var MAIN_PIN_HEIGHT = 84;
  var MAIN_PIN_WIDTH = 62;
  var MAPS_PIN_MAIN_OFFSET = 31;
  var MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE = 84;
  var adFormAdress = document.querySelector('#address');

  var mapsWidth = document.querySelector('.map').offsetWidth;
  var mapHeight = document.querySelector('.map').offsetHeight;

  // Координаты главной метки в неактивном состоянии
  var getInactiveMainPinAddress = function () {
    var mainPinCoords = window.utils.getCoords(window.mapPinMain);
    adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET);
  };

  // Координаты главной метки в активном состоянии
  window.getActiveMainPinAddress = function () {
    var mainPinCoords = window.utils.getCoords(window.mapPinMain);
    adFormAdress.value = (mainPinCoords.x + MAPS_PIN_MAIN_OFFSET) + ', ' + (mainPinCoords.y + MAPS_PIN_MAIN_OFFSET_Y_IF_ACTIVE);
  };
  getInactiveMainPinAddress();

  window.mapPinMain.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var limits = {
        left: 0,
        right: mapsWidth - MAIN_PIN_WIDTH,
        top: 130,
        bottom: 630
      };

      if (window.mapPinMain.offsetTop - shift.y >= limits.top && window.mapPinMain.offsetTop - shift.y <= limits.bottom) {
        window.mapPinMain.style.top = (window.mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (window.mapPinMain.offsetLeft - shift.x >= limits.left && window.mapPinMain.offsetLeft - shift.x <= limits.right) {
        window.mapPinMain.style.left = (window.mapPinMain.offsetLeft - shift.x) + 'px';

      }
      window.getActiveMainPinAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          window.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };
        window.mapPinMain.addEventListener('click', onClickPreventDefault);
      }
      window.getActiveMainPinAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
