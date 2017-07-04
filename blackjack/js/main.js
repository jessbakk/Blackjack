$(function() {

var cardId;
var cardValue;

var bankroll = 1000;
var currentBankroll;

var currentBet = [];
var totalBet;

var playersHand = [];
var playersTotal;

var dealersHand = [];
var dealersTotal;

$('#hit').attr('disabled','disabled');
$('#stand').attr('disabled','disabled');
$('#deal').attr('disabled','disabled');


$('h1').css({color: "red", fontWeight: "bold", fontFamily: "Syncopate", fontSize: "75px", textAlign: "center"});

$('#bet5').on('click', function() {
    currentBet.push(5);
    addBet();
    $('#deal').attr('disabled',false);
});

$('#bet10').on('click', function() {
    currentBet.push(10);
    addBet();
    $('#deal').attr('disabled',false);
});

$('#bet25').on('click', function() {
    currentBet.push(25);
    addBet();
    $('#deal').attr('disabled',false);
});

$('#deal').on('click', function() {
    subBankroll();
    $('#bankroll').html(`Bankroll: $` + currentBankroll);
    $('#bet5').attr('disabled', true);
    $('#bet10').attr('disabled', true);
    $('#bet25').attr('disabled', true);
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
        $("#dealer-card2").addClass(cardId);
        $("#dealer-card2").removeClass('back-red');
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



function addBet() {
    var betSum = currentBet.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
    totalBet = betSum;
        console.log("total bet: " + betSum); 
}

function subBankroll() {
    return currentBankroll = bankroll - totalBet;
}

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
