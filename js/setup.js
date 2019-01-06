'use strict';

(function () {
// редактирование фильтра изображений
var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadSetup = uploadForm.querySelector('.img-upload__overlay');
var setupClose = uploadForm.querySelector('.img-upload__cancel');

// закрытие окна с фильтрами при нажатии на ESC
var fileKeydownESCHandler = function (evt) {
  if (evt.keyCode === CODE_BUTTON_ESC) {
    evt.preventDefault();

    if (hashtagInput !== evt.target && hashtagCommentInput !== evt.target) {
      fileClose();
    }
  }
};

var fileOpen = function () {
  uploadSetup.classList.remove('hidden');
  hashtagInput.focus();
  setFilterEffects();
  validateForm();
  setScale();
  testField.classList.add('hidden');
  prewiev.style.filter = FILTERS[0];
  pin.style.left = 100 + '%';
  pinLineFill.style.width = 100 + '%';
  document.addEventListener('keydown', fileKeydownESCHandler);
};

var fileClose = function () {
  uploadSetup.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', fileKeydownESCHandler);
};

// открытие окна с фильтрами
uploadFile.addEventListener('change', function () {
  fileOpen();
});

// закрытие окна с фильтрами при нажатии на мышь и ENTER
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_BUTTON_ENTER) {
    fileClose();
  }
});

setupClose.addEventListener('click', function () {
  fileClose();
});
})()
