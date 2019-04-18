class Game {
  constructor() {
    this.gameDeck = this.getBlackCards(cardText);
    this.playerDeck = this.getWhiteCards(cardText);

    this.deck = new Deck(this.playerDeck, this.gameDeck);
    this.gameCard = null;

    this.players = [
      new Player("player1", true),
      new Player("player2", false),
      new Player("player3", false)
    ];
  }

  //takes the json from cardtext.js as a parameter and returns an array of black cards
  getBlackCards(json){
    var blackCardsRaw = json.blackCards;
    var blackCardsRefined = [];
    for(var card of blackCardsRaw){
      if(card.pick == 1){
        blackCardsRefined.push(card.text);
      }
    }
    return blackCardsRefined;
  }
  //takes the json from cardtext.js as a parameter and returns an array of white cards
  getWhiteCards(json){
    return json.whiteCards;
  }
}
