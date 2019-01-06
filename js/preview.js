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
      if (evt.keyCode === CODE_BUTTON_ENTER) {
        evt.preventDefault();
        pictureOpen(image);
      }
    });
  };
  
  setImages(IMAGES);

  // открытие и закрытие большого фото при нажатии на любое фото в галерее
var CODE_BUTTON_ESC = 27;
var CODE_BUTTON_ENTER = 13;

var bigPictureClose = bigPictureItem.querySelector('.big-picture__cancel');
bigPictureClose.tabIndex = 0;
var commentInput = bigPictureItem.querySelector('.social__footer-text');

var pictureKeydownESCHandler = function (evt) {
  if (evt.keyCode === CODE_BUTTON_ESC) {
    evt.preventDefault();
    pictureClose();
  }
};

var pictureOpen = function (image) {
  bigPictureItem.classList.remove('hidden');
  bigPictureItem.querySelector('.big-picture__img img').src = image.url;
  bigPictureItem.querySelector('.likes-count').textContent = image.likes;
  bigPictureItem.querySelector('.comments-count').textContent = image.comments.length;
  body.classList.add('modal-open');
  removeComments();
  setComments(image.comments);

  hideComments();

  commentInput.focus();
  document.addEventListener('keydown', pictureKeydownESCHandler);
};

var pictureClose = function () {
  bigPictureItem.classList.add('hidden');
  document.removeEventListener('keydown', pictureKeydownESCHandler);
  body.classList.remove('modal-open');
};

// закрытие полноэкранной картинки с помощью мыши
bigPictureClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  pictureClose();
});

// закрытие полноэкранной картинки с помощью мыши
bigPictureClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_BUTTON_ENTER) {
    evt.preventDefault();
    pictureClose();
  }
});
})()