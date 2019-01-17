'use strict';

(function () {
  var INDEX_HIDDEN_COMMENTS = 5;
  var INDEX_VISIBLE_VALUE = 5;

  var bigPictureItem = document.querySelector('.big-picture');

  // функция подставления комментариев в выбранную фотографию
  var commentsList = bigPictureItem.querySelector('.social__comments');
  var bigPictureSocial = bigPictureItem.querySelector('.big-picture__social');
  var commentTemplate = commentsList.querySelector('.social__comment');
  var currentComments = commentsList.querySelectorAll('.social__comment');
  var button = bigPictureItem.querySelector('.comments-loader');
  var currentValue = bigPictureItem.querySelector('.current-comments-count');

  var render = function (arrayComments) {
    arrayComments.forEach(function (comments) {
      var commentsItem = commentTemplate.cloneNode(true);

      commentsItem.querySelector('.social__picture').src = comments.avatar;
      commentsItem.querySelector('.social__text').textContent = comments.message;
      commentsItem.querySelector('.social__picture').alt = 'Аватар ' + comments.name;

      commentsList.appendChild(commentsItem);
      currentComments.push(commentsItem);
    });
  };

  // функция удаления предыдущих комментариев
  var remove = function () {
    currentComments.forEach(function (comments) {
      commentsList.removeChild(comments);
    });

    currentComments = [];
  };

  // функция скрытия комментариев, если их больше 5
  var hide = function () {

    for (var i = INDEX_HIDDEN_COMMENTS; i < currentComments.length; i++) {
      var hiddenComment = currentComments[i];
      hiddenComment.style.display = 'none';
    }
  };

  // функция открытия новых комментариев
  var showCommentsNew = function () {
    button.addEventListener('click', function () {
      var start = window.comments.currentCount;

      if (window.comments.currentCount + INDEX_VISIBLE_VALUE < currentComments.length) {
        window.comments.currentCount += INDEX_VISIBLE_VALUE;
        currentValue.textContent = window.comments.currentCount;
      } else {
        window.comments.currentCount = currentComments.length;
        button.classList.add('hidden');
        currentValue.textContent = currentComments.length;
      }

      for (var i = start; i < window.comments.currentCount; i++) {
        var visibleComment = currentComments[i];
        visibleComment.style.display = 'flex';
      }
    });
  };

  showCommentsNew();

  // глобальный вызов
  window.comments = {
    // переменные
    bigPictureItem: bigPictureItem,
    bigPictureSocial: bigPictureSocial,
    INDEX_VISIBLE_VALUE: INDEX_VISIBLE_VALUE,
    button: button,
    currentValue: currentValue,
    currentCount: 0,
    // функции
    render: render,
    remove: remove,
    hide: hide,
  };
})();
