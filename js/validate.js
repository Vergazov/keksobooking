import {
  typesAndPricePreview,
  changeTime,
  validateImage,
  validateInputLength,
  validatePrice,
  setRoomsCapacity,
} from './util.js';

import {
  TYPES_INFO,
  IMAGE_TYPES,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
} from './data.js';

// let avatarImage = document.querySelector('#avatar');
// validateImage(avatarImage,'ad-form-header', IMAGE_TYPES);

// let images = document.querySelector('#images');
// validateImage(images,'ad-form__photo-container', IMAGE_TYPES);

// let title = document.querySelector('#title');
// validateInputLength(title,MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);

// let price = document.querySelector('#price');
// validatePrice(price);

// typesAndPricePreview(TYPES_INFO);
// changeTime();
// setRoomsCapacity();

let form = document.querySelector('.ad-form');

let submitButon = document.querySelector('.ad-form__submit');

const showSuccessMessage = (response) => {
  if(response.ok){
    alert('Форма успешно отправлена');

  }
}

form.addEventListener('submit', (evt) => {

  evt.preventDefault();

  let isValid = true;

  let avatarImage = document.querySelector('#avatar');
  validateImage(avatarImage,'ad-form-header', IMAGE_TYPES);

  let images = document.querySelector('#images');
  validateImage(images,'ad-form__photo-container', IMAGE_TYPES);

  let title = document.querySelector('#title');
  validateInputLength(title,MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, isValid);

  console.log(isValid);

  let price = document.querySelector('#price');
  validatePrice(price);

  typesAndPricePreview(TYPES_INFO);
  changeTime();
  setRoomsCapacity();

  if(isValid){
    fetch('https://23.javascript.htmlacademy.pro/keksobooking', {
      method: 'POST',
      body: new FormData(form)
    })
    .then(showSuccessMessage)
    .catch((error) => console.log(error))
  }

});

