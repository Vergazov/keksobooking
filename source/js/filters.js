import {
  checkStatus,
  cutToTen,
  filter,
  removeOldMarkers,
  closePopup,
  render
} from './util.js';

import {
  URLS
} from './data.js';

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
const filterBy = function(){
  closePopup();
  removeOldMarkers();
  setCurrentFilters();

  fetch(URLS.getMarkersUrl)
    .then(checkStatus)
    .then((response) => response.json())
    .then(filter(currentFilters))
    .then(cutToTen)
    .then(render)
}

filtersBlock.addEventListener('change', _.throttle(filterBy,500));



