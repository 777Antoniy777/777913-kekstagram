'use strict';

(function () {
  // функция подставления данных в гл.стр
  var templatePicture = document.querySelector('#picture');

  var setImages = function (arrayImages) {
    for (var i = 0; i < arrayImages.length; i++) {
      var templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);

      templateItem.querySelector('.picture__img').src = arrayImages[i].url;
      templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
      templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

      // templateItem.querySelector('.social__caption').textContent = arrayImages[i].description;

      window.comments.bigPictureSocial.querySelector('.social__caption').textContent = arrayImages[i].description;
      // window.comments.bigPictureSocial.querySelector('.social__header .social__picture').src = arrayImages[i].avatar;
      // window.comments.bigPictureSocial.querySelector('.social__header .social__picture').alt = 'Аватар ' + arrayImages[i].name;
      // console.log(window.comments.bigPictureSocial.querySelector('.social__header .social__picture'));

      window.preview.callPictureClick(templateItem, arrayImages[i]);
      window.preview.callPictureEnter(templateItem, arrayImages[i]);

      var pictureItem = document.querySelector('.pictures');
      pictureItem.appendChild(templateItem);

      // console.log(templateItem);
      // console.log(arrayImages[i]);
    }
  };

  window.pictures = {
    setImages: setImages
  };
})();
