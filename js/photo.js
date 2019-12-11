'use strict';
(function () {
  var PHOTO_HEIGHT = '60';
  var PHOTO_WIDTH = '60';

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var fileChooserPhoto = document.querySelector('.ad-form__input');
  var photoPreviewContainer = document.querySelector('.ad-form__photo');

  var setUploadPicPreview = function (fileChooser, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  };

  var setUploadPhotoPreview = function () {
    var uploadPhoto = document.createElement('img');
    uploadPhoto.setAttribute('width', PHOTO_WIDTH);
    uploadPhoto.setAttribute('height', PHOTO_HEIGHT);
    photoPreviewContainer.appendChild(uploadPhoto);
    setUploadPicPreview(fileChooserPhoto, uploadPhoto);
  };

  fileChooserAvatar.addEventListener('change', function () {
    setUploadPicPreview(fileChooserAvatar, avatarPreview);
  });
  fileChooserPhoto.addEventListener('change', function () {
    setUploadPhotoPreview();
  });
})();
