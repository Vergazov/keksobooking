import {
  toggleFormState,
  toggleFilterState,
  checkStatus,
  cutToTen,
} from "./util.js";

import {
  TYPES_INFO
} from './data.js';

import{
  generateCard,
} from './templates.js';

toggleFormState();
toggleFilterState();

const map = L.map('map-canvas')
.on('load', () => {
  toggleFormState();
})
  .setView({
    lat: 35.6817,
    lng: 139.7539,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6817,
    lng: 139.7539,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

let adress = document.querySelector('#address');

adress.value = mainPinMarker.getLatLng();

mainPinMarker.on('moveend', (evt) => {
  adress.value = evt.target.getLatLng();
});

const pinIcon = L.icon({
  iconUrl: './leaflet/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [26, 40],
});

const showError = () => {

  let mapErrorMessage = document.createElement('div');
  mapErrorMessage.classList.add('map__error_message');

  let childElement = document.querySelector('.map__canvas');
  let parentElement = childElement.parentNode;
  mapErrorMessage.innerHTML = '<p>Произошла ошибка при загрузкe данных с сервера</p>';
  parentElement.insertBefore(mapErrorMessage, childElement);
}


let stateStatus = document.querySelector('.ad-form');
let markers = [];
let currMarkers = [];

if(!stateStatus.classList.contains('ad-form--disabled')){
  currMarkers = fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then(cutToTen)
    .then((json) => json.forEach((value) => {
      let lat = value.location.lat;
      let lng = value.location.lng;
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon: pinIcon
        },
    );
    marker
    .addTo(map)
    .bindPopup(
      generateCard(value,TYPES_INFO),
      {
        keepInView: true,
      }
    );
    markers.push(marker);
    return markers;
    }))
    .catch((error) => showError());

    toggleFilterState();
}

export {
  mainPinMarker,
  map,
  pinIcon,
  currMarkers,
}
