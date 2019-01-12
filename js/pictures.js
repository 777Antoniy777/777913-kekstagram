'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');
  var pictureItem;
  var templateItem; 

  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);

      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

      window.preview.callPictureClick(templateItem, arrayImages[i]);
      window.preview.callPictureEnter(templateItem, arrayImages[i]);

      pictureItem = document.querySelector('.pictures');
      pictureItem.appendChild(templateItem);

      // console.log(templateItem);
      // console.log(arrayImages[i]);
    }
  };

  window.pictures = {
    pictureItem: pictureItem,
    templateItem: templateItem,

    setImages: setImages
  };
})();
