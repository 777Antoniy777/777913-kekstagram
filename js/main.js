console.log(document.querySelector('#picture'));
console.log(document.querySelector('.pictures'));
console.log(document.querySelector('.big-picture'));

var bigPictureItem = document.querySelector('.big-picture');
bigPictureItem.classList.remove('hidden');

var MESSAGES = [
  'Всё отлично!', 
  'В целом всё неплохо. Но не всё.', 
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = ['Артем', 'Саша', 'Маша', 'Дмитрий'];

// функция получения рандомного значения из массива
var getRandomValue = function (array) {
  for (var i = 0; i <= array.length; i++) {
    var randomValue = Math.floor(Math.random() * i);
  }
  return randomValue;
}

// функция получения рандомного значения из чисел
var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
}

// функция вывода данных описания фотографий
var IMAGES_COUNT = 25;
var COMMENTS_COUNT = 125;
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
      avatar: "img/avatar-" + getRandomNumber(MIN_VALUE, MAX_VALUE_AVATARS) + ".svg",
      message: MESSAGES[getRandomValue(MESSAGES)],
      name: NAMES[getRandomValue(NAMES)]
    }
    comments.push(comment);
  }
  return comments;
}

var COMMENTS = createComment();

// функция подставления комментариев в выбранную фотографию
var commentsList = bigPictureItem.querySelector('.social__comments');
console.log(commentsList);

var setComments = function (arrayComments) {
  for (var i = 0; i < arrayComments.length; i++) {

  commentsList.querySelector('.social__picture').src = arrayComments[i].avatar;
  commentsList.querySelector('.social__text').textContent = arrayComments[i].message;

  var commentsItem = commentsList.querySelector('.social__comment').cloneNode(true);
  commentsList.appendChild(commentsItem);
  }
}

setComments(COMMENTS);

// функция создания url, likes, comments
var createImages = function () {
  var images = [];
  // var comments = [];
  
  // for (var j = 0; j < COMMENTS_COUNT; j++) {
  //   var comment = {
  //     avatar: "img/avatar-" + getRandomNumber(MIN_VALUE, MAX_VALUE_AVATARS) + ".svg",
  //     message: MESSAGES[getRandomValue(MESSAGES)],
  //     name: NAMES[getRandomValue(NAMES)]
  //   }
  //   comments.push(comment);
  // }

  for (var i = 0; i < IMAGES_COUNT; i++) {
    var newImage = {
      url: 'photos/' + getRandomNumber(MIN_VALUE, MAX_VALUE_SRC) + '.jpg',
      likes: getRandomNumber(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
      comments: COMMENTS_COUNT
    }
    images.push(newImage);
  }
  return images;
}

console.log(createImages());

var IMAGES = createImages();

// функция подставления данных в гл.стр
var templatePicture = document.querySelector('#picture');

var setImages = function (arrayImages) {
  for (var i = 0; i < arrayImages.length; i++) {
  var templateItem = templatePicture.content.querySelector('.picture').cloneNode(true);

  templateItem.querySelector('.picture__img').src = arrayImages[i].url;
  templateItem.querySelector('.picture__likes').textContent = arrayImages[i].likes;
  templateItem.querySelector('.picture__comments').textContent = arrayImages[i].comments;

  var pictureItem = document.querySelector('.pictures');
  pictureItem.appendChild(templateItem);

  bigPictureItem.querySelector('.big-picture__img').querySelector('img').src = arrayImages[0].url;
  bigPictureItem.querySelector('.likes-count').textContent = arrayImages[0].likes;
  bigPictureItem.querySelector('.comments-count').textContent = arrayImages[0].comments;
  }
}

setImages(IMAGES);