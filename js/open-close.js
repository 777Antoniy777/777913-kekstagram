'use strict';

(function () {
  var Keycode = {
    CODE_BUTTON_ESC: 27,
    CODE_BUTTON_ENTER: 13
  };

  var isEscEvent = function (evt, action, actions) {
    if (evt.keyCode === Keycode.CODE_BUTTON_ESC) {
      evt.preventDefault();
      action(actions);
    }
  };

  var isEnterEvent = function (evt, action, actions) {
    if (evt.keyCode === Keycode.CODE_BUTTON_ENTER) {
      evt.preventDefault();
      action(actions);
    }
  };

  // глобальный вызов
  window.openClose = {
    // переменные
    Keycode: Keycode,
    // функции
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
