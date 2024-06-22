import {TITLES, DESC, TYPES, CHECKIN, CHECKOUT, FEATURES, PHOTOS } from './data.js';

const getRandomIntInclusive = function (min, max) {

  min = Math.round(min);
  max = Math.round(max);

  if (min < 0) {
    return 'Минимальное значение должно быть больше либо равно 0';
  }
  if (min > max || min === max) {
    return 'Минимальное значение должно быть меньше максимального';
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloatInclusive = function (min, max, numberOfCharacters) {

  if (min < 0) {
    return 'Минимальное значение должно быть больше 0';
  }
  if (min > max || min === max) {
    return 'Минимальное значение должно быть меньше максимального';
  }
  let rand;

  rand = Math.random() * (max - min) + min;
  return rand.toFixed(numberOfCharacters);

}


const getRandomArrayValues = function (array) {

  let maxCountArray = array.length;

  let randomArrayValues = new Array(getRandomIntInclusive(0, maxCountArray)).fill(null).map(() => {
    return array[getRandomIntInclusive(0, maxCountArray - 1)];
  });

  return _.uniq(randomArrayValues);
}

let getCounter = function (counter) {
  counter += 1;
  if (counter < 10) {
    return '0' + counter;
  } else {
    return counter;
  }
}


const getUpcomingAnnouncements = function () {
  let upcomingAnnouncements = [];
  for (let i = 0; i < TITLES.length; i++) {
    upcomingAnnouncements.push({

      author: {
        avatar: 'img/avatars/user' + getCounter(i) + '.png',
      },
      offer: {
        title: TITLES[i],
        adress: 'location.' + getRandomFloatInclusive(1, 10, 2) + ', ' + 'location.' + getRandomFloatInclusive(1, 10, 2),
        price: getRandomIntInclusive(1500, 5000),
        type: TYPES[getRandomIntInclusive(0, 4)],
        rooms: getRandomIntInclusive(1, 5),
        guests: getRandomIntInclusive(1, 8),
        checkin: CHECKIN[getRandomIntInclusive(0, 2)],
        checkout: CHECKOUT[getRandomIntInclusive(0, 2)],
        features: getRandomArrayValues(FEATURES),
        description: DESC[i],
        photos: getRandomArrayValues(PHOTOS),
      },
      location: {
        x: getRandomFloatInclusive(35.65000, 35.70000, 5),
        y: getRandomFloatInclusive(139.70000, 139.80000, 5),
      }
    });
  }
  return upcomingAnnouncements;
}

const getHousingType = function(searchType, types){
  var search = types.find((type) => {
    if(searchType === type.type){
      return type;
    }
  });
  return search.analogy;
}

const addFeatures = function(feature, features){

  for(var i = 0; i < features.length; i++){
    if(features[i].className.includes('--' + feature)){
      features[i].textContent = feature;
    }
  }
}

const deleteEmptyFeatures = function(features){
  for(var i = 0; i < features.length; i++){
    if(features[i].textContent == ''){
      features[i].remove();
    }
  }
}

const hidefeaturesIfNeed = function(featuresBlock){
  // console.log(featuresBlock.children.length);
  if(featuresBlock.children.length === 0){
    featuresBlock.remove();
  }
}

const addPhotos = function(cardPhotos,photos){
  for(var i = 0; i < photos.length; i++){
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = photos[i];
    photo.width = 45;
    photo.height = 30;
    photo.alt = 'Фотография жилья';

    cardPhotos.appendChild(photo);
  }
}

const toggleState = function(){

  let form = document.querySelector('.ad-form');
  form.classList.toggle('ad-form--disabled');

  let formItems = form.children;
  for(let element of formItems){
    element.toggleAttribute('disabled', '');
  }

  let filters = document.querySelector('.map__filters');
  filters.classList.toggle('ad-form--disabled');

  let filterItems = filters.children;
  for(let filter of filterItems){
    filter.toggleAttribute('disabled','');
  }

  let features = document.querySelector('.map__features');
  features.classList.toggle('ad-form--disabled');
}

const typesAndPricePreview = function(types){

  var cardType = document.querySelector('#type');
  var cardPrice = document.querySelector('#price');

  var searchType = types.find((type) => {
    if(type.type === cardType.value){
      return type;
    }
  });

  cardPrice.placeholder = searchType.min_price;
  cardPrice.min = searchType.min_price;

  cardType.addEventListener('change',() => {
    var searchType = types.find((type) => {
      if(type.type === cardType.value){
        return type;
      }
    });

    cardPrice.placeholder = searchType.min_price;
    cardPrice.value = '';
    cardPrice.min = searchType.min_price;
  });
}

const changeTime = function(){
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', ()=>{
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', ()=>{
    timein.value = timeout.value;
  });
}

const validateImage = function(image,imageContainerClass, types){

  image.addEventListener('change',(evt)=>{
    let isImageRight = types.find((type) =>{
      if(type === evt.target.files[0].type){
        return type;
      }
    });

    let validateImageContainer = document.querySelector('.'+ imageContainerClass);
    let validateImage = document.createElement('div');
    validateImage.classList.add('validate_error');

    if(!isImageRight){
      validateImage.textContent = 'Вы выбрали файл с неверным форматом, пожалуйста выберите файл с изображением';
      validateImage.setAttribute('style','color:red;');
      validateImageContainer.appendChild(validateImage);
    }else{
      let validateError = document.querySelector('.validate_error');
      validateError.remove();
    }

  });
}

const validateInputLength = function(input, min, max, isValid){

  isValid = false;

  input.addEventListener('input', ()=>{

    const titleLength = input.value.length;

    if(titleLength < min) {
      input.setCustomValidity('Еще ' + (min - titleLength) + ' симв.');
    }else if(titleLength > max){
      input.setCustomValidity('Удалите лишние ' + (titleLength - max) + ' симв.')
    }else{
      input.setCustomValidity('');
    }

    // input.reportValidity();
  });
}

const validatePrice = function(price){

  price.addEventListener('input',() =>{

    if(isNaN(price.value)){
      price.setCustomValidity('Введите число')
    }else if(price.value > 1000000){
      price.setCustomValidity('Цена за ночь не должна быть выше 1 000 000 рублей')
    }else{
      price.setCustomValidity('');
    }

    price.reportValidity();

  });
}

const setRoomsCapacity = function(){

  let rooms = document.querySelector('#room_number');
  let capacity = document.querySelector('#capacity');
  let capacityItems = capacity.children;

  for(let item of capacityItems){
    if(rooms.value < Number(item.value)){
      item.setAttribute('disabled','');
    }else{
      item.setAttribute('selected','');
    }
  }

  rooms.addEventListener('change',(evt)=>{
    for(let item of capacityItems){
      if( Number(item.value) > evt.target.value){
        item.setAttribute('disabled','');
      }else{
        item.removeAttribute('disabled','');
        item.setAttribute('selected','');
      }
    }
    if(evt.target.value == 100){
      for(let item of capacityItems){
        if(Number(item.value) < 100){
          item.setAttribute('disabled','');
        }else{
          item.setAttribute('selected','');
        }
      }
    }
  });
}


export {
  getUpcomingAnnouncements,
  getHousingType,
  addFeatures,
  deleteEmptyFeatures,
  addPhotos,
  toggleState,
  hidefeaturesIfNeed,
  typesAndPricePreview,
  changeTime,
  validateImage,
  validateInputLength,
  validatePrice,
  setRoomsCapacity,
}
