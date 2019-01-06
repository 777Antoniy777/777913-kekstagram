'use strict';

(function () {
var IMAGES_COUNT = 25;
var MIN_VALUE_LIKES = 15;
var MAX_VALUE_LIKES = 201;

// функция создания url, likes, comments
var createImages = function () {
    var images = [];
  
    for (var i = 0; i < IMAGES_COUNT; i++) {
      var imageNumber = i + 1;
      var newImage = {
        url: 'photos/' + imageNumber + '.jpg',
        likes: window.random.getRandomNumber(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
        comments: createComment()
      };
      images.push(newImage);
    }
    return images;
  };
  
  var IMAGES = createImages();
  
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var body = document.querySelector('body');
  
  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      var templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);
  
      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;
  
      callPictureClick(templateItem, arrayImages[i]);
      callPictureEnter(templateItem, arrayImages[i]);
  
      var pictureItem = document.querySelector('.pictures');
      pictureItem.appendChild(templateItem);
    }
  };
})()