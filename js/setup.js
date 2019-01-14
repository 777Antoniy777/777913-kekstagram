'use strict';

(function () {
  // редактирование фильтра изображений
  var main = document.querySelector('main');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFile = uploadForm.querySelector('#upload-file');
  var uploadSetup = uploadForm.querySelector('.img-upload__overlay');
  var setupClose = uploadForm.querySelector('.img-upload__cancel');
  var successTemplate = document.querySelector('#success').content.cloneNode(true);
  var errorTemplate = document.querySelector('#error').content.cloneNode(true);

  // закрытие окна с фильтрами при нажатии на ESC
  var fileKeydownESCHandler = function (evt) {
    if (evt.keyCode === window.openClose.Keycode.CODE_BUTTON_ESC) {
      evt.preventDefault();

      if (window.validity.hashtagInput !== evt.target && window.validity.hashtagCommentInput !== evt.target) {
        fileClose();
      }
    }
  };

  var fileOpen = function () {
    uploadSetup.classList.remove('hidden');

    window.validity.hashtagInput.focus();
    window.filters.setFilterEffects();
    window.validity.validateForm();
    window.scale.setScale();

    window.validity.hashtagInput.setCustomValidity('');
    window.validity.hashtagInput.style.border = '3px solid white';
    window.filters.effectsLevel.classList.add('hidden');
    window.filters.prewiev.style.filter = window.filters.FILTERS[0];
    window.filters.pinValueInput.value = '';
    window.filters.labelRadioButton.checked = 'checked';

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
    window.openClose.isEnterEvent(evt, fileClose);
  });

  setupClose.addEventListener('click', function () {
    fileClose();
  });

  // отправка данных на сервер
  var successFormHandler = function () {
    main.appendChild(successTemplate);
    successWrapper.style.display = 'flex';
    document.addEventListener('keydown', function (evt) {
      window.openClose.isEscEvent(evt, successFormClose);
    });
  };

  var errorFormHandler = function () {
    main.appendChild(errorTemplate);
    errorWrapper.style.display = 'flex';
    document.addEventListener('keydown', function (evt) {
      window.openClose.isEscEvent(evt, errorFormClose);
    });
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.backend.sendDataForm(new FormData(uploadForm), successFormHandler, errorFormHandler);
    uploadSetup.classList.add('hidden');
    uploadFile.value = '';
    window.validity.hashtagInput.value = '';
    window.validity.hashtagCommentInput.value = '';
    window.filters.labelRadioButton.checked = 'checked';

    evt.preventDefault();
  });

  var successButton = successTemplate.querySelector('.success__button');
  var errorButton = errorTemplate.querySelector('.error__button');
  var successWrapper = successTemplate.querySelector('.success');
  var errorWrapper = errorTemplate.querySelector('.error');

  // закрытие успешного и неуспешного сообщения разными способами
  // ESC
  var successFormClose = function () {
    successWrapper.style.display = 'none';
    document.removeEventListener('keydown', function (evt) {
      window.openClose.isEscEvent(evt, successFormClose);
    });
  };

  var errorFormClose = function () {
    errorWrapper.style.display = 'none';
    document.removeEventListener('keydown', function (evt) {
      window.openClose.isEscEvent(evt, errorFormClose);
    });
  };

  // click на кнопку
  successButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    successFormClose();
  });

  errorButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorFormClose();
  });

  // click на оверлэй
  successWrapper.addEventListener('click', function (evt) {
    evt.preventDefault();
    successFormClose();
  });

  errorWrapper.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorFormClose();
  });

  // глобальный вызов
  window.setup = {
    // переменные
    main: main,
    errorTemplate: errorTemplate,
    errorButton: errorButton,
    errorWrapper: errorWrapper,
    uploadForm: uploadForm,
    uploadSetup: uploadSetup
  };
})();
