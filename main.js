var deck = new Deck();
deck.shuffleGameDeck();
deck.shufflePlayerDeck();
var playerVerification = null;
var game;
var backend = new GenericFBModel("Cards Against Humanity", onChange, firebaseOnload);

function onChange(payload){

}

function firebaseOnload(){
  backend.getAllData(function(data){
    var selectedCardsRef = backend.db.database().ref("Cards Against Humanity/selectedCards");
    $(".confirm-button").hide();
    var playerName = null;
    var player = null;
    if(data === null){
      game = new Game(deck.playerDeck, deck.gameDeck, backend);
      // game.players.push(new Player(playerNames.pop(), true));
      playerName = game.data.playerNames.pop()
      player = new Player(playerName, true);
      playerVerification = playerName;
      if(game.data.players === null){
        game.data.players = [player];
      }
      else{
        game.data.players.push(player);
      }
    }
    else{
      game = new Game(deck.getWhiteCards(cardText), deck.getBlackCards(cardText), backend);
      game.data = data;

      if(game.data.playerNames === undefined){
        $('body').text(game.data.players.length + " players have already been selected.");
        return null;
      }
      else{
        playerName = game.data.playerNames.pop()
        playerVerification = playerName;
        player = new Player(playerName, false);
        game.data.players.push(player);
      }
    }

    selectedCardsRef.on("value", checkSelectedCards);
    player.cards = deck.dealPlayerCards(5);
    player.makePlayerArea();
    $(".cardtext").on("click",handleCardClick);
    $(".confirm-button").on("click",handleConfirmButtonClick);
    game.data.gameCard = deck.dealGameCard();
    $(".card-black").text(game.data.gameCard.text);

    backend.saveState(game.data);
  });
}

function handleCardClick(event){
  if(verifyPlayer().turn){

  }
  else{
    var whiteCardText = $(this).text();
    if(verifyPlayer().ableToClick){
      $(".confirm-button").show();
      $(".card-white").text(whiteCardText);
    }
  }
}

function handleConfirmButtonClick(){
  var whiteCardText = $(".card-white").text();
  for(var player of game.data.players){
    for(var card of player.cards){
      if(card.text === whiteCardText){
        card.owner = playerVerification;
        player.ableToClick = false;
        $(".confirm-button").hide();
        if(game.data.selectedCards === undefined){
          game.data.selectedCards = [card];
          backend.saveState(game.data);
        }
        else{
          game.data.selectedCards.push(card);
          backend.saveState(game.data);
        }
        //deck.dealPlayerCards(1);
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
  for(var player of game.data.players){
    if(player.name === playerVerification){
      return player;
    }
  }
}

function checkSelectedCards(snapShot){
  var value = snapShot.val();
  if(value === null){
    return;
  }
  if(value.length === game.data.players.length-1){
    if(verifyPlayer().turn){
      $(".status").text("pick a winning card");
    }
  }
}
//getAllData grabs the data at any point needed at the beginning
