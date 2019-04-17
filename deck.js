class Deck {
    constructor(){
        this.playerDeck = [];
        this.gameDeck = [];
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
        for (var card = this.gameDeck.length -1; card > 0; card--) {
            var lastItem = this.gameDeck[card];
            var temp = lastItem;
            var randomIndex = Math.floor(Math.random() * card);
            var randomCard = this.gameDeck[randomIndex];
            lastItem = randomCard;
            randomCard = temp;
        }
    }
    shufflePlayerDeck(){
        for (var card = this.playerDeck.length - 1; card > 0; card--) {
            var lastItem = this.playerDeck[card];
            var temp = lastItem;
            var randomIndex = Math.floor(Math.random() * card);
            var randomCard = this.playerDeck[randomIndex];
            lastItem = randomCard;
            randomCard = temp;
        }
    }
}