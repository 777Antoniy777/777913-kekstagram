'use strict';

(function () {
  var URL_FORM = 'https://js.dump.academy/kekstagram';
  var URL_PICTURES = 'https://js.dump.academy/kekstagram/data';

  var Datacode = {
    SUCCESS: 200
  };

  var TimeoutValue = {
    FORM_VALUE: 3000,
    GALLERY_VALUE: 10000
  };

  var sendDataForm = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Datacode.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TimeoutValue.FORM_VALUE;

    xhr.open('POST', URL_FORM);
    xhr.send(data);
  };

  var getDataPictures = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_PICTURES);

    xhr.addEventListener('load', function () {
      if (xhr.status === Datacode.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TimeoutValue.GALLERY_VALUE;

    xhr.send();
  };

  // глобальный вызов
  window.backend = {
    // функции
    sendDataForm: sendDataForm,
    getDataPictures: getDataPictures
  };

})();
