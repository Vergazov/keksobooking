
import {
  showSuccessMessage,
  showErrorMessage,
} from './util.js';

import {
  mainPinMarker,
}from './map.js';

let form = document.querySelector('.ad-form');
form.addEventListener('submit', (evt) => {
evt.preventDefault();
  fetch('https://23.javascript.htmlacademy.pro/keksobooking', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(showSuccessMessage)
  .then(() => {
    let latlng = L.latLng(35.6817,139.7539);
    mainPinMarker.setLatLng(latlng);
  })
  .catch(showErrorMessage)
});
