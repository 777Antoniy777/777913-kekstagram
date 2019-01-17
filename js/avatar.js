'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

  var defaultImage = document.querySelector('.img-upload__overlay img');

  window.setup.uploadFile.addEventListener('change', function () {
    var file = window.setup.uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.setup.fileOpen();
        defaultImage.src = reader.result;
      });

      reader.readAsDataURL(file);

    } else {
      defaultImage.src = 'img/upload-default-image.jpg';
      window.setup.errorFormHandler();
    }
  });
})();
