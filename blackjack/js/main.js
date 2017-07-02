$(function() {

var dealerCards = document.querySelectorAll('.dealerCards');

var playerCards = document.querySelector('.playerCards');

var cardId;
var cardValue;

var playersHand = [];
var dealersHand = [];

var disableHit = false;

$('#deal').addClass('btn-primary');
$('#hit').addClass('btn-success');

$('#deal').on('click', function() {
    randomCard();
    playersHand.push(cardValue);
    $("#player-card1").addClass(cardId);
        $("#player-card1").removeClass('back-blue');
    randomCard();
    dealersHand.push(cardValue);
    $("#dealer-card1").addClass(cardId);
        $("#dealer-card1").removeClass('back-red');
    randomCard();
    playersHand.push(cardValue);
    $("#player-card2").addClass(cardId);
        $("#player-card2").removeClass('back-blue');
    $('#deal').attr('disabled', true);
    randomCard();
    dealersHand.push(cardValue);
    checkWinner();
});

$('#hit').on('click', function() {
    randomCard();
    playersHand.push(cardValue);
    $('#hit').attr('disabled', disableHit);
    console.log(cardId);
    console.log(playersHand);
});


function randomCard() {
    var cardIdx = Math.floor((Math.random() * deck.length));
    cardId = deck[cardIdx].id;
    cardValue = deck[cardIdx].value;
}

function checkWinner() {
   var playersTotal = playersHand.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
        console.log(playersTotal);
    var dealersTotal = dealersHand.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
        console.log(dealersTotal);
    if(playersTotal === 21) {
        console.log("BLACKJACK!");
    } else if (dealersTotal === 21) {
        console.log("Dealer has Blackjack");
    } else if (playersTotal > 21) {
        console.log("Busted!");
    } else if (dealersTotal > 21) {
      console.log("Dealer Busts!");  
    } else if (dealersTotal > playersTotal) {
        console.log("Dealer wins");
    } else if (playersTotal > dealersTotal) {
        console.log("You win!");
    } else if (playersTotal === dealersTotal) {
        console.log("Push");
    }
}

});
