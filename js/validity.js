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
      var hashtags = target.value.split(' ');

      target.setCustomValidity('');

      if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('Не больше 5-ти хэштэгов');
        hashtagInput.style.border = '2px solid red';
      } else {
        hashtagInput.style.border = '2px solid white';

        for (var i = 0; i < hashtags.length; i++) {
          if (hashtags[i].length < 2) {
            target.setCustomValidity('Хэштэг слишком короткий');
            hashtagInput.style.border = '2px solid red';
          } else if (hashtags[i].substr(0, 1) !== '#') {
            target.setCustomValidity('Необходима "#"');
            hashtagInput.style.border = '2px solid red';
          } else if (hashtags[i].length > 20) {
            hashtagInput.setCustomValidity('Хэштэг слишком длинный');
            hashtagInput.style.border = '2px solid red';
          }

          for (var j = 0; j < hashtags.length; j++) {
            if (hashtags[i].toLowerCase() === hashtags[j].toLowerCase() && i !== j) {
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
