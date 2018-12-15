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
var COMMENTS_COUNT = 10;
var MIN_VALUE = 1;
var MAX_VALUE_AVATARS = 7;
var MAX_VALUE_SRC = 26;
var MIN_VALUE_LIKES = 15;
var MAX_VALUE_LIKES = 201;

// функция создания содержимого comments
var createComment = function () {
  var comments = [];

  for (var j = 0; j < COMMENTS_COUNT; j++) {
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

var COMMENTS = createComment();

// функция подставления комментариев в выбранную фотографию
var commentsList = bigPictureItem.querySelector('.social__comments');
var bigPictureSocial = bigPictureItem.querySelector('.big-picture__social');
var BEGIN_COMMENTS_COUNT = commentsList.children.length;

var setComments = function (arrayComments) {
  for (var i = 0; i < arrayComments.length; i++) {
    var space = ' ';

    commentsList.querySelector('.social__picture').src = arrayComments[i].avatar;
    commentsList.querySelector('.social__text').textContent = arrayComments[i].message;
    commentsList.querySelector('.social__picture').alt = 'Аватар' + space + arrayComments[i].name;
    bigPictureSocial.querySelector('.social__caption').textContent = arrayComments[i].description;
    bigPictureSocial.querySelector('.social__picture').src = arrayComments[i].avatar;
    bigPictureSocial.querySelector('.social__picture').alt = 'Аватар' + space + arrayComments[i].name;

    var commentsItem = commentsList.querySelector('.social__comment').cloneNode(true);
    commentsList.appendChild(commentsItem);
  }

  for (i = 0; i < BEGIN_COMMENTS_COUNT; i++) {
    var beginComments = commentsList.querySelector('.social__comment');
    commentsList.removeChild(beginComments);
  }
};

setComments(COMMENTS);

// функция создания url, likes, comments
var createImages = function () {
  var images = [];

  for (var i = 0; i < IMAGES_COUNT; i++) {
    var newImage = {
      url: 'photos/' + getRandomNumber(MIN_VALUE, MAX_VALUE_SRC) + '.jpg',
      likes: getRandomNumber(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
      comments: COMMENTS_COUNT
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
    templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments;
    templateItem.classList.add('picture-' + [i]);

    var pictureItem = document.querySelector('.pictures');
    pictureItem.appendChild(templateItem);

    bigPictureItem.querySelector('.big-picture__img img').src = arrayImages[0].url;
    bigPictureItem.querySelector('.likes-count').textContent = arrayImages[0].likes;
    bigPictureItem.querySelector('.comments-count').textContent = arrayImages[0].comments;
  }
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

var pictureGallery = document.querySelector('.pictures .picture-0');
var bigPictureClose = bigPictureItem.querySelector('.big-picture__cancel');
bigPictureClose.tabIndex = 0;
var commentInput = bigPictureItem.querySelector('.social__footer-text');

var pictureKeydownESCHandler = function (evt) {
  if (evt.keyCode === CODE_BUTTON_ESC) {
    evt.preventDefault()
    pictureClose();
  } 
};

var pictureOpen = function () {
  bigPictureItem.classList.remove('hidden');
  commentInput.focus();
  document.addEventListener('keydown', pictureKeydownESCHandler);
};

var pictureClose = function () {
  bigPictureItem.classList.add('hidden');
  document.removeEventListener('keydown', pictureKeydownESCHandler);
};

// открытие полноэкранной картинки с помощью мыши и закрытие с помощью ESC
pictureGallery.addEventListener('click', function (evt) {
  evt.preventDefault();
  pictureOpen();
});

// открытие полноэкранной картинки с помощью ENTER и закрытие с помощью ESC
pictureGallery.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_BUTTON_ENTER) {
    evt.preventDefault();
    pictureOpen();
  }
});

// закрытие полноэкранной картинки с помощью мыши
bigPictureClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  pictureClose();
});

// закрытие полноэкранной картинки с помощью мыши
bigPictureClose.addEventListener('keydown', function () {
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
console.log(uploadFile);
console.log(uploadSetup);

var fileKeydownESCHandler = function (evt) {
  if (evt.keyCode === CODE_BUTTON_ESC) {
    evt.preventDefault()
    fileClose();
  } 
};

var fileOpen = function () {
  uploadSetup.classList.remove('hidden');
  hashtagInput.focus();
  document.addEventListener('keydown', fileKeydownESCHandler);
};

var fileClose = function () {
  uploadSetup.classList.add('hidden');
  document.removeEventListener('keydown', fileKeydownESCHandler);
};

// открытие окна с фильтрами

uploadFile.addEventListener('change', function () {
  fileOpen();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === CODE_BUTTON_ENTER) {
    fileClose();
  }
});

setupClose.addEventListener('click', function (evt) {
  fileClose();
});



