import {
  getHousingType,
  addFeatures,
  deleteEmptyFeatures,
  addPhotos,
} from './util.js';

var generateCard = function(card, types){

  var cardTemplate = document.querySelector('#card').content;
  var cardItemTemplate = cardTemplate.querySelector('.popup');
  var clonedItem = cardItemTemplate.cloneNode(true);

  clonedItem.querySelector('.popup__title').textContent = card.offer.title;
  clonedItem.querySelector('.popup__text--address').textContent = card.offer.adress;
  clonedItem.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  clonedItem.querySelector('.popup__type').textContent = getHousingType(card.offer.type, types);
  clonedItem.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  clonedItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд  до ' + card.offer.checkout;
  clonedItem.querySelector('.popup__description').textContent = card.offer.description;
  clonedItem.querySelector('.popup__avatar').src = card.author.avatar;

  var features = clonedItem.querySelectorAll('.popup__feature');

  for(var i = 0; i < card.offer.features.length; i++){
    addFeatures(card.offer.features[i], features);
  }
  deleteEmptyFeatures(features);

  var cardPhotos = clonedItem.querySelector('.popup__photos');
  var photos = card.offer.photos;

  addPhotos(cardPhotos, photos);

  var cardModule = document.querySelector('#map-canvas');
  cardModule.appendChild(clonedItem);
}

export {generateCard}
