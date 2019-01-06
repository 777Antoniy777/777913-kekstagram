'use strict';

(function () {
// валидация текстовых инпутов в окне фильтра
var hashtagInput = uploadForm.querySelector('.text__hashtags');
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
})()