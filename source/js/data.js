const TYPES_INFO = [
  {
    type: 'flat',
    analogy: 'Квартира',
    min_price: 1000,
  },
  {
    type: 'bungalow',
    analogy: 'Бунгало',
    min_price: 0,
  },
  {
    type: 'house',
    analogy: 'Дом',
    min_price: 5000,
  },
  {
    type: 'palace',
    analogy: 'Дворец',
    min_price: 10000,
  },
  {
    type: 'hotel',
    analogy: 'Отель',
    min_price: 1000,
  },
];

const IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
];

const MIN_TITLE_LENGTH = 30;

const MAX_TITLE_LENGTH = 100;

const SERVER_URL = 'https://23.javascript.htmlacademy.pro/keksobooking/data';

const URLS = {
  getMarkersUrl: 'https://23.javascript.htmlacademy.pro/keksobooking/data',
  sendPostUrl: 'https://23.javascript.htmlacademy.pro/keksobooking',
}
const DEFAULT_COORDINATES =
  {
    lat:35.4122,
    lng:139.4130,
  }

export {
  TYPES_INFO,
  IMAGE_TYPES,
  MIN_TITLE_LENGTH,
  MAX_TITLE_LENGTH,
  SERVER_URL,
  URLS,
  DEFAULT_COORDINATES
}

