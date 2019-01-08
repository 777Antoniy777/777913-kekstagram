'use strict';

window.openClose = (function() {
  var CODE_BUTTON_ESC = 27;
  var CODE_BUTTON_ENTER = 13;

 return {
    isEscEvent: function (evt, action, actions) {
      if (evt.keyCode === CODE_BUTTON_ESC) {
        evt.preventDefault();
        action(actions);
      }
    },
    isEnterEvent: function (evt, action, actions) {
      if (evt.keyCode === CODE_BUTTON_ENTER) {
        evt.preventDefault();
        action(actions);
      }
    }
  }

})()
