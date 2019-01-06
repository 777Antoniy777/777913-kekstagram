'use strict';

(function () {
// функция получения рандомного значения из массива
// var getRandomValue = function (array) {
//     var indexValue = Math.floor(Math.random() * (array.length - 1));
//     return array[indexValue];
//   };
  
//   // функция получения рандомного значения из чисел
//   var getRandomNumber = function (min, max) {
//     var indexNumber = Math.floor(Math.random() * (max - min) + min);
//     return indexNumber;
//   };

  window.random = {
    getRandomValue: function (array) {
      var indexValue = Math.floor(Math.random() * (array.length - 1));
      return array[indexValue];
    },
    getRandomNumber: function (min, max) {
      var indexNumber = Math.floor(Math.random() * (max - min) + min);
      return indexNumber;
    }
  }
})()