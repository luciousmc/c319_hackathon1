class Game {
  constructor() {
    this.cardData = {
      gameDeck: cardText.blackCards,
      playerDeck: cardText.whiteCards,
    };

    this.playerDeck = null;
    this.gameDeck = null;

    this.players = [
      new Player("player1", true),
      new Player("player2", false),
      new Player("player3", false)
    ];
  }
  makeGameDeck(){
    this.gameDeck = new Deck('game', this.cardData.gameDeck);
  }
  makePlayerDeck(){
    this.playerDeck = new Deck( 'player', this.cardData.playerDeck) ;
  }

}