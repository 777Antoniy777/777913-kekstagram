'use strict';

(function () {
  // открытие полноэкранной картинки с помощью мыши и закрытие с помощью ESC
  var callPictureClick = function (templateItem, image) {
    templateItem.addEventListener('click', function (evt) {
      evt.preventDefault();
      pictureOpen(image);
    });
  };

  // открытие полноэкранной картинки с помощью ENTER и закрытие с помощью ESC
  var callPictureEnter = function (templateItem, image) {
    templateItem.addEventListener('keydown', function (evt) {
      window.openClose.isEnterEvent(evt, pictureOpen, image);
    });
  };

  // открытие и закрытие большого фото при нажатии на любое фото в галерее
  var bigPictureClose = window.comments.bigPictureItem.querySelector('.big-picture__cancel');
  bigPictureClose.tabIndex = 0;
  var body = document.querySelector('body');

  var pictureKeydownESCHandler = function (evt) {
    window.openClose.isEscEvent(evt, pictureClose);
  };

  var pictureOpen = function (image) {
    window.comments.bigPictureItem.classList.remove('hidden');
    window.comments.bigPictureItem.querySelector('.big-picture__img img').src = image.url;
    window.comments.bigPictureItem.querySelector('.likes-count').textContent = image.likes;
    window.comments.bigPictureItem.querySelector('.comments-count').textContent = image.comments.length;
    window.comments.bigPictureItem.querySelector('.social__caption').textContent = image.description;

    window.comments.currentCount = 5;
    window.comments.button.classList.remove('hidden');
    window.comments.currentValue.textContent = 5;

    body.classList.add('modal-open');
    window.comments.remove();
    window.comments.render(image.comments);
    window.comments.hide();
    document.addEventListener('keydown', pictureKeydownESCHandler);

    if (image.comments.length < window.comments.INDEX_VISIBLE_VALUE) {
      window.comments.button.classList.add('hidden');
      window.comments.currentValue.textContent = image.comments.length;
    }
  };

  var pictureClose = function () {
    window.comments.bigPictureItem.classList.add('hidden');
    document.removeEventListener('keydown', pictureKeydownESCHandler);
    body.classList.remove('modal-open');
  };

  // закрытие полноэкранной картинки с помощью мыши
  bigPictureClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    pictureClose();
  });

  // закрытие полноэкранной картинки с помощью ENTER
  bigPictureClose.addEventListener('keydown', function (evt) {
    window.openClose.isEnterEvent(evt, pictureClose);
  });

  // глобальный вызов
  window.preview = {
    // переменные
    body: body,
    // функции
    callPictureClick: callPictureClick,
    callPictureEnter: callPictureEnter
  };
})();
