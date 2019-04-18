class Player {
  constructor(name, turn){
    this.name = name;
    this.cards = [];
    this.score = 0;
    this.turn = turn;

  }
makePlayerArea(){
  for(var card of this.cards){
    var cardMade = card.render();
    $('.cardArea-container').append(cardMade);
  }
}
}
