const getRandomIntInclusive = function(min,max){

  min = Math.round(min);
  max = Math.round(max);

  if(min < 0){
    return 'Минимальное значение должно быть больше 0';
  }
  if(min > max || min === max){
    return 'Минимальное значение должно быть меньше максимального';
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomFloatInclusive = function(min,max, numberOfCharacters){

  if(min < 0){
    return 'Минимальное значение должно быть больше 0';
  }
  if(min > max || min === max){
    return 'Минимальное значение должно быть меньше максимального';
  }
  let rand;

  rand = Math.random() * (max - min) + min;
  return rand.toFixed(numberOfCharacters);

}

console.log(getRandomFloatInclusive(1.5,2,2));
