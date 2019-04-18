class Deck {
    constructor( playerCards, gameCards ){
        this.playerDeck = playerCards;
        this.gameDeck = gameCards;
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
        this.gameDeck.pop();
    }
}
