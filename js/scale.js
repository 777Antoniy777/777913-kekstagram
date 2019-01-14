'use strict';

(function () {
  var DEFAULT_SCALE_INDEX = 3;

  // функция изменения масштаба
  var buttonBigger = window.setup.uploadForm.querySelector('.scale__control--bigger');
  var buttonSmaller = window.setup.uploadForm.querySelector('.scale__control--smaller');
  var buttonValue = window.setup.uploadForm.querySelector('.scale__control--value');
  var scaleValues = [25, 50, 75, 100];

  var setScale = function () {
    buttonValue.readOnly = false;
    buttonValue.value = 100 + '%';
    window.filters.prewiev.style.transform = 'scale(1)';
    buttonValue.maxLength = 4;

    var changeButtonValue = function () {
      buttonValue.addEventListener('input', function (evt) {
        var target = evt.target;
        var scaleValue = parseInt(target.value, 10);

        if (scaleValue >= 25 && scaleValue <= 100) {
          window.filters.prewiev.style.transform = 'scale(' + scaleValue / 100 + ')';
        }
      });
    };

    changeButtonValue();

    var changleScale = function (newIndex) {

      if (newIndex >= 0 && newIndex < scaleValues.length) {
        DEFAULT_SCALE_INDEX = newIndex;
      }

      var value = scaleValues[DEFAULT_SCALE_INDEX];

      buttonValue.value = value + '%';
      window.filters.prewiev.style.transform = 'scale(' + value / 100 + ')';
    };

    buttonSmaller.addEventListener('click', function () {
      changleScale(DEFAULT_SCALE_INDEX - 1);
    });

    buttonBigger.addEventListener('click', function () {
      changleScale(DEFAULT_SCALE_INDEX + 1);
    });
  };

  // глобальный вызов
  window.scale = {
    // функции
    setScale: setScale
  };
})();
