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

  let randomArrayValues = new Array(getRandomIntInclusive(1, maxCountArray)).fill(null).map(() => {
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


export {
  getUpcomingAnnouncements,
  getHousingType,
  addFeatures,
  deleteEmptyFeatures,
  addPhotos,
}
