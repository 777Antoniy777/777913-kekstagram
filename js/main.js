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
  var filtersButtons = filtersWrapper.querySelectorAll('.img-filters__button');
  var filtersButtonDiscussed = filtersWrapper.querySelector('#filter-discussed');
  var filtersButtonNew = filtersWrapper.querySelector('#filter-new');
  var filtersButtonPopular = filtersWrapper.querySelector('#filter-popular');
  // var copyDates = DATES.slice();

  var removeDate = function () {
    var test_one = document.querySelector('.pictures');
    var test_two = document.querySelectorAll('.pictures .picture');
    console.log(test_one, test_two);

    DATES.forEach(function (date, index, array) {
      test_one.removeChild(test_two[index]);

      array = [];
    });
  };

  var addActiveClass = function (param1, param2, param3) {
    param1.classList.add('img-filters__button--active');
    param3.classList.remove('img-filters__button--active') || param2.classList.remove('img-filters__button--active'); 
  };

  // фильтр по популярным(изначальный)
  filtersButtonPopular.addEventListener('click', function () {
    addActiveClass(filtersButtonPopular, filtersButtonDiscussed, filtersButtonNew);
    removeDate();
    window.pictures.setImages(DATES);
  });


  // фильтр по комментариям
  filtersButtonDiscussed.addEventListener('click', function () {
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
    window.pictures.setImages(discussedImages);
  });

  // фильтр по новинкам
  filtersButtonNew.addEventListener('click', function () {

    addActiveClass(filtersButtonNew, filtersButtonDiscussed, filtersButtonPopular);

    var newImages = function () {
      var arrayRandomPictures = [];

      for (var i = 0; i < 10; i++) {
        var randomPicture = window.random.getRandomValue(DATES);
        arrayRandomPictures.push(randomPicture);
      }
      return arrayRandomPictures;
    }

    removeDate();
    console.log(window.pictures.setImages(newImages()));
  });

})();
