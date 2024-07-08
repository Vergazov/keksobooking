import {
  checkStatus,
  cutToTen,
  filtered,
  filtered1,
  render,
  removeOldMarkers,
  closePopup,
} from "./util.js";

import {
  currMarkers,
} from "./map.js";

let currentFilters = {
  type:'',
  price:'',
  rooms:'',
  guests:'',

  setType: function(type){
    this.type = type
  },
  setPrice: function(price){
    if(price >= 10000 && price <= 50000){}
    this.price = price
  },
  setRooms: function(rooms){
    this.rooms = rooms
  },
  setGuests: function(guests){
    this.guests = guests
  }
}
const setCurrentFilters = function(){
  currentFilters.setType(filters[0].value);
  currentFilters.setPrice(filters[1].value);
  currentFilters.setRooms(filters[2].value);
  currentFilters.setGuests(filters[3].value);
}

const getCurrentFilters = function(){
  for(let i = 0; i < filters.length - 1; i++){
    filtersValues.push(filters[i].value);
  }
  return filtersValues;
}

let type = document.querySelector('#housing-type');
let price = document.querySelector('#housing-price');

let filtersBlock = document.querySelector('.map__filters');
let filters = filtersBlock.children;


// console.log(filtersValues);

type.addEventListener('change', (evt) => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();
  // let filters = getCurrentFilters();
  console.log(currentFilters);

  let type = evt.target.value;
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filtered1(currentFilters))
  // .then(filtered(type))
  .then(cutToTen)
  .then(render)

});

price.addEventListener('change', (evt) => {
  closePopup();
  removeOldMarkers();
  setCurrentFilters();
  // let filters = getCurrentFilters();
  console.log(currentFilters);

  let price = evt.target.value;
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filtered1(currentFilters))
  // .then(filtered(price))
  .then(cutToTen)
  .then(render)

});


