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
var currentComments = commentsList.querySelectorAll('.social__comment');
var SPACE = ' ';

var setComments = function (arrayComments) {
  for (var i = 0; i < arrayComments.length; i++) {
    var commentsItem = commentTemplate.cloneNode(true);

    commentsItem.querySelector('.social__picture').src = arrayComments[i].avatar;
    commentsItem.querySelector('.social__text').textContent = arrayComments[i].message;
    commentsItem.querySelector('.social__picture').alt = 'Аватар' + SPACE + arrayComments[i].name;

    bigPictureSocial.querySelector('.social__caption').textContent = arrayComments[i].description;
    bigPictureSocial.querySelector('.social__picture').src = arrayComments[i].avatar;
    bigPictureSocial.querySelector('.social__picture').alt = 'Аватар' + SPACE + arrayComments[i].name;

    commentsList.appendChild(commentsItem);

    currentComments.push(commentsItem);
  }
};

var removeComments = function () {

  for (var i = 0; i < currentComments.length; i++) {
    commentsList.removeChild(currentComments[i]);
  }

  currentComments = [];
};

var hideComments = function () {

  for (var i = 5; i < currentComments.length; i++) {
    var hiddenComment = currentComments[i];
    hiddenComment.style.display = 'none';
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
var body = document.querySelector('body');

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
  body.classList.add('modal-open');
  removeComments();
  setComments(image.comments);

  hideComments();

  commentInput.focus();
  document.addEventListener('keydown', pictureKeydownESCHandler);
};

var pictureClose = function () {
  bigPictureItem.classList.add('hidden');
  document.removeEventListener('keydown', pictureKeydownESCHandler);
  body.classList.remove('modal-open');
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

    if (hashtagInput !== evt.target) {
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

// отпускание пина слайдера
var pinLine = uploadForm.querySelector('.effect-level__line');
var pinLineFill = uploadForm.querySelector('.effect-level__depth');
var pin = uploadForm.querySelector('.effect-level__pin');
var MARVIN_VALUE = 100;
var PHOBOS_VALUE = 3;
var HEAT_VALUE_MIN = 1;
var HEAT_VALUE_MAX = 3;

// создание фильтров
var original = uploadForm.querySelector('label[for=effect-none]');
var chrome = uploadForm.querySelector('label[for=effect-chrome]');
var sepia = uploadForm.querySelector('label[for=effect-sepia]');
var marvin = uploadForm.querySelector('label[for=effect-marvin]');
var phobos = uploadForm.querySelector('label[for=effect-phobos]');
var heat = uploadForm.querySelector('label[for=effect-heat]');

var prewiev = uploadForm.querySelector('.img-upload__preview');
// var FILTERS = [
//   'none',
//   'grayscale(0)',
//   'sepia(0)',
//   'invert(0%)',
//   'blur(0px)',
//   'brightness(0.1)'
// ];
var FILTERS = [
  'none',
  'grayscale(1)',
  'sepia(1)',
  'invert(100%)',
  'blur(3px)',
  'brightness(3)'
];

// var CLASS_PREVIEW = 'effects__preview';
// var FILTERS = [
//   CLASS_PREVIEW + '--none',
//   CLASS_PREVIEW + '--chrome',
//   CLASS_PREVIEW + '--sepia',
//   CLASS_PREVIEW + '--marvin',
//   CLASS_PREVIEW + '--phobos',
//   CLASS_PREVIEW + '--heat'
// ];
var FILTERS_EFFECTS;
var LABELS = [original, chrome, sepia, marvin, phobos, heat];
var FILTER_INDEX = 0;

var testField = uploadSetup.querySelector('.img-upload__effect-level');

// подстановка массивов и переменных в функцию создания фильтров
var setFilterEffects = function () {
  for (var i = 0; i < LABELS.length; i++) {
    getFilterEffects(LABELS[i], FILTERS[i], i);
  }
};

// функция движения пина слайдера
var getFilterEffects = function (label, filter, i) {
  label.addEventListener('click', function () {
    // prewiev.classList.add(filter);
    prewiev.style.filter = filter;
    pin.style.left = 100 + '%';
    pinLineFill.style.width = 100 + '%';
    FILTER_INDEX = i;

    if (i === 0) {
      testField.classList.add('hidden');
    } else {
      testField.classList.remove('hidden');
    }
  });
};

pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX
  };

  var pinMoveHandler = function (moveEvt) {
    moveEvt.preventDefault();

    var continueCoords = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords = {
      x: moveEvt.clientX
    };

    var percentGraySepia = pin.offsetLeft / pinLine.offsetWidth;
    var percentMarvin = pin.offsetLeft * MARVIN_VALUE / pinLine.offsetWidth;
    var percentPhobos = pin.offsetLeft * PHOBOS_VALUE / pinLine.offsetWidth;
    var perscentHeat = (pin.offsetLeft * (HEAT_VALUE_MAX - HEAT_VALUE_MIN) / pinLine.offsetWidth) + HEAT_VALUE_MIN;

    FILTERS_EFFECTS = [
      'none',
      'grayscale(' + percentGraySepia + ')',
      'sepia(' + percentGraySepia + ')',
      'invert(' + percentMarvin + '%' + ')',
      'blur(' + percentPhobos + 'px' + ')',
      'brightness(' + perscentHeat + ')'
    ];

    prewiev.style.filter = FILTERS_EFFECTS[FILTER_INDEX];
    pinLineFill.style.width = (pin.offsetLeft - continueCoords.x) + 'px';

    if (pin.offsetLeft < 0) {
      pin.style.left = 0 + '%';
    } else if (pin.offsetLeft > pinLine.offsetWidth) {
      pin.style.left = 100 + '%';
    } else {
      pin.style.left = (pin.offsetLeft - continueCoords.x) + 'px';
    }
  };

  var pinUpHandler = function () {
    document.removeEventListener('mousemove', pinMoveHandler);
    document.removeEventListener('mouseup', pinUpHandler);
  };

  document.addEventListener('mousemove', pinMoveHandler);
  document.addEventListener('mouseup', pinUpHandler);
});

// валидация текстовых инпутов в окне фильтра

// var uploadForm = document.querySelector('.img-upload__form');
// var uploadFile = uploadForm.querySelector('#upload-file');
// var uploadSetup = uploadForm.querySelector('.img-upload__overlay');
// var hashtagInput = uploadForm.querySelector('.text__hashtags');
// var setupClose = uploadForm.querySelector('.img-upload__cancel');
var hashtagCommentInput = uploadForm.querySelector('.text__description');
uploadForm.action = 'https://js.dump.academy/kekstagram';

var validateForm = function () {
  hashtagInput.type = 'text';
  hashtagInput.minLength = '2';
  hashtagCommentInput.maxLength = '140';

  hashtagInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var HASHTAGS = target.value.split(' ');

    target.setCustomValidity('');

    if (HASHTAGS.length > 5) {
      hashtagInput.setCustomValidity('Не больше 5-ти хэштэгов');
    } else {

      for (var i = 0; i < HASHTAGS.length; i++) {
        if (HASHTAGS[i].length < 2) {
          target.setCustomValidity('Хэштэг слишком короткий');
        } else if (HASHTAGS[i].substr(0, 1) !== '#') {
          target.setCustomValidity('Необходима "#"');
        } else if (HASHTAGS[i].length > 20) {
          hashtagInput.setCustomValidity('Хэштэг слишком длинный');
        }

        for (var j = 0; j < HASHTAGS.length; j++) {
          if (HASHTAGS[i].toLowerCase() === HASHTAGS[j].toLowerCase() && i !== j) {
            hashtagInput.setCustomValidity('Найден одинаковый хэштэг');
          }
        }
      }
    }
  });
};

// функция изменения масштаба
var setScale = function () {
  var buttonBigger = uploadForm.querySelector('.scale__control--bigger');
  var buttonSmaller = uploadForm.querySelector('.scale__control--smaller');
  var buttonValue = uploadForm.querySelector('.scale__control--value');
  buttonValue.readOnly = false;
  buttonValue.value = 100 + '%';
  prewiev.style.transform = 'scale(1)';
  buttonValue.maxLength = 4;

  var scaleValues = [25, 50, 75, 100];
  var scaleValueIndex = 3;

  buttonSmaller.addEventListener('click', function () {
    if (scaleValueIndex === scaleValues.length - 4) {
      buttonValue.value = 25 + '%';
      prewiev.style.transform = 'scale(' + 25 / 100 + ')';
    } else {
      scaleValueIndex--;
    }

    buttonValue.value = scaleValues[scaleValueIndex] + '%';
    prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
  });

  buttonBigger.addEventListener('click', function () {
    if (scaleValueIndex === scaleValues.length - 1) {
      buttonValue.value = 100 + '%';
      prewiev.style.transform = 'scale(' + 100 / 100 + ')';
    } else {
      scaleValueIndex++;
    }

    buttonValue.value = scaleValues[scaleValueIndex] + '%';
    prewiev.style.transform = 'scale(' + scaleValues[scaleValueIndex] / 100 + ')';
  });

  var changeButtonValue = function () {
    buttonValue.addEventListener('input', function (evt) {
      var target = evt.target;
      var scaleValue = parseInt(target.value, 10);

      if (scaleValue >= 25 && scaleValue <= 100) {
        prewiev.style.transform = 'scale(' + scaleValue / 100 + ')';
      }
    });
  };

  changeButtonValue();
};

// for (var i = 0; i <= 5; i++) {
//   setTimeout (function () {
//     console.log(i);
//   }, i * 1000)
// };
