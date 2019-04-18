var deck = new Deck();
var game;
var playerNames = ["player3", "player2", "player1"];
var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);

function onChange(payload){
  console.log("a change happened: ", payload);
}

function firebaseOnload(){
  backend.getAllData(function(data){
    console.log("data is:",data);
    var player = null;
    if(data === null){
      game = new Game(deck.getWhiteCards(cardText), deck.getBlackCards(cardText));

      // game.players.push(new Player(playerNames.pop(), true));
      player = new Player(playerNames.pop(), true);
      game.players.push(player);
    }
    else{
      game = data;
      player = new Player(playerNames.pop(), false);
      game.players.push(player);
      // game.players.push(new Player(playerNames.pop(), false));
    }
    console.log('Game:', game);
    for(var player of game.players){
      player.cards = deck.dealPlayerCards(5);
    }
    player.makePlayerArea();
    game.gameCard = deck.dealGameCard();
    $(".card-black").text(game.gameCard);
    backend.saveState(game);

  });


}

window.onload = function(){

}
//getAllData grabs the data at any point needed at the beginning
