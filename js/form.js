
'use strict';
// Валидация формы
(function () {
  var adFormGuest = document.querySelector('#capacity');
  var adFormRooms = document.querySelector('#room_number');
  var adFormPrice = document.querySelector('#price');
  var adFormType = document.querySelector('#type');
  var adFormTimein = document.querySelector('#timein');
  var adFormTimeout = document.querySelector('#timeout');

  var setRoomGuestValue = function () {
    var adFormGuestOptions = adFormGuest.querySelectorAll('option');

    var CAPACITY = {
      forOneGuest: adFormGuestOptions[2],
      forTwoGuest: adFormGuestOptions[1],
      forThreeGuest: adFormGuestOptions[0],
      notForGuest: adFormGuestOptions[3]
    };

    var ROOM_QUANTITY = {
      one: '1',
      two: '2',
      three: '3',
      hundred: '100'
    };

    var resetAdFormGuestAttribute = function (array) {
      for (var i = 0; i < array.length; i++) {
        array[i].setAttribute('disabled', 'disabled');
        array[i].removeAttribute('selected');
      }
    };
    resetAdFormGuestAttribute(adFormGuestOptions);

    CAPACITY.forOneGuest.setAttribute('selected', 'selected');
    CAPACITY.forOneGuest.removeAttribute('disabled');

    adFormRooms.onchange = function () {
      if (adFormRooms.value === ROOM_QUANTITY.one) {
        resetAdFormGuestAttribute(adFormGuestOptions);
        CAPACITY.forOneGuest.removeAttribute('disabled');
        CAPACITY.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === ROOM_QUANTITY.two) {
        resetAdFormGuestAttribute(adFormGuestOptions);
        CAPACITY.forTwoGuest.removeAttribute('disabled');
        CAPACITY.forOneGuest.removeAttribute('disabled');
        CAPACITY.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === ROOM_QUANTITY.three) {
        resetAdFormGuestAttribute(adFormGuestOptions);
        CAPACITY.forTwoGuest.removeAttribute('disabled');
        CAPACITY.forThreeGuest.removeAttribute('disabled');
        CAPACITY.forOneGuest.removeAttribute('disabled');
        CAPACITY.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === ROOM_QUANTITY.hundred) {
        resetAdFormGuestAttribute(adFormGuestOptions);
        CAPACITY.notForGuest.removeAttribute('disabled');
        CAPACITY.notForGuest.setAttribute('selected', 'selected');
      }
    };
  };

  var setFormPriceAttribute = function () {
    var minPrice = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };

    adFormType.addEventListener('change', function () {
      adFormPrice.setAttribute('min', minPrice[adFormType.value]);
      adFormPrice.setAttribute('placeholder', minPrice[adFormType.value]);
    });

    adFormPrice.setAttribute('max', '1000000');
  };

  var setNewFormTimeInOutAttribute = function () {
    adFormTimein.onchange = function () {
      adFormTimeout.selectedIndex = this.selectedIndex;
    };
    adFormTimeout.onchange = function () {
      adFormTimein.selectedIndex = this.selectedIndex;
    };
  };

  setRoomGuestValue();
  setFormPriceAttribute();
  setNewFormTimeInOutAttribute();
})();
