class Card {
    constructor( text ) {
        this.owner = null;
        this.text = text;
    }
    render() {
      var card = $('<div>');
      var cardSmallContainer = card.addClass('cardSmall-container col-xs-2');
      var cardSmallDiv = card.addClass('card-large border-black top-offset cardtext');
      cardSmallDiv.text(this.text);
      return cardSmallContainer.append(cardSmallDiv);
    }
}
