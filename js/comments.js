'use strict';

(function () {
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

  // функция вывода данных описания фотографий
  var MIN_VALUE_AVATARS = 1;
  var MAX_VALUE_AVATARS = 7;

  var MIN_COMMENTS_COUNT = 5;
  var MAX_COMMENTS_COUNT = 25;

  // функция создания содержимого comments
  var createComment = function () {
    var comments = [];
  
    for (var i = 0; i < window.random.getRandomNumber(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
      var comment = {
        avatar: 'img/avatar-' + window.random.getRandomNumber(MIN_VALUE_AVATARS, MAX_VALUE_AVATARS) + '.svg',
        message: window.random.getRandomValue(MESSAGES),
        name: window.random.getRandomValue(NAMES),
        description: window.random.getRandomValue(DESCRIPTION)
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

  // функция удаления предыдущих комментариев
  var removeComments = function () {

    for (var i = 0; i < currentComments.length; i++) {
      commentsList.removeChild(currentComments[i]);
    }

    currentComments = [];
  };

  // функция скрытия комментариев, если их больше 5
  var hideComments = function () {

    for (var i = 5; i < currentComments.length; i++) {
      var hiddenComment = currentComments[i];
      hiddenComment.style.display = 'none';
    }
  };

  // глобальный вызов
  window.comments = {
    // переменные
    bigPictureItem: bigPictureItem,
    // функции
    createComment: createComment,
    setComments: setComments,
    removeComments: removeComments,
    hideComments: hideComments
  }
})();