import {
  TYPES_INFO
} from './data.js';

import {
  map,
  pinIcon
} from './map.js';

// генерация балуна

const getHousingType = function(searchType, types){
  let search = types.find((type) => {
    if(searchType === type.type){
      return type;
    }
  });
  return search.analogy;
}

const addFeatures = function(feature, features){

  for(let i = 0; i < features.length; i++){
    if(features[i].className.includes('--' + feature)){
      features[i].textContent = feature;
    }
  }
}

const deleteEmptyFeatures = function(features){
  for(let i = 0; i < features.length; i++){
    if(features[i].textContent === ''){
      features[i].remove();
    }
  }
}

const hideFeaturesIfNeed = function(featuresBlock){
  if(featuresBlock.children.length === 0){
    featuresBlock.remove();
  }
}

const addPhotos = function(cardPhotos,photos){
  for(let i = 0; i < photos.length; i++){
    let photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.src = photos[i];
    photo.width = 45;
    photo.height = 30;
    photo.alt = 'Фотография жилья';

    cardPhotos.appendChild(photo);
  }
}

let generateCard = function(card, types){
  let cardTemplate = document.querySelector('#card').content;
  let cardItemTemplate = cardTemplate.querySelector('.popup');
  let clonedItem = cardItemTemplate.cloneNode(true);

  clonedItem.querySelector('.popup__title').textContent = card.offer.title;
  clonedItem.querySelector('.popup__text--address').textContent = card.offer.adress;
  clonedItem.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  clonedItem.querySelector('.popup__type').textContent = getHousingType(card.offer.type, types);
  clonedItem.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  clonedItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд  до ' + card.offer.checkout;
  clonedItem.querySelector('.popup__description').textContent = card.offer.description;
  clonedItem.querySelector('.popup__avatar').src = card.author.avatar;

  let featuresBlock = clonedItem.querySelector('.popup__features');
  let features = clonedItem.querySelectorAll('.popup__feature');

  if(card.offer.features !== undefined){
    for(let i = 0; i < card.offer.features.length; i++){
      addFeatures(card.offer.features[i], features);
    }
  }

  deleteEmptyFeatures(features);
  hideFeaturesIfNeed(featuresBlock);

  let cardPhotos = clonedItem.querySelector('.popup__photos');
  let photos = '';
  if(card.offer.photos !== undefined){
    photos = card.offer.photos;
  }

  addPhotos(cardPhotos, photos);

  return clonedItem;
}
//

// включение/выключение формы и фильтров
const toggleFormState = function(){

  document.querySelector('.ad-form').classList.toggle('ad-form--disabled');
  document.querySelector('.ad-form-header').toggleAttribute('disabled');

  let adFormEl = document.querySelectorAll('.ad-form__element');
  adFormEl.forEach((value)=>{
    value.toggleAttribute('disabled');
  })

  let featuresForm = document.querySelectorAll('.feature__checkbox');
  featuresForm.forEach((value)=>{
    value.toggleAttribute('disabled');
  })

  document.querySelector('#address').setAttribute('readonly', '');
}

const toggleFilterState = function(){

  document.querySelector('.map__filters').classList.toggle('ad-form--disabled');

  let filters = document.querySelectorAll('.map__filter');
  filters.forEach((value)=>{
    value.toggleAttribute('disabled');
  });

  let features = document.querySelectorAll('.map__checkbox');
  features.forEach((value)=>{
    value.toggleAttribute('disabled');
  });
}
//

// методы относящиеся к форме в т.ч. валидация
const typesAndPricePreview = function(types){

  let cardType = document.querySelector('#type');
  let cardPrice = document.querySelector('#price');

  let searchType = types.find((type) => {
    if(type.type === cardType.value){
      return type;
    }
  });

  cardPrice.placeholder = searchType.min_price;
  cardPrice.min = searchType.min_price;

  cardType.addEventListener('change',() => {
    let searchType = types.find((type) => {
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
  let timein = document.querySelector('#timein');
  let timeout = document.querySelector('#timeout');

  timein.addEventListener('change', ()=>{
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', ()=>{
    timein.value = timeout.value;
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
    if(evt.target.value === '100'){
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

const validateImage = function(image,imageContainerClass, types){

  image.addEventListener('change',(evt)=>{
    let isImageRight = types.find((type) => {
      if(type === evt.target.files[0].type){
        return type;
      }
      else{
        return false;
      }
    });

    let validateImageContainer = document.querySelector('.'+ imageContainerClass);
    let validateImage = document.createElement('div');
    validateImage.classList.add('validate_error');
    validateImageContainer.appendChild(validateImage);

    if(!isImageRight){
      validateImage.textContent = 'Вы выбрали файл с неверным форматом, пожалуйста выберите файл с изображением';
      validateImage.setAttribute('style','color:red;');
      image.setCustomValidity('Вы выбрали файл с неверным форматом, пожалуйста выберите файл с изображением');
    }else{
      let validateError = validateImageContainer.children[2];
      image.setCustomValidity('');
      validateError.remove();
    }
  });
}

const validateInputLength = function(input, min, max){

  input.addEventListener('input', ()=>{

    const titleLength = input.value.length;

    if(titleLength < min) {
      input.setCustomValidity('Еще ' + (min - titleLength) + ' симв.');
    }else if(titleLength > max){
      input.setCustomValidity('Удалите лишние ' + (titleLength - max) + ' симв.')
    }else{
      input.setCustomValidity('');
    }

    input.reportValidity();
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

const showSuccessMessage = function(response){
  if(response.ok){
    let parent = document.querySelector('body');

    let successMessageTemplate = document.querySelector('#success').content;
    let successMessage = successMessageTemplate.querySelector('.success');
    let clonedMessage = successMessage.cloneNode(true);

    parent.appendChild(clonedMessage);

    let form = document.querySelector('.ad-form');
    let filters = document.querySelector('.map__filters')
    form.reset();
    filters.reset();

    document.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape'){
        parent.removeChild(clonedMessage);
      }
    });

    document.addEventListener('click', ()=> {
      if(parent.contains(clonedMessage)){
        parent.removeChild(clonedMessage);
      }
    });

  }
}

const showErrorMessage = () => {
  let parent = document.querySelector('body');

  let errorMessageTemplate = document.querySelector('#error').content;
  let errorMessage = errorMessageTemplate.querySelector('.error');
  let clonedMessage = errorMessage.cloneNode(true);

  parent.appendChild(clonedMessage);

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      parent.removeChild(clonedMessage);
    }
  });

  document.addEventListener('click', ()=> {
    if(parent.contains(clonedMessage)){
      parent.removeChild(clonedMessage);
    }
  });
}
//

// методы относящиеся к карте

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const {statusText, status} = response;
  throw new Error(`${status} — ${statusText}`);
}

const cutToTen = function(json){
  if(json.length > 10){
    return json.slice(0, 10);
  }else{
    return json;
  }
}

const filterPrice = function(currentFilters, filtered){
  switch(currentFilters.price){
    case 'middle':
      filtered = filtered.filter((value) => value.offer.price >= 10000 && value.offer.price <= 50000);
      break;
    case 'low':
      filtered = filtered.filter((value) => value.offer.price < 10000);
      break;
    case 'high':
      filtered = filtered.filter((value) => value.offer.price > 50000);
      break;
  }
  return filtered;
}

const filterByFeatures = function (currentFilters, filtered){
  for(let feature in currentFilters.features){
    if(currentFilters.features[feature]) {
      filtered = filtered.filter((value) => {
        if(value.offer.features){
          return value.offer.features.find((value) => {return value === feature});
        }
      });
    }
  }
  return filtered;
}

const filter = function(currentFilters){

  let filtered = ['empty'];
  return function(json){
    if(currentFilters.type !== 'any'){
      filtered = json.filter((value) => value.offer.type === currentFilters.type);
    }else{
      filtered = json;
    }
    if(currentFilters.price !== 'any'){
      filtered = filterPrice(currentFilters, filtered, json);
    }
    if(currentFilters.rooms !== 'any'){
      filtered = filtered.filter((value) => value.offer.rooms === parseInt(currentFilters.rooms));
    }
    if(currentFilters.guests !== 'any'){
      filtered = filtered.filter((value) => value.offer.guests === parseInt(currentFilters.guests));
    }
    filtered = filterByFeatures(currentFilters, filtered);
    return filtered;
  }
}

const removeOldMarkers = function(){
  let panes = document.querySelectorAll('.leaflet-marker-icon');
  panes.forEach((value) =>{
    if(value.src.indexOf('main-pin.svg') === -1){
      value.remove();
    }
  })
}

const render = function(target){
  target.forEach((value) =>{
    let lat = value.location.lat;
    let lng = value.location.lng;
    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        generateCard(value,TYPES_INFO),
        {
          keepInView: true,
        },
      );
  });
}

const closePopup = function() {
  map.closePopup();
}
//
export {
  getHousingType,
  addFeatures,
  deleteEmptyFeatures,
  addPhotos,
  generateCard,
  toggleFormState,
  toggleFilterState,
  hideFeaturesIfNeed,
  typesAndPricePreview,
  changeTime,
  validateImage,
  validateInputLength,
  validatePrice,
  setRoomsCapacity,
  showSuccessMessage,
  showErrorMessage,
  checkStatus,
  cutToTen,
  filter,
  removeOldMarkers,
  render,
  closePopup
}
