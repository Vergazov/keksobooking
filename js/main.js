import {
  TYPES_INFO
} from './data.js';

import {
  getUpcomingAnnouncements,
} from './util.js';

import{
  generateCard,
  } from './templates.js';

import {
  typesAndPricePreview,
  changeTime,
} from './form.js';

let upcomingAnnouncements = getUpcomingAnnouncements();

// generateCard(upcomingAnnouncements[0], TYPES_INFO);

// typesAndPricePreview(TYPES_INFO);
// changeTime();

var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
console.log(adForm.children);

const map = L.map('map-canvas')
.on('load', () => {
  console.log('Карта инициализирована')
})
  .setView({
    lat: 56.3370,
    lng: 30.5500,
  }, 12.3);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // const marker = L.marker(
  //   {
  //     lat: 56.3430,
  //     lng: 30.5300,
  //   },
  //   {
  //     draggable: true,
  //   },
  // );

  // marker.addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './leaflet/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 56.3473,
      lng: 30.4967,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
  });
