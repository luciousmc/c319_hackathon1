class Deck {
    constructor(){
        this.playerDeck = this.getWhiteCards(cardText);
        this.gameDeck = this.getBlackCards(cardText);
    }
    makePlayerCard( text ){
        var playerCard = new Card( text );
        this.playerDeck.push( playerCard );
    }
    makeGameCard( text ){
        var gameCard = new Card( text );
        this.gameDeck.push( gameCard );
    }
    shuffleGameDeck() {
        for (var card = this.gameDeck.length - 1; card > 0; card--) {
            var randomIndex = Math.floor(Math.random() * card);
            var temp = this.gameDeck[randomIndex];
            this.gameDeck[randomIndex] = this.gameDeck[card];
            this.gameDeck[card] = temp;
        }
    }
    shufflePlayerDeck(){
        for (var card = this.playerDeck.length - 1; card > 0; card--) {
           var randomIndex = Math.floor(Math.random() * card);
           var temp = this.playerDeck[randomIndex];
           this.playerDeck[randomIndex] = this.playerDeck[card];
           this.playerDeck[card] = temp;
        }
        console.log('the array is now: ', this.playerDeck);
    }
    dealPlayerCards( amount ){
        return this.playerDeck.splice(this.playerDeck.length - amount);
    }
    dealGameCard() {
        return this.gameDeck.pop();
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
      console.log(blackCardsRefined);
      return blackCardsRefined;
    }
    //takes the json from cardtext.js as a parameter and returns an array of white cards
    getWhiteCards(json){
      return json.whiteCards;
    }
}
