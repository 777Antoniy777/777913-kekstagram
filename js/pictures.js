'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var imageItem = document.querySelector('.pictures');
  var pictureTemplateContent = templatePicture.content.querySelector('.picture');

  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      var templateItem = pictureTemplateContent.cloneNode(true);

      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

      window.preview.callPictureClick(templateItem, arrayImages[i]);
      window.preview.callPictureEnter(templateItem, arrayImages[i]);

      imageItem.appendChild(templateItem);
    }
  };

  // глобальный вызов
  window.pictures = {
    // переменные
    imageItem: imageItem,
    //  функции
    setImages: setImages
  };
})();
