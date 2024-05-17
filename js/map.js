import {
  getUpcomingAnnouncements,
  toggleState,
} from "./util.js";

import {
  TYPES_INFO
} from './data.js';

import{
  generateCard,
} from './templates.js';

toggleState();

const map = L.map('map-canvas')
.on('load', () => {
  toggleState();
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

  mainPinMarker.on('moveend', (evt) => {
    console.log(evt.target.getLatLng());
    adress.value = evt.target.getLatLng();
  });

  const pinIcon = L.icon({
    iconUrl: './leaflet/img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  let upcomingAnnouncements = getUpcomingAnnouncements();

  upcomingAnnouncements.forEach((value)=> {
    let lat = value.location.x;
    let lng = value.location.y;

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
  });
