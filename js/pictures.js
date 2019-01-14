'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var pictureItem = document.querySelector('.pictures');
  var pictureTemplateContent = templatePicture.content.querySelector('.picture');

  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      var templateItem = pictureTemplateContent.cloneNode(true);

      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

      window.preview.callPictureClick(templateItem, arrayImages[i]);
      window.preview.callPictureEnter(templateItem, arrayImages[i]);

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
