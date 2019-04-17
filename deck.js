class Deck {
    constructor( typeOfDeck, cardSet ){
        this.playerDeck = [];
        this.gameDeck = [];

        if (arguments[0] === 'player') {
            for (var cardIndex = 0; cardIndex < cardSet.length; cardIndex++) {
                this.playerDeck.push(cardSet[cardIndex]);
            }
        } else {
            for (cardIndex = 0; cardIndex < cardSet.length; cardIndex++){
                this.gameDeck.push(cardSet[cardIndex]);
            }
        }
    }
    makePlayerCard( text ){
        var playerCard = new Card( text );
        this.playerDeck.push( playerCard )
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
           console.log('the array is now: ', this.playerDeck);
        }
    }
    dealPlayerCards( amount ){
        this.playerDeck.splice(this.playerDeck.length - 1 + amount)
    }
    dealGameCard() {
        this.gameDeck.pop();
    }
}