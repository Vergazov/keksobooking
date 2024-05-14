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

generateCard(upcomingAnnouncements[0], TYPES_INFO);

typesAndPricePreview(TYPES_INFO);
changeTime();
