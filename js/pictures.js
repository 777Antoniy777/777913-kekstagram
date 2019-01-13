'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var pictureItem  = document.querySelector('.pictures');

  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      var templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);

      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

      window.preview.callPictureClick(templateItem, arrayImages[i]);
      window.preview.callPictureEnter(templateItem, arrayImages[i]);

      // var pictureItem = document.querySelector('.pictures');
      pictureItem.appendChild(templateItem);
    }
  };

  // глобальный вызов 
  window.pictures = {
    // переменные
    pictureItem: pictureItem,
    //  функции
    setImages: setImages
  };
})();
