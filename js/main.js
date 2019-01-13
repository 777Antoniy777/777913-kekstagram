'use strict';
(function () {
  // получение данных с сервера
  var pictures = [];
  var filtersWrapper = document.querySelector('.img-filters');

  var successPictureHandler = function (response) {
    window.main.pictures = response;
    window.pictures.setImages(response);
    filtersWrapper.classList.remove('img-filters--inactive');
  };

  var errorPictureHandler = function () {
    window.setup.main.appendChild(window.setup.errorTemplate);
    window.setup.errorWrapper.style.display = 'flex';
    document.addEventListener('keydown', popupPictureEscHandler);
  };

  window.backend.getDataPictures(successPictureHandler, errorPictureHandler);

  // закрытие неуспешного сообщения разными способами
  // ESC
  var popupPictureEscHandler = function (evt) {
    window.openClose.isEscEvent(evt, errorPictureClose);
  };

  var errorPictureClose = function () {
    window.setup.errorWrapper.style.display = 'none';
    document.removeEventListener('keydown', popupPictureEscHandler);
  };

  // click на кнопку
  window.setup.errorButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorPictureClose();
  });

  // click на оверлэй
  window.setup.errorWrapper.addEventListener('click', function (evt) {
    evt.preventDefault();
    errorPictureClose();
  });

  // глобальный вызов
  window.main = {
    // переменные
    successPictureHandler: successPictureHandler,
    errorPictureHandler: errorPictureHandler,

    pictures: pictures,
    // filtersWrapper: filtersWrapper
  };
})();
