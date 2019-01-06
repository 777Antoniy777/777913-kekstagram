'use strict';

(function () {
// функция изменения масштаба
var setScale = function () {
    var buttonBigger = uploadForm.querySelector('.scale__control--bigger');
    var buttonSmaller = uploadForm.querySelector('.scale__control--smaller');
    var buttonValue = uploadForm.querySelector('.scale__control--value');
    buttonValue.readOnly = false;
    buttonValue.value = 100 + '%';
    prewiev.style.transform = 'scale(1)';
    buttonValue.maxLength = 4;
  
    var scaleValues = [25, 50, 75, 100];
    var scaleValueIndex = 3;
  
    buttonSmaller.addEventListener('click', function () {
      if (scaleValueIndex === scaleValues.length - 4) {
        buttonValue.value = 25 + '%';
        prewiev.style.transform = 'scale(' + 25 / 100 + ')';
      } else {
        scaleValueIndex--;
      }
  
      buttonValue.value = scaleValues[scaleValueIndex] + '%';
      prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
    });
  
    buttonBigger.addEventListener('click', function () {
      if (scaleValueIndex === scaleValues.length - 1) {
        buttonValue.value = 100 + '%';
        prewiev.style.transform = 'scale(' + 100 / 100 + ')';
      } else {
        scaleValueIndex++;
      }
  
      buttonValue.value = scaleValues[scaleValueIndex] + '%';
      prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
    });
  
    var changeButtonValue = function () {
      buttonValue.addEventListener('input', function (evt) {
        var target = evt.target;
        var scaleValue = parseInt(target.value, 10);
  
        if (scaleValue >= 25 && scaleValue <= 100) {
          prewiev.style.transform = 'scale(' + scaleValue / 100 + ')';
        }
      });
    };
  
    changeButtonValue();
  };
})()