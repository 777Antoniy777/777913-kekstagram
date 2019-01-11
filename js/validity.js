'use strict';

(function () {
  // валидация текстовых инпутов в окне фильтра
  var hashtagInput = window.setup.uploadForm.querySelector('.text__hashtags');
  var hashtagCommentInput = window.setup.uploadForm.querySelector('.text__description');
  window.setup.uploadForm.action = 'https://js.dump.academy/kekstagram';

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
        hashtagInput.style.border = '2px solid red';
      } else {
        hashtagInput.style.border = '2px solid white';

        for (var i = 0; i < HASHTAGS.length; i++) {
          if (HASHTAGS[i].length < 2) {
            target.setCustomValidity('Хэштэг слишком короткий');
            hashtagInput.style.border = '2px solid red';
          } else if (HASHTAGS[i].substr(0, 1) !== '#') {
            target.setCustomValidity('Необходима "#"');
            hashtagInput.style.border = '2px solid red';
          } else if (HASHTAGS[i].length > 20) {
            hashtagInput.setCustomValidity('Хэштэг слишком длинный');
            hashtagInput.style.border = '2px solid red';
          }

          for (var j = 0; j < HASHTAGS.length; j++) {
            if (HASHTAGS[i].toLowerCase() === HASHTAGS[j].toLowerCase() && i !== j) {
              hashtagInput.setCustomValidity('Найден одинаковый хэштэг');
              hashtagInput.style.border = '2px solid red';
            }
          }

          if (target.value === '') {
            hashtagInput.style.border = '2px solid white';
          }
        }
      }
    });
  };

  // глобальный вызов
  window.validity = {
    // переменные
    hashtagInput: hashtagInput,
    hashtagCommentInput: hashtagCommentInput,
    // функции
    validateForm: validateForm
  };
})();
