class Game {
  constructor() {
    this.gameDeck = null;
    this.playerDeck = null;

    this.players = [
      new Player("player1", true),
      new Player("player2", false),
      new Player("player3", false)
    ];
  }
  makeGameDeck(){

  }
  makePlayerDeck(){
    this.playerDeck = new Deck();
  }

}