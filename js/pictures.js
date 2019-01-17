'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var imageItem = document.querySelector('.pictures');
  var pictureTemplateContent = templatePicture.content.querySelector('.picture');

  var setImages = function (arrayImages) {
    arrayImages.forEach(function (images) {
      var templateItem = pictureTemplateContent.cloneNode(true);

      templateItem.querySelector('.picture__img').src = images.url;
      templateItem.querySelector('.picture__likes').textContent = images.likes;
      templateItem.querySelector('.picture__comments').textContent = images.comments.length;

      window.preview.callPictureClick(templateItem, images);
      window.preview.callPictureEnter(templateItem, images);

      imageItem.appendChild(templateItem);
    });
  };

  // глобальный вызов
  window.pictures = {
    // переменные
    imageItem: imageItem,
    //  функции
    setImages: setImages
  };
})();
