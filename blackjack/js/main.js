$(function() {



var bankroll = 1000; //balance when game starts for the first time
var currentBankroll; //utilize local storage to maintain 

var currentBet = [];
var totalBet;

var cardValue;

var playersHand = [];
var playersTotal = 0;

var dealersHand = [];
var dealersTotal;

var hiddenCard;




$('h1').css({color: "red", fontWeight: "bold", fontFamily: "Syncopate", fontSize: "75px", textAlign: "center"});

$('p').css({fontFamily: "Syncopate", fontWeight: "bold", fontSize: "15px", margin: '0 auto'});

render();

$('#bet5').on('click', function() {
    currentBet.push(5);
    addBet();
     $('#deal').attr('disabled', false);
});

$('#bet10').on('click', function() {
    currentBet.push(10);
    addBet(); 
         $('#deal').attr('disabled', false);
});

$('#bet25').on('click', function() {
    currentBet.push(25);
    addBet();
         $('#deal').attr('disabled', false);
});

$('#deal').on('click', function() {
    subBankroll();
    $('#bankroll').html(`Bankroll: $` + currentBankroll);
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
    // console.log(playersHand);
    $("#player-card2").addClass(playersHand[1].id);
        $("#player-card2").removeClass('back-blue');
    $('#deal').attr('disabled', true);

    dealersHand.push(randomCard());
    console.log("dealers first card " + dealersHand[1].value);
    hiddenCard = dealersHand[1].id;
    console.log(hiddenCard);

    addHand();

    checkBjWinner();
    $('#hit').attr('disabled', false);
    $('#stand').attr('disabled', false);
    $('#playersTotal').html(`Players Hand: ` + playersTotal);
    $('#currentBet').html(`Current Bet: $` + totalBet);
});



$('#hit').on('click', function() {
    playersHand.push(randomCard());
    addHand();
    for (var i = 2; i < playersHand.length; i++) {
        var newCard = 
        (`<div class="playerCards card ${playersHand[i].id}"></div>`); 
    }
     $('#playersHand').append(newCard);
    if(playersTotal > 21) {
        console.log("BUST");
        $("#dealer-card2").addClass(hiddenCard);
        $("#dealer-card2").removeClass('back-red');
    }

});



$('#stand').on('click', function() {
    $('#hit').attr('disabled', true);
    $("#dealer-card2").addClass(hiddenCard);
        $("#dealer-card2").removeClass('back-red');
    // playOutDealerHand();
    if(dealersTotal < 17) {
        randomCard();
        dealersHand.push(randomCard());
        addHand();
        // console.log();
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
        // console.log("total bet: " + betSum); 
}

function subBankroll() {
    return currentBankroll = bankroll - totalBet;
}

function randomCard() {
    var deckIdx = Math.floor((Math.random() * deck.length));
    // console.log(deck[deckIdx]);
    return deck[deckIdx];
}

function addHand() {
    console.log('JON', playersHand);
    for (var i = 0; i < playersHand.length; i++) {
        var value = playersHand[i].value;
        console.log(value)
        playersTotal += value;
        console.log("players total: " + playersTotal);
    }

return playersTotal;
        
        // console.log("dealers total: " + dealersTotal);

}

function checkBjWinner() {
    if (playersTotal === 21 && dealersTotal === 21) {
        console.log("Push");
        $("#dealer-card2").addClass();
        $("#dealer-card2").removeClass('back-red');
    } else if(playersTotal === 21) {
        console.log("BLACKJACK!");
    } else if (dealersTotal === 21) {
        console.log("Dealer has Blackjack");
        $("#dealer-card2").addClass();
        $("#dealer-card2").removeClass('back-red');
    } else if (playersTotal < 21) {
        $('#hit').attr('disabled', false);
        $('#stand').attr('disabled', false);
    } 
}


function render() {
    $('#hit').attr('disabled','disabled');
    $('#stand').attr('disabled','disabled');
    $('#deal').attr('disabled','disabled');
    
}





});
