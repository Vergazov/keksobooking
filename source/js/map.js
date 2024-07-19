import {
  DEFAULT_COORDINATES,
  URLS
} from './data.js';

import {
  toggleFormState,
  toggleFilterState,
  checkStatus,
  cutToTen,
  render,
  showError
} from './util.js';

import L from './../../build/leaflet/leaflet/leaflet';

const resetLatLng = function(defCoordinates){
  let latlng = L.latLng(defCoordinates.lat,defCoordinates.lng);
  let address = document.querySelector('#address');
  mainPinMarker.setLatLng(latlng);
  address.value = mainPinMarker.getLatLng();
}

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
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
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

let stateStatus = document.querySelector('.ad-form');

if(!stateStatus.classList.contains('ad-form--disabled')){
  fetch(URLS.getMarkersUrl)
    .then(checkStatus)
    .then((response) => response.json())
    .then(cutToTen)
    .then((json) => render(json))
    .catch(() => showError());

  toggleFilterState();
}

export {
  map,
  pinIcon,
  resetLatLng
}
