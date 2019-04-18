var game;
var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);
backend.initialize();
backend.start();

function onChange(payload){
  console.log("a change happened: ", payload);
}

function firebaseOnload(){
  game = new Game();
  backend.saveState(game);
  backend.getAllData(function(data){
    console.log(data);
  });
}

window.onload = function(){
  game.deck.shuffleGameDeck();
  game.deck.shufflePlayerDeck();

  for(var player of game.players){
    player.cards = game.deck.dealPlayerCards(5);
  }
  console.log(game.players);
}
//getAllData grabs the data at any point needed at the beginning
