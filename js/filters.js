
import {
  checkStatus,
  cutToTen,
  filtered,
  render,
  removeOldMarkers,
} from "./util.js";

let type = document.querySelector('#housing-type');

type.addEventListener('change', (evt) => {
  removeOldMarkers();
  let target = evt.target.value;
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
  .then(checkStatus)
  .then((response) => response.json())
  .then(filtered(target))
  .then(cutToTen)
  .then(render)
});
