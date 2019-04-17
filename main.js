var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);
backend.initialize();
backend.start();

function onChange(payload){
  console.log("a change happened: ", payload);
}

function firebaseOnload(){
  var game = new Game();
  backend.saveState(game);
  backend.getAllData(function(data){
    console.log(data);
  });
}

window.onload = function(){
  console.log(cardText);
}
//getAllData grabs the data at any point needed at the beginning
