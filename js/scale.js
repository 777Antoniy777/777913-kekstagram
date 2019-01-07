'use strict';

(function () {
// функция изменения масштаба
window.setScale = function () {
    var buttonBigger = window.setup.uploadForm.querySelector('.scale__control--bigger');
    var buttonSmaller = window.setup.uploadForm.querySelector('.scale__control--smaller');
    var buttonValue = window.setup.uploadForm.querySelector('.scale__control--value');
    buttonValue.readOnly = false;
    buttonValue.value = 100 + '%';
    window.filters.prewiev.style.transform = 'scale(1)';
    buttonValue.maxLength = 4;
  
    var scaleValues = [25, 50, 75, 100];
    var scaleValueIndex = 3;
  
    buttonSmaller.addEventListener('click', function () {
      if (scaleValueIndex === scaleValues.length - 4) {
        buttonValue.value = 25 + '%';
        window.filters.prewiev.style.transform = 'scale(' + 25 / 100 + ')';
      } else {
        scaleValueIndex--;
      }
  
      buttonValue.value = scaleValues[scaleValueIndex] + '%';
      window.filters.prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
    });
  
    buttonBigger.addEventListener('click', function () {
      if (scaleValueIndex === scaleValues.length - 1) {
        buttonValue.value = 100 + '%';
        window.filters.prewiev.style.transform = 'scale(' + 100 / 100 + ')';
      } else {
        scaleValueIndex++;
      }
  
      buttonValue.value = scaleValues[scaleValueIndex] + '%';
      window.filters.prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
    });
  
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
  };
})()