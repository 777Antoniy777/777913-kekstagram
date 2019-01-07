'use strict';

window.random = (function () {
  
  return {
    // функция получения рандомного значения из массива
    getRandomValue: function (array) {
      var indexValue = Math.floor(Math.random() * (array.length - 1));
      return array[indexValue];
    },
    // функция получения рандомного значения из чисел
    getRandomNumber: function (min, max) {
      var indexNumber = Math.floor(Math.random() * (max - min) + min);
      return indexNumber;
    }
  }
})()