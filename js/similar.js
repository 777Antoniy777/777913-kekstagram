'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var POPULAR_INDEX_PICTURE = 10;

  // применение фильтров для галереи
  var filtersWrapper = document.querySelector('.img-filters');
  var filtersButtonDiscussed = filtersWrapper.querySelector('#filter-discussed');
  var filtersButtonNew = filtersWrapper.querySelector('#filter-new');
  var filtersButtonPopular = filtersWrapper.querySelector('#filter-popular');

  var removeDate = function () {
    var dataPictures = document.querySelectorAll('.pictures .picture');

    dataPictures.forEach(function (picture) {
      window.pictures.pictureItem.removeChild(picture);
    });
  };

  var addActiveClass = function (newActiveButton) {
    var prevActiveButton = document.querySelector('.img-filters__button--active');
      if (prevActiveButton) {
        prevActiveButton.classList.remove('img-filters__button--active');
      }

    newActiveButton.classList.add('img-filters__button--active');
  };

  // устранение дребезга
  var lastTimeout;

  var debounceClickHandler = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      window.pictures.setImages(cb);
    }, DEBOUNCE_INTERVAL);
  };

  // фильтр по популярным(изначальный)
  var popularClickHandler = function (evt) {
    addActiveClass(filtersButtonPopular);
    removeDate();
    debounceClickHandler(window.main.pictures);
    evt.stopPropagation();
  };

  // фильтр по комментариям
  var discussedClickHandler = function (evt) {
    var copyDates = window.main.pictures.slice();

    addActiveClass(filtersButtonDiscussed);

    var discussedImages = copyDates.sort(function (left, right) {
      if (left.comments.length < right.comments.length) {
        return 1;
      } 
      if (left.comments.length > right.comments.length) {
        return -1;
      } 
      if (left.likes > right.likes) {
        return -1;
      }
    });

    removeDate();
    debounceClickHandler(discussedImages);
    evt.stopPropagation();
  };

  // фильтр по новинкам
  var nowClickHandler = function (evt) {
    addActiveClass(filtersButtonNew);

    var newImages = function () {
      var arrayRandomPictures = [];
      var copyDates = window.main.pictures.slice();

      for (var i = 0; i < POPULAR_INDEX_PICTURE; i++) {
        var indexRandomPicture = Math.floor(Math.random() * (copyDates.length - 1));
        var randomPicture = copyDates[indexRandomPicture];

        copyDates.splice(indexRandomPicture, 1);
        arrayRandomPictures.push(randomPicture);
      }

      return arrayRandomPictures;
    };

    var newRandomImages = newImages();
    removeDate();
    debounceClickHandler(newRandomImages);
    evt.stopPropagation();
  };

  // вызовы листенеров отрисовки фильтров
  filtersButtonPopular.addEventListener('click', popularClickHandler);
  filtersButtonDiscussed.addEventListener('click', discussedClickHandler);
  filtersButtonNew.addEventListener('click', nowClickHandler);
})();
