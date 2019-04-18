var deck = new Deck();
var playerVerification = null;
var game;
var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);

function onChange(payload){
  console.log("a change happened: ", payload);
}

function firebaseOnload(){
  backend.getAllData(function(data){
    console.log("data is:",data);
    var playerName = null;
    var player = null;
    if(data === null){
      game = new Game(deck.getWhiteCards(cardText), deck.getBlackCards(cardText));
      // game.players.push(new Player(playerNames.pop(), true));
      playerName = game.playerNames.pop()
      player = new Player(playerName, true);
      playerVerification = playerName;
      game.players.push(player);
    }
    else{
      game = data;
      playerName = game.playerNames.pop()
      playerVerification = playerName;
      player = new Player(playerName, false);
      game.players.push(player);
      // game.players.push(new Player(playerNames.pop(), false));
    }
    console.log('Game:', game);
    console.log('player verification is:', playerVerification);
    for(var player of game.players){
      player.cards = deck.dealPlayerCards(5);
    }
    player.makePlayerArea();
    game.gameCard = deck.dealGameCard();
    console.log(game.gameCard);
    $(".card-black").text(game.gameCard.text);
    backend.saveState(game);

  });


}

window.onload = function(){
}
//getAllData grabs the data at any point needed at the beginning
