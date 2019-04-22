class Game {
  constructor(playerDeck, gameDeck, backend) {
    this.data = {
      playerDeck : playerDeck,
      gameDeck : gameDeck,
      gameCard : gameDeck.pop(),
      players : [],
      playerNames : ['player3','player2','player1'],//,'player4','player3','player2','player1'];//,'player14','player13','player12','player11','player10','player9','player8','player7','player6','player5','player4','player3','player2','player1']
      selecting : true,
      winningCardSelected : false,
      ready : 0
    };
    backend.db.database().ref('Cards Against Humanity_anthony/players').on("value", this.handlePlayerChange.bind(this));
    backend.db.database().ref('Cards Against Humanity_anthony/selectedCards').on("value", this.handleSelectedCardsChange.bind(this));
    backend.db.database().ref('Cards Against Humanity_anthony/winningCard').on("value", this.handleWinningCardChange.bind(this));
    backend.db.database().ref('Cards Against Humanity_anthony/winningCardSelected').on("value", this.handleWinningCardSelectedChange.bind(this));
  }
  handlePlayerChange(snapShot){
    this.data.players = snapShot.val();
  }
  handleSelectedCardsChange(snapShot){
    this.data.selectedCards = snapShot.val();
  }
  handleWinningCardChange(snapShot){
    this.data.winningCard = snapShot.val();
  }
  handleWinningCardSelectedChange(snapShot){
    this.data.winningCardSelected = snapShot.val();
  }
}
