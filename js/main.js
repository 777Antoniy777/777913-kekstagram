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

  // фильтр по популярным(изначальный)
  var clickPopularHandler = function () {
    addActiveClass(filtersButtonPopular, filtersButtonDiscussed, filtersButtonNew);
    removeDate();

    // устранение дребезга 
    var lastTimeout; 
    var clickDebounceHandler = function () {
     
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        window.pictures.setImages(DATES);
      }, 3000);
    };

    clickDebounceHandler();

    // window.pictures.setImages(DATES);
  };

  // фильтр по комментариям
  var clickDiscussedHandler = function () {
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

    // устранение дребезга 
    var lastTimeout; 
    var clickDebounceHandler = function () {
     
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        window.pictures.setImages(discussedImages);
      }, 3000);
    };

    clickDebounceHandler();

    // window.pictures.setImages(discussedImages);
  };

  // фильтр по новинкам
  var clickNowHandler =  function () {
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

    // устранение дребезга 
    var lastTimeout; 
    var clickDebounceHandler = function () {
     
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        window.pictures.setImages(newRandomImages);
      }, 3000);
    };

    clickDebounceHandler();
    // window.pictures.setImages(newRandomImages);
};

// // устранение дребезга 
// var lastTimeout; 
// var clickDebounceHandler = function () {
//   return function () {
//     if (lastTimeout) {
//       window.clearTimeout(lastTimeout);
//     }

//     lastTimeout = window.setTimeout(function () {
//       if (filtersButtonNew) {
//         clickNowHandler();
//       } 
//     }, 3000);
//   };
// }

  // вызовы листенеров отрисовки фильтров
  filtersButtonPopular.addEventListener('click', clickPopularHandler);
  filtersButtonDiscussed.addEventListener('click', clickDiscussedHandler);
  filtersButtonNew.addEventListener('click', clickNowHandler);
  
})();
