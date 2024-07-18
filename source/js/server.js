import {
  DEFAULT_COORDINATES,
  URLS
}from './data.js';

import {
  showSuccessMessage,
  showErrorMessage
} from './util.js';

import {
  resetLatLng
}from './map.js';

let form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetch(URLS.sendPostUrl, {
    method: 'POST',
    body: new FormData(form),
  })
    .then(showSuccessMessage)
    .then(resetLatLng(DEFAULT_COORDINATES))
    .catch(showErrorMessage)

});

let resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  let form = document.querySelector('.ad-form');
  let filters = document.querySelector('.map__filters')
  form.reset();
  filters.reset();
  resetLatLng(DEFAULT_COORDINATES);
});
