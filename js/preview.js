'use strict';

(function () {
  // функция добавления класса hidden к тем объектам, которые это заслужили
  var addHiddenClass = function () {
    document.querySelector('.social__comment-count').classList.add('visually-hidden');
    document.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  addHiddenClass();

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
  var CODE_BUTTON_ESC = 27;
  var CODE_BUTTON_ENTER = 13;

  var bigPictureClose = window.comments.bigPictureItem.querySelector('.big-picture__cancel');
  bigPictureClose.tabIndex = 0;
  var commentInput = window.comments.bigPictureItem.querySelector('.social__footer-text');
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

    body.classList.add('modal-open');
    window.comments.removeComments();
    window.comments.setComments(image.comments);
    window.comments.hideComments();
    commentInput.focus();
    document.addEventListener('keydown', pictureKeydownESCHandler);
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
    CODE_BUTTON_ESC: CODE_BUTTON_ESC,
    CODE_BUTTON_ENTER: CODE_BUTTON_ENTER,
    // функции
    callPictureClick: callPictureClick,
    callPictureEnter: callPictureEnter
  };
})();
