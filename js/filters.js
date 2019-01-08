'use strict';

(function () {
  // отпускание пина слайдера
  var pinLine = window.setup.uploadForm.querySelector('.effect-level__line');
  var pinLineFill = window.setup.uploadForm.querySelector('.effect-level__depth');
  var pin = window.setup.uploadForm.querySelector('.effect-level__pin');

  var MARVIN_VALUE = 100;
  var PHOBOS_VALUE = 3;
  var HEAT_VALUE_MIN = 1;
  var HEAT_VALUE_MAX = 3;

  // создание фильтров
  var original = window.setup.uploadForm.querySelector('label[for=effect-none]');
  var chrome = window.setup.uploadForm.querySelector('label[for=effect-chrome]');
  var sepia = window.setup.uploadForm.querySelector('label[for=effect-sepia]');
  var marvin = window.setup.uploadForm.querySelector('label[for=effect-marvin]');
  var phobos = window.setup.uploadForm.querySelector('label[for=effect-phobos]');
  var heat = window.setup.uploadForm.querySelector('label[for=effect-heat]');

  var prewiev = window.setup.uploadForm.querySelector('.img-upload__preview');
  var FILTERS = ['none', 'grayscale(1)', 'sepia(1)', 'invert(100%)', 'blur(3px)', 'brightness(3)'];

  var FILTERS_EFFECTS;
  var LABELS = [original, chrome, sepia, marvin, phobos, heat];
  var FILTER_INDEX = 0;

  var testField = window.setup.uploadSetup.querySelector('.img-upload__effect-level');

  // подстановка массивов и переменных в функцию создания фильтров
  var setFilterEffects = function () {
    for (var i = 0; i < LABELS.length; i++) {
      getFilterEffects(LABELS[i], FILTERS[i], i);
    }
  };

  // функция движения пина слайдера
  var getFilterEffects = function (label, filter, i) {
    label.addEventListener('click', function () {
      prewiev.style.filter = filter;
      pin.style.left = 100 + '%';
      pinLineFill.style.width = 100 + '%';
      FILTER_INDEX = i;

      if (i === 0) {
        testField.classList.add('hidden');
      } else {
        testField.classList.remove('hidden');
      }
    });
  };

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var pinMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var continueCoords = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      var percentGraySepia = pin.offsetLeft / pinLine.offsetWidth;
      var percentMarvin = pin.offsetLeft * MARVIN_VALUE / pinLine.offsetWidth;
      var percentPhobos = pin.offsetLeft * PHOBOS_VALUE / pinLine.offsetWidth;
      var perscentHeat = (pin.offsetLeft * (HEAT_VALUE_MAX - HEAT_VALUE_MIN) / pinLine.offsetWidth) + HEAT_VALUE_MIN;

      FILTERS_EFFECTS = [
        'none',
        'grayscale(' + percentGraySepia + ')',
        'sepia(' + percentGraySepia + ')',
        'invert(' + percentMarvin + '%' + ')',
        'blur(' + percentPhobos + 'px' + ')',
        'brightness(' + perscentHeat + ')'
      ];

      prewiev.style.filter = FILTERS_EFFECTS[FILTER_INDEX];
      pinLineFill.style.width = (pin.offsetLeft - continueCoords.x) + 'px';

      if (pin.offsetLeft < 0) {
        pin.style.left = 0 + '%';
      } else if (pin.offsetLeft > pinLine.offsetWidth) {
        pin.style.left = 100 + '%';
      } else {
        pin.style.left = (pin.offsetLeft - continueCoords.x) + 'px';
      }
    };

    var pinUpHandler = function () {
      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinUpHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinUpHandler);
  });

  // глобальный вызов
  window.filters = {
    // переменные
    pinLineFill: pinLineFill,
    pin: pin,
    prewiev: prewiev,
    FILTERS: FILTERS,
    testField: testField,
    // функции
    setFilterEffects: setFilterEffects
  };
})();
