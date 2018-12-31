'use strict';
var bigPictureItem = document.querySelector('.big-picture');
// bigPictureItem.classList.remove('hidden');

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION = [
  'Тестим новую камеру! =)',
  'Вот это виииииид!!!',
  'Божественно!!',
  'Ай да я!',
  'Мое первое фото. Не судите строго',
  'За оскорбления БАН!!!'
];
var NAMES = ['Артема', 'Саши', 'Маши', 'Дмитрия', 'Владимира', 'Арсения'];

// функция получения рандомного значения из массива
var getRandomValue = function (array) {
  var indexValue = Math.floor(Math.random() * (array.length - 1));
  return array[indexValue];
};

// функция получения рандомного значения из чисел
var getRandomNumber = function (min, max) {
  var indexNumber = Math.floor(Math.random() * (max - min) + min);
  return indexNumber;
};

// функция вывода данных описания фотографий
var IMAGES_COUNT = 25;
var MIN_VALUE = 1;
var MAX_VALUE_AVATARS = 7;
var MIN_VALUE_LIKES = 15;
var MAX_VALUE_LIKES = 201;

var MIN_COMMENTS_COUNT = 5;
var MAX_COMMENTS_COUNT = 25;

// функция создания содержимого comments
var createComment = function () {
  var comments = [];

  for (var i = 0; i < getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomNumber(MIN_VALUE, MAX_VALUE_AVATARS) + '.svg',
      message: getRandomValue(MESSAGES),
      name: getRandomValue(NAMES),
      description: getRandomValue(DESCRIPTION)
    };
    comments.push(comment);
  }
  return comments;
};

// функция подставления комментариев в выбранную фотографию
var commentsList = bigPictureItem.querySelector('.social__comments');
var bigPictureSocial = bigPictureItem.querySelector('.big-picture__social');
var commentTemplate = commentsList.querySelector('.social__comment');

var setComments = function (arrayComments) {
  for (var i = 0; i < arrayComments.length; i++) {
    var space = ' ';
    var commentsItem = commentTemplate.cloneNode(true);

    commentsItem.querySelector('.social__picture').src = arrayComments[i].avatar;
    commentsItem.querySelector('.social__text').textContent = arrayComments[i].message;
    commentsItem.querySelector('.social__picture').alt = 'Аватар' + space + arrayComments[i].name;

    bigPictureSocial.querySelector('.social__caption').textContent = arrayComments[i].description;
    bigPictureSocial.querySelector('.social__picture').src = arrayComments[i].avatar;
    bigPictureSocial.querySelector('.social__picture').alt = 'Аватар' + space + arrayComments[i].name;

    commentsList.appendChild(commentsItem);
  }
};

var removeComments = function () {
  var currentComments = commentsList.querySelectorAll('.social__comment');

  for (var i = 0; i < currentComments.length; i++) {
    commentsList.removeChild(currentComments[i]);
  }
};

// функция создания url, likes, comments
var createImages = function () {
  var images = [];

  for (var i = 0; i < IMAGES_COUNT; i++) {
    var imageNumber = i + 1;
    var newImage = {
      url: 'photos/' + imageNumber + '.jpg',
      likes: getRandomNumber(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
      comments: createComment()
    };
    images.push(newImage);
  }
  return images;
};

var IMAGES = createImages();

// функция подставления данных в гл.стр
var templatePicture = document.querySelector('#picture');

var setImages = function (arrayImages) {
  for (var i = 0; i < arrayImages.length; i++) {
    var templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);

    templateItem.querySelector('.picture__img').src = arrayImages[i].url;
    templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
    templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments.length;

    callPictureClick(templateItem, arrayImages[i]);
    callPictureEnter(templateItem, arrayImages[i]);

    var pictureItem = document.querySelector('.pictures');
    pictureItem.appendChild(templateItem);
  }
};

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

// функция добавления класса hidden к тем объектам, которые это заслужили
var addHiddenClass = function () {
  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.comments-loader').classList.add('visually-hidden');
};

addHiddenClass();

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
  removeComments();
  setComments(image.comments);
  commentInput.focus();
  document.addEventListener('keydown', pictureKeydownESCHandler);
};

var pictureClose = function () {
  bigPictureItem.classList.add('hidden');
  document.removeEventListener('keydown', pictureKeydownESCHandler);
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

// редактирование фильтра изображений
var uploadForm = document.querySelector('.img-upload__form');
var uploadFile = uploadForm.querySelector('#upload-file');
var uploadSetup = uploadForm.querySelector('.img-upload__overlay');
var hashtagInput = uploadForm.querySelector('.text__hashtags');
var setupClose = uploadForm.querySelector('.img-upload__cancel');

// закрытие окна с фильтрами при нажатии на ESC
var fileKeydownESCHandler = function (evt) {
  if (evt.keyCode === CODE_BUTTON_ESC) {
    evt.preventDefault();
    fileClose();
  }
};

var fileOpen = function () {
  uploadSetup.classList.remove('hidden');
  hashtagInput.focus();
  setFilterEffects();
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

// УДАЛИ потом
// uploadSetup.classList.remove('hidden');

// отпускание пина слайдера
var pinLine = uploadForm.querySelector('.effect-level__line');
// var pinLineFill = uploadForm.querySelector('.effect-level__depth');
var pin = uploadForm.querySelector('.effect-level__pin');
var MARVIN_VALUE = 100;
var PHOBOS_HEAT_VALUE = 3;

var percentGraySepia;
var percentMarvin;
var percentPhobosHeat;

// создание фильтров
var original = uploadForm.querySelector('label[for=effect-none]');
var chrome = uploadForm.querySelector('label[for=effect-chrome]');
var sepia = uploadForm.querySelector('label[for=effect-sepia]');
var marvin = uploadForm.querySelector('label[for=effect-marvin]');
var phobos = uploadForm.querySelector('label[for=effect-phobos]');
var heat = uploadForm.querySelector('label[for=effect-heat]');

var prewiev = uploadForm.querySelector('.img-upload__preview img');
var FILTERS = [
  'none',
  'grayscale(0)',
  'sepia(0)',
  'invert(0%)',
  'blur(0px)',
  'brightness(0.1)'
];
// var FILTERS = ['none', 'grayscale(1)', 'sepia(1)', 'invert(100%)', 'blur(3px)', 'brightness(3)'];
var FILTERS_EFFECTS;
var LABELS = [original, chrome, sepia, marvin, phobos, heat];

// подстановка массивов и переменных в функцию создания фильтров
var setFilterEffects = function () {
  for (var i = 0; i < LABELS.length; i++) {
    getFilterEffects(LABELS[i], FILTERS[i], i);
  }
};

// функция движения пина слайдера
var getFilterEffects = function (label, filter, i) {
  label.addEventListener('click', function () {
    prewiev.style.filter = filter;

    pin.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: pin.offsetLeft
        // x: evt.clientX
      };

      var pinMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var continueCoords = {
          x: startCoords.x - moveEvt.clientX
        };

        startCoords = {
          x: moveEvt.clientX
        };
        // pin.style.position = 'absolute';
        // var leftPinLine = getComputedStyle(pinLine).getPropertyValue('left');
        var testCoords = (pin.offsetLeft - continueCoords.x) + 'px';
        pin.style.left = testCoords;

        // if (pin.style.left < leftPinLine) {
        //   pin.style.left === 0;
        // } else {
        //   pin.style.left = testCoords;
        // }
      };

      var pinUpHandler = function () {
        percentGraySepia = pin.offsetLeft / pinLine.offsetWidth;
        percentMarvin = pin.offsetLeft * MARVIN_VALUE / pinLine.offsetWidth;
        percentPhobosHeat = pin.offsetLeft * PHOBOS_HEAT_VALUE / pinLine.offsetWidth;

        FILTERS_EFFECTS = [
          'none',
          'grayscale(' + percentGraySepia + ')',
          'sepia(' + percentGraySepia + ')',
          'invert(' + percentMarvin + '%' + ')',
          'blur(' + percentPhobosHeat + 'px' + ')',
          'brightness(' + percentPhobosHeat + ')'
        ];

        prewiev.style.filter = FILTERS_EFFECTS[i];

        document.removeEventListener('mousemove', pinMoveHandler);
        document.removeEventListener('mouseup', pinUpHandler);
      };

      document.addEventListener('mousemove', pinMoveHandler);
      document.addEventListener('mouseup', pinUpHandler);
    });
  });
};

// setFilterEffects();

// for (var i = 0; i <= 5; i++) {
//   setTimeout (function () {
//     console.log(i);
//   }, i * 1000)
// };

