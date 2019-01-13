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
  var filtersButtonDiscussed = filtersWrapper.querySelector('#filter-discussed');
  var filtersButtonNew = filtersWrapper.querySelector('#filter-new');
  var filtersButtonPopular = filtersWrapper.querySelector('#filter-popular');

  var removeDate = function () {
    var dataPictures = document.querySelectorAll('.pictures .picture');

    dataPictures.forEach(function (picture, index, array) {
      window.pictures.pictureItem.removeChild(picture);
    });
  };

  var addActiveClass = function (buttonOne, buttonTwo, buttonThree) {
    buttonOne.classList.add('img-filters__button--active');
    buttonTwo.classList.remove('img-filters__button--active') || buttonThree.classList.remove('img-filters__button--active'); 
  };

  // устранение дребезга 
  var lastTimeout; 
  var clickDebounceHandler = function (filterPictures) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      window.pictures.setImages(filterPictures);
    }, 3000);
  };

  // фильтр по популярным(изначальный)
  var clickPopularHandler = function (evt) {
    addActiveClass(filtersButtonPopular, filtersButtonDiscussed, filtersButtonNew);
    removeDate();
    clickDebounceHandler(DATES);
    evt.stopPropagation();
  };

  // фильтр по комментариям
  var clickDiscussedHandler = function (evt) {
    var copyDates = DATES.slice();

    addActiveClass(filtersButtonDiscussed, filtersButtonNew, filtersButtonPopular);

    var discussedImages = copyDates.sort(function (left, right) {
      if (left.comments.length < right.comments.length) {
        return 1;
      } else if (left.comments.length > right.comments.length) {
        return -1;
      } else if (left.likes > right.likes) {
        return -1;
      } 
    });

    removeDate();
    clickDebounceHandler(discussedImages);
    evt.stopPropagation();
  };

  // фильтр по новинкам
  var clickNowHandler =  function (evt) {
    addActiveClass(filtersButtonNew, filtersButtonDiscussed, filtersButtonPopular);

    var newImages = function () {
      var arrayRandomPictures = [];
      var copyDates = DATES.slice();

      for (var i = 0; i < 10; i++) {
        var indexRandomPicture = Math.floor(Math.random() * (copyDates.length - 1));
        var randomPicture = copyDates[indexRandomPicture];

        copyDates.splice(indexRandomPicture, 1);
        arrayRandomPictures.push(randomPicture);
      };
      return arrayRandomPictures;
    };

    var newRandomImages = newImages();
    removeDate();
    clickDebounceHandler(newRandomImages);
    evt.stopPropagation();
  };

  // вызовы листенеров отрисовки фильтров
  filtersButtonPopular.addEventListener('click', clickPopularHandler);
  filtersButtonDiscussed.addEventListener('click', clickDiscussedHandler);
  filtersButtonNew.addEventListener('click', clickNowHandler);
  
})();
