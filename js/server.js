
import {
  showSuccessMessage,
  showErrorMessage,
} from './util.js';

let form = document.querySelector('.ad-form');

form.addEventListener('submit', (evt) => {

evt.preventDefault();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking', {
    method: 'POST',
    body: new FormData(form)
  })
  .then(showSuccessMessage)
  .catch(showErrorMessage)
});
