'use strict';

window.utils = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getRandomArrValue: function (array) { // возвращает случайное значение из массива
      return array[Math.floor(Math.random() * array.length)];
    },
    getRandomIntegerValue: function (min, max) { // возвращает случайное целое число из заданного диапазона
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },
    getRandomValue: function (min, max) { // возвращает случайное число из заданного диапазона
      return min + Math.random() * (max - min);
    },
    getRandomArrNValues: function (array, n) { // возвращает случаное колличество элементов из массива
      var arrayCopy = array.slice();
      var shuffled = arrayCopy.sort(function () {
        return Math.random() - 0.5;
      });
      return shuffled.slice(0, n);
    },
    getCoords: function (elem) { // получение координат элемента
      var box = elem.getBoundingClientRect();
      return {
        y: box.y + pageYOffset,
        x: box.x + pageXOffset
      };
    }
  };
})();
