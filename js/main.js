console.log(document.querySelector('#picture'));
console.log(document.querySelector('.pictures'));

// var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

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
var MIN_VALUE = 1;
var MAX_VALUE_AVATARS = 7;
var MAX_VALUE_SRC = 26;
var MIN_VALUE_LIKES = 15;
var MAX_VALUE_LIKES = 201;

var createImages = function (array) {
  var images = [];
  
  // for (var i = 0; i < IMAGES_COUNT; i++) {
    var comment = {
      avatar: "img/avatar-" + getRandomNumber(MIN_VALUE, MAX_VALUE_AVATARS) + ".svg",
      message: MESSAGES[getRandomValue(MESSAGES)],
      name: NAMES[getRandomValue(NAMES)]
    }

    var newImage = {
      url: 'photos/' + getRandomNumber(MIN_VALUE, MAX_VALUE_SRC) + '.jpg',
      likes: getRandomNumber(MIN_VALUE_LIKES, MAX_VALUE_LIKES),
      comments: comment
    }
    images.push(newImage);
  // }
  return images;
}

// console.log(createImages());

// функция подставления данных в template
var setImages = function (array) {
var templatePicture = document.querySelector('#picture').content.querySelector('a').cloneNode(true);
var templateImg = templatePicture.querySelector('picture__img').style.src = createImages(images[i]);;
console.log(templatePicture);

// templateImg.style.src = createImages(images[i]);
}

setImages();