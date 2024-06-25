
import {
  showSuccessMessage,
  showErrorMessage,
} from './util.js';

import {
  mainPinMarker,
}from './map.js';

let form = document.querySelector('.ad-form');
let adress = document.querySelector('#address');
let latlng = L.latLng(35.6817,139.7539);

form.addEventListener('submit', (evt) => {
evt.preventDefault();
  fetch('https://23.javascript.htmlacademy.pro/keksobooking', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(showSuccessMessage)
  .then(() => {
    mainPinMarker.setLatLng(latlng);
    adress.value = mainPinMarker.getLatLng();

  })
  .catch(showErrorMessage)
});

let resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', () => {
  let form = document.querySelector('.ad-form');
  let filters = document.querySelector('.map__filters')
  form.reset();
  filters.reset();
  adress.value = mainPinMarker.setLatLng(latlng);
  adress.value = mainPinMarker.getLatLng();
});
