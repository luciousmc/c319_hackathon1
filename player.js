class Player {
  constructor(name, turn){
    this.name = name;
    this.cards = [];
    this.score = 0;
    this.turn = turn;
    this.ableToClick = true;
  }
makePlayerArea(){
  for(var card of this.cards){
    var cardClone = Object.assign({}, card);
    cardClone.render = Card.prototype.render;
    var cardMade = cardClone.render();
    $('.cardArea-container').append(cardMade);
  }
}
  makeSelectedCards(game){
    if(game.data.selectedCards){
      var card = Object.assign({}, game.data.selectedCards[game.data.selectedCards.length-1]);
      card.render = Card.prototype.render;
      var cardMade = card.render();
      $('.cardArea-container').append(cardMade);
    }
  }
}
