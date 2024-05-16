import {
  TYPES_INFO
} from './data.js';

import {
  typesAndPricePreview,
  changeTime,
} from './form.js';

import './map.js';


const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 35;

let title = document.querySelector('#title');

title.addEventListener('input', ()=>{

  const titleLength = title.value.length;

  if(titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Еще ' + (MIN_TITLE_LENGTH - titleLength) + ' симв.');
  }else if(titleLength > MAX_TITLE_LENGTH){
    title.setCustomValidity('Удалите лишние ' + (titleLength - MAX_TITLE_LENGTH) + ' симв.')
  }else{
    title.setCustomValidity('');
  }

  title.reportValidity();
});

let price = document.querySelector('#price');

price.addEventListener('input',() =>{

  console.log(!isNaN(price.value));
  if(isNaN(price.value)){
    price.setCustomValidity('Введите число')
  }else if(price.value > "100000"){
    price.setCustomValidity('Цена за ночь не должна быть выше 100 000 рублей')
  }else{
    price.setCustomValidity('');
  }

  price.reportValidity();
});

// generateCard(upcomingAnnouncements[0], TYPES_INFO);
typesAndPricePreview(TYPES_INFO);
changeTime();


