
'use strict';
// Валидация формы
(function () {
  var MAX_PRICE = 1000000;
  var adFormGuest = document.querySelector('#capacity');
  var adFormRooms = document.querySelector('#room_number');
  var adFormPrice = document.querySelector('#price');
  var adFormType = document.querySelector('#type');
  var adFormTimein = document.querySelector('#timein');
  var adFormTimeout = document.querySelector('#timeout');

  var setRoomGuestValue = function () {
    var adFormGuestOptions = adFormGuest.querySelectorAll('option');

    var capacity = {
      forOneGuest: adFormGuestOptions[2],
      forTwoGuest: adFormGuestOptions[1],
      forThreeGuest: adFormGuestOptions[0],
      notForGuest: adFormGuestOptions[3]
    };

    var roomQuantity = {
      one: '1',
      two: '2',
      three: '3',
      hundred: '100'
    };

    var resetAdFormGuestAttribute = function () {
      for (var i = 0; i < adFormGuestOptions.length; i++) {
        adFormGuestOptions[i].setAttribute('disabled', 'disabled');
        adFormGuestOptions[i].removeAttribute('selected');
      }
    };
    resetAdFormGuestAttribute();

    capacity.forOneGuest.setAttribute('selected', 'selected');
    capacity.forOneGuest.removeAttribute('disabled');

    adFormRooms.onchange = function () {
      if (adFormRooms.value === roomQuantity.one) {
        resetAdFormGuestAttribute();
        capacity.forOneGuest.removeAttribute('disabled');
        capacity.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === roomQuantity.two) {
        resetAdFormGuestAttribute();
        capacity.forTwoGuest.removeAttribute('disabled');
        capacity.forOneGuest.removeAttribute('disabled');
        capacity.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === roomQuantity.three) {
        resetAdFormGuestAttribute();
        capacity.forTwoGuest.removeAttribute('disabled');
        capacity.forThreeGuest.removeAttribute('disabled');
        capacity.forOneGuest.removeAttribute('disabled');
        capacity.forOneGuest.setAttribute('selected', 'selected');
      } else if (adFormRooms.value === roomQuantity.hundred) {
        resetAdFormGuestAttribute();
        capacity.notForGuest.removeAttribute('disabled');
        capacity.notForGuest.setAttribute('selected', 'selected');
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

    adFormPrice.setAttribute('max', MAX_PRICE);
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
