'use strict';
(function () {
  // получение данных с сервера
  var DATES = [];
  var filtersWrapper = document.querySelector('.img-filters');

  var successPictureHandler = function (response) {
    DATES = response;
    window.pictures.setImages(response);
    filtersWrapper.classList.remove('img-filters--inactive');
    
    console.log(DATES);
  }

  var errorPictureHandler = function (errorMessage) {
    window.setup.main.appendChild(window.setup.errorTemplate);
    window.setup.errorWrapper.style.display = 'flex';
    document.addEventListener('keydown', popupPictureEscHandler);
    console.error(errorMessage);
  };

  window.backend.getDataPictures(successPictureHandler, errorPictureHandler);

  // закрытие неуспешного сообщения разными способами
  // ESC
  var popupPictureEscHandler = function (evt) {
    window.openClose.isEscEvent(evt, errorClose);
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

  // применение фильтров для галереи
  var filetersButtons = filtersWrapper.querySelectorAll('.img-filters__button');
  var filetersButtonDiscussed = filtersWrapper.querySelector('#filter-discussed');

  var removeDate = function () {
    var test_one = document.querySelector('.pictures');
    var test = document.querySelectorAll('.pictures .picture');
    console.log(test_one, test);

    DATES.forEach(function (date, index, array) {
      test_one.removeChild(test[index]);

      array = [];
    });
  };

  filetersButtonDiscussed.addEventListener('click', function () {
    var copyDates = DATES.slice();

    var similarImages = copyDates.sort(function (left, right) {
      if (left.comments.length < right.comments.length) {
        return 1;
      } else if (left.comments.length > right.comments.length) {
        return -1;
      } else if (left.likes > right.likes) {
        return -1;
      } 
    });

    removeDate();
    window.pictures.setImages(similarImages);
  });

})();
