var deck = new Deck();
var playerVerification = null;
var game;
var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);

function onChange(payload){
  console.log("a change happened: ", payload);
}

function firebaseOnload(){
  backend.getAllData(function(data){
    $(".confirm-button").toggle();
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
      if(game.playerNames === undefined){
        $('body').text(game.players.length + " players have already been selected.");
        return null;
      }
      else{
        playerName = game.playerNames.pop()
        playerVerification = playerName;
        player = new Player(playerName, false);
        game.players.push(player);
      }
      // game.players.push(new Player(playerNames.pop(), false));
    }


    console.log('Game:', game);
    console.log('player verification is:', playerVerification);
    for(var player of game.players){
      player.cards = deck.dealPlayerCards(5);
    }
    player.makePlayerArea();
    $(".cardtext").on("click",handleCardClick);
    $(".confirm-button").on("click",handleConfirmButtonClick);
    game.gameCard = deck.dealGameCard();
    console.log(game.gameCard);
    $(".card-black").text(game.gameCard.text);
    backend.saveState(game);

  });


}

function handleCardClick(event){
  if(verifyPlayer().turn){

  }
  else{
    var whiteCardText = $(this).text();
    $(".card-white").text(whiteCardText);
    $(".confirm-button").toggle();
  }
}

function handleConfirmButtonClick(){
  var whiteCardText = $(".card-white").text();
  for(var player of game.players){
    for(var card of player.cards){
      if(card.text === whiteCardText){
        console.log(game);
        card.owner = playerVerification;
        if(game.selectedCards === undefined){
          game.selectedCards = [card];
        }
        else{
          game.selectedCards.push(card);
        }
        //deck.dealPlayerCards(1);
        console.log(game);
      }
    }
  }
  var arrWhiteCards = $(".cardtext");
  arrWhiteCards.each(function(index, element){
    if($(element).text() === whiteCardText){
      $(element).remove();
    }
  })
}

function verifyPlayer(){
  for(var player of game.players){
    if(player.name === playerVerification){
      return player;
    }
  }
}
//getAllData grabs the data at any point needed at the beginning
