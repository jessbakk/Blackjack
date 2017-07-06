$(function() {

var bankroll = 1000; 

var currentBet = [];
var totalBet = 0;

var cardValue;

var playersHand = [];
var playersTotal = 0;

var dealersHand = [];
var dealersTotal = 0;

var hiddenCard;


initialize();

$('h1').css({color: "red", fontWeight: "bold", fontFamily: "Syncopate", fontSize: "75px", textAlign: "center", paddingBottom: "0"});

$('p').css({color: "white", fontFamily: "Syncopate", fontWeight: "bold", fontSize: "15px", margin: '0 auto'});

render();

$('#bet5').on('click', function() {
    currentBet.push(5);
    addBet(5);
    render();
     $('#deal').attr('disabled', false);
});

$('#bet10').on('click', function() {
    currentBet.push(10);
    addBet(10); 
    render();
    $('#deal').attr('disabled', false);
});

$('#bet25').on('click', function() {
    currentBet.push(25);
    addBet(25);
    render();
    $('#deal').attr('disabled', false);
});

$('#deal').on('click', function() {
    $('#bankroll').html(`Bankroll: $` + bankroll);
    $('.bet').attr('disabled', true);

    playersHand.push(randomCard());
    console.log("players first card " + playersHand[0].value);
    $("#player-card1").addClass(playersHand[0].id);
        $("#player-card1").removeClass('back-blue');

    dealersHand.push(randomCard());
    console.log("dealers first card " + dealersHand[0].value);
    $("#dealer-card1").addClass(dealersHand[0].id);
        $("#dealer-card1").removeClass('back-red');

    playersHand.push(randomCard());
    console.log("players second card " + playersHand[1].value);
    $("#player-card2").addClass(playersHand[1].id);
        $("#player-card2").removeClass('back-blue');

    $('#deal').attr('disabled', true);

    dealersHand.push(randomCard());
    console.log("dealers second card " + dealersHand[1].value);
    hiddenCard = dealersHand[1].id;
    console.log("dealers hidden card is " + hiddenCard);

    addHand("player");
    addHand("dealer");

    checkBjWinner();

    $('#hit').attr('disabled', false);
    $('#stand').attr('disabled', false);
    $('#playersTotal').html(`Players Hand: ` + playersTotal);
    render();
});



$('#hit').on('click', function() {
    playersHand.push(randomCard());
    addHand("player");
   
    if(playersTotal > 21) {
        console.log("BUST");
        $('#hit').attr('disabled', true);
        $('#stand').attr('disabled', true);
        $("#dealer-card2").addClass(hiddenCard);
        $("#dealer-card2").removeClass('back-red');
        $('#dealersTotal').html(`Dealer\'s Hand: ${dealersTotal}`);
    }
    render();

});



$('#stand').on('click', function() {
    $('#hit').attr('disabled', true);
    $("#dealer-card2").addClass(hiddenCard);
    $("#dealer-card2").removeClass('back-red');

    $('#dealersTotal').html(`Dealer\'s Hand: ${dealersTotal}`);

    if(dealersTotal < 17) {
        randomCard();
        dealersHand.push(randomCard());
        for (var i = 0; i < dealersHand.length; i++) {
            var newCard = 
            (`<div class="dealersCards card ${dealersHand[i].id}"></div>`); 
        }
        $('#dealersHand').append(newCard);
        addHand("dealer");
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

function initialize() {
    $('#hit').attr('disabled','disabled');
    $('#stand').attr('disabled','disabled');
    $('#deal').attr('disabled','disabled');
}

function addBet(amount) {
    var betSum = currentBet.reduce(function(sum, value) {
        return sum + value;
    }, 0); 
    totalBet = betSum;
    bankroll = bankroll - amount;
}

function randomCard() {
    var deckIdx = Math.floor((Math.random() * deck.length));
    return deck[deckIdx];
}


function addHand(whichPlayer) {
    if (whichPlayer === "dealer") {
        dealersTotal = 0;
        for (var i = 0; i < dealersHand.length; i++) {
            var value = dealersHand[i].value;
            console.log(value)
            dealersTotal += value;
            console.log("dealers total: " + dealersTotal);
        } 
    }else if (whichPlayer === "player") {
        playersTotal = 0;
        for (var i = 0; i < playersHand.length; i++) {
            var value = playersHand[i].value;
            console.log(value)
            playersTotal += value;
            console.log("players total: " + playersTotal);
        }
    }

    return playersTotal;
    }


function checkBjWinner() {
    if (playersTotal === 21 && dealersTotal === 21) {
        console.log("Push");
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
    } else if(playersTotal === 21) {
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
        console.log("BLACKJACK!");
    } else if (dealersTotal === 21) {
        console.log("Dealer has Blackjack");
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
        
    } else if (playersTotal < 21) {
        $('#hit').attr('disabled', false);
        $('#stand').attr('disabled', false);
    } 
}


function render() {
    $('#playersTotal').html(`Player\'s Hand: ${playersTotal}`);
    
    $('#bankroll').html('Bankroll: $' + bankroll);
    $('#currentBet').html(`Current Bet: $${totalBet}`)
    for (var i = 0; i < playersHand.length; i++) {
        $('div#' + i).addClass(playersHand[i].id + ' playerCards card');
        $('div#' + i).removeClass('back-blue');
    }
    
}





});
