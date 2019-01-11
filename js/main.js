'use strict';
(function () {
  // получение данных с сервера
  var DATES = [];
  var filtersWrapper = document.querySelector('.img-filters');

  var successPictureHandler = function (response) {
    DATES.push(response);
    window.pictures.setImages(response);
    filtersWrapper.classList.remove('img-filters--inactive');
  }
  console.log(DATES);

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

  filetersButtonDiscussed.addEventListener('click', function () {
    var copyDates = DATES.slice();
    copyDates.filter(function (date, index, array) {
      console.log(date[index].comments);
      return date[index].comments;
    }).forEach(function (date, index, array) {
      console.log(date[index].comments);
    })
  })
  //   copyDates.sort(function (left, right) {
  //     return right - left;
  //   });
  //   console.log(copyDates);
  // });

})();
