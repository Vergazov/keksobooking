const typesAndPricePreview = function(types){

  var cardType = document.querySelector('#type');
  var cardPrice = document.querySelector('#price');

  var searchType = types.find((type) => {
    if(type.type === cardType.value){
      return type;
    }
  });

  cardPrice.placeholder = searchType.min_price;
  cardPrice.min = searchType.min_price;

  cardType.addEventListener('change',() => {
    var searchType = types.find((type) => {
      if(type.type === cardType.value){
        return type;
      }
    });

    cardPrice.placeholder = searchType.min_price;
    cardPrice.min = searchType.min_price;
  });
}

const changeTime = function(){
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', ()=>{
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', ()=>{
    timein.value = timeout.value;
  });
}

export {
  typesAndPricePreview,
  changeTime,
}
