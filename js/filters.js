import {
  checkStatus,
  cutToTen,
  filter,
  render,
  removeOldMarkers,
  closePopup,
} from "./util.js";

let currentFilters = {

  type:'',
  price:'',
  rooms:'',
  guests:'',

  features: {
    wifi: '',
    dishwasher:'',
    parking:'',
    washer:'',
    elevator:'',
    conditioner:'',
  },

  setFilters: function(filters, features){
    this.type = filters[0].value;
    this.price = filters[1].value;
    this.rooms = filters[2].value;
    this.guests = filters[3].value;

    this.features.wifi = features[0].checked;
    this.features.dishwasher = features[1].checked;
    this.features.parking = features[2].checked;
    this.features.washer = features[3].checked;
    this.features.elevator = features[4].checked;
    this.features.conditioner = features[5].checked;
  },
}

let filtersBlock = document.querySelector('.map__filters');
let filters = filtersBlock.children;
let features = document.getElementsByClassName('map__checkbox');

const setCurrentFilters = function(){
  currentFilters.setFilters(filters,features);
}

let type = document.querySelector('#housing-type');
let price = document.querySelector('#housing-price');
let rooms = document.querySelector('#housing-rooms');
let guests = document.querySelector('#housing-guests');
let wifi = document.querySelector('#filter-wifi');
let dishwasher = document.querySelector('#filter-dishwasher');
let parking = document.querySelector('#filter-parking');
let washer = document.querySelector('#filter-washer');
let elevator = document.querySelector('#filter-elevator');
let conditioner = document.querySelector('#filter-conditioner');

type.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

price.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

rooms.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

guests.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

const filterBy = function(){
    closePopup();
    removeOldMarkers();
    setCurrentFilters();
  
    fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then(filter(currentFilters))
    .then(cutToTen)
    .then(render)
}

wifi.addEventListener('change', _.throttle(filterBy,2000));
dishwasher.addEventListener('change', _.throttle(filterBy,2000));

// wifi.addEventListener('change', () => {
//   closePopup();
//   removeOldMarkers();
//   setCurrentFilters();

//   fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
//   .then(checkStatus)
//   .then((response) => response.json())
//   .then(filter(currentFilters))
//   .then(cutToTen)
//   .then(render)
// });

// dishwasher.addEventListener('change', () => {
//   closePopup();
//   removeOldMarkers();
//   setCurrentFilters();

//   fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
//   .then(checkStatus)
//   .then((response) => response.json())
//   .then(filter(currentFilters))
//   .then(cutToTen)
//   .then(render)
// });

parking.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

washer.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

elevator.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});

conditioner.addEventListener('change', () => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filter(currentFilters))
  .then(cutToTen)
  .then(render)
});


