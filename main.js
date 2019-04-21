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
    $(".ready-button").hide();
    $(".confirm-button").hide();
    var playerName = null;
    var player = null;
    if(data === null){
      game = new Game(deck.playerDeck, deck.gameDeck, backend);
      playerName = game.data.playerNames.pop()
      player = new Player(playerName, true);
      playerVerification = playerName;
      $(".status").text("Waiting for other players");
      if(game.data.players === null){
        game.data.players = [player];
      }
      else{
        game.data.players.push(player);
      }
    }
    else{
      game = new Game(deck.playerDeck, deck.gameDeck, backend);
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

    backend.db.database().ref('Cards Against Humanity/winningCard').on("value", handleWinningCardChange);
    selectedCardsRef.on("value", checkSelectedCards);
    player.cards = deck.dealPlayerCards(5);
    if(playerVerification === "player1"){
    }
    else{
      player.makePlayerArea();
    }
    $(".cardtext").on("click",handleCardClick);
    $(".confirm-button").on("click",handleConfirmButtonClick);
    $(".ready-button").on("click",handleReadyClick);
    if(playerVerification === "player1"){
      game.data.gameCard = deck.dealGameCard();
    }
    $(".card-black").html(game.data.gameCard.text);

    backend.saveState(game.data);
  });
}

function handleCardClick(event){
  var whiteCardText = $(this).text();
  if(verifyPlayer(playerVerification).ableToClick){
    $(".confirm-button").show();
    $(".card-white").html(whiteCardText);
  }
}

function handleConfirmButtonClick(){
  var whiteCardText = $(".card-white").text();
  if(verifyPlayer(playerVerification).turn){
    $(".confirm-button").hide();
    for(var card of game.data.selectedCards){
      if(card.text === whiteCardText){
        game.data.winningCard = Object.assign({}, card);
        console.log(game.data);
        backend.saveState(game.data);
      }
    }
  }
  else{
    for(var player of game.data.players){
      if(player.cards === undefined){
        continue;
      }
      for(var card of player.cards){
        if(card.text === whiteCardText){
          card.owner = playerVerification;
          player.ableToClick = false;
          $(".confirm-button").hide();
          if(game.data.selectedCards === undefined || game.data.selectedCards === null){
            game.data.selectedCards = [card];
            var index = player.cards.indexOf(card);
            player.cards.splice(index,1);
            backend.saveState(game.data);
          }
          else{
            game.data.selectedCards.push(card);
            player.cards.splice(index,1);
            backend.saveState(game.data);
          }
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
}

function verifyPlayer(playerToCheck){
  for(var player of game.data.players){
    if(player.name === playerToCheck){
      return player;
    }
  }
}

function grabJudge(){
  for(var player of game.data.players){
    if(player.turn){
      return player;
    }
  }
}

function checkSelectedCards(snapShot){
  var value = snapShot.val();
  var player = Object.assign({}, verifyPlayer(playerVerification));
  player.makeSelectedCards = Player.prototype.makeSelectedCards;
  if(player.name === "player1"){
    player.makeSelectedCards(game);
    backend.saveState(game.data);
  }
  if(value === null){
    return;
  }
  if(value.length === game.data.players.length-1){
    if(verifyPlayer(playerVerification).turn){
      $(".status").text("Pick a winning card");
      $(".cardtext").on("click", handleCardClick);
    }
  }
}

function handleWinningCardChange(snapShot){
  var winningCard = snapShot.val();
  if(winningCard === null){

  }
  else if(winningCard && game.data.winningCardSelected){
    $(".card-white").html(winningCard.text);
    $(".status").text(grabJudge().name + " chose "+ winningCard.owner + "'s card.");
    $(".ready-button").show();
  }
  else{
    $(".card-white").html(winningCard.text);
    $(".status").text(grabJudge().name + " chose "+ winningCard.owner + "'s card.");
    $(".ready-button").show();
    verifyPlayer(winningCard.owner).score++;
    game.data.winningCardSelected = true;
    backend.saveState(game.data);
  }
}

function handleReadyClick(){
  $(".ready-button").hide();
  game.data.ready++;
  backend.saveState(game.data);
  if(game.data.ready === game.data.players.length){

  }
}
