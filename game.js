class Game {
  constructor(playerDeck, gameDeck, backend) {
    this.data = {
      playerDeck : playerDeck,
      gameDeck : gameDeck,
      gameCard : gameDeck.pop(),
      players : [],
      playerNames : ['player2','player1']//,'player4','player3','player2','player1'];//,'player14','player13','player12','player11','player10','player9','player8','player7','player6','player5','player4','player3','player2','player1']
    };
    backend.db.database().ref('Cards Against Humanity/players').on("value", this.handlePlayerChange.bind(this));
  }
  handlePlayerChange(snapShot){
    this.data.players = snapShot.val();
  }
}
