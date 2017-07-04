$(function() {

var cardId;
var cardValue;

var playersHand = [];
var playersTotal;

var dealersHand = [];
var dealersTotal;

$('#deal').addClass('btn-primary');
$('#hit').addClass('btn-success');

$('#hit').attr('disabled','disabled');
    $('#stand').attr('disabled','disabled');

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
    addHand();
    checkBjWinner();
});

$('#hit').on('click', function() {
    randomCard();
    playersHand.push(cardValue);
    addHand();
    if(playersTotal > 21) {
        console.log("BUST");
    }
});

$('#stand').on('click', function() {
    $('#hit').attr('disabled', true);
    if(dealersTotal < 17) {
        randomCard();
        dealersHand.push(cardValue);
        addHand();
        console.log(cardId);
        $('#stand').trigger('click');
    } else if(dealersTotal > 21) {
        console.log("DEALER BUSTS");
    } else if(playersTotal > dealersTotal) {
        console.log("YOU WIN");
    } else if (playersTotal === dealersTotal){
        console.log("PUSH");
    } else if(dealersTotal > playersTotal) {
        console.log("DEALER WINS");
    }
});

function randomCard() {
    var cardIdx = Math.floor((Math.random() * deck.length));
    cardId = deck[cardIdx].id;
    cardValue = deck[cardIdx].value;
}

function addHand() {
    var playerSum = playersHand.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
    playersTotal = playerSum;
        console.log("players total: " + playersTotal);
    var dealerSum = dealersHand.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
    dealersTotal = dealerSum;
        console.log("dealers total: " + dealersTotal);
}

function checkBjWinner() {
    if (playersTotal === 21 && dealersTotal === 21) {
        console.log("Push");
        $("#dealer-card2").addClass(cardId);
        $("#dealer-card2").removeClass('back-red');
    } else if(playersTotal === 21) {
        console.log("BLACKJACK!");
    } else if (dealersTotal === 21) {
        console.log("Dealer has Blackjack");
        $("#dealer-card2").addClass(cardId);
        $("#dealer-card2").removeClass('back-red');
    } else if (playersTotal < 21) {
        $('#hit').attr('disabled', false);
        $('#stand').attr('disabled', false);
    } 
}
});
