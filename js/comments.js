'use strict';

(function () {
  var INDEX_HIDDEN_COMMENTS = 5;

  var bigPictureItem = document.querySelector('.big-picture');

  // функция подставления комментариев в выбранную фотографию
  var commentsList = bigPictureItem.querySelector('.social__comments');
  var bigPictureSocial = bigPictureItem.querySelector('.big-picture__social');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var currentComments = commentsList.querySelectorAll('.social__comment');

  var setComments = function (arrayComments) {
    for (var i = 0; i < arrayComments.length; i++) {
      var commentsItem = commentTemplate.cloneNode(true);

      commentsItem.querySelector('.social__picture').src = arrayComments[i].avatar;
      commentsItem.querySelector('.social__text').textContent = arrayComments[i].message;
      commentsItem.querySelector('.social__picture').alt = 'Аватар ' + arrayComments[i].name;

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

    for (var i = INDEX_HIDDEN_COMMENTS; i < currentComments.length; i++) {
      var hiddenComment = currentComments[i];
      hiddenComment.style.display = 'none';
    }
  };

  // глобальный вызов
  window.comments = {
    // переменные
    bigPictureItem: bigPictureItem,
    bigPictureSocial: bigPictureSocial,
    // функции
    setComments: setComments,
    removeComments: removeComments,
    hideComments: hideComments
  };
})();
