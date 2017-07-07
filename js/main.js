$(function() {

var bankroll = 1000; 

var currentBet = [];
var totalBet = 0;

var playersHand = [];
var playersTotal = 0;

var dealersHand = [];
var dealersTotal = 0;

var hiddenCard;
var showDealersHand = false

var win;
var loss;
var push;
var blackjack;


initialize();

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
    $("#player-card1").addClass(playersHand[0].id);
        $("#player-card1").removeClass('back-blue');

    dealersHand.push(randomCard());
    $("#dealer-card1").addClass(dealersHand[0].id);
        $("#dealer-card1").removeClass('back-red');

    playersHand.push(randomCard());
    $("#player-card2").addClass(playersHand[1].id);
        $("#player-card2").removeClass('back-blue');

    $('#deal').attr('disabled', true);

    dealersHand.push(randomCard());
    hiddenCard = dealersHand[1].id;

    addHand("player");
    addHand("dealer");

    checkBjWinner();
    handleBet();
    
    $('#hit').attr('disabled', false);
    $('#stand').attr('disabled', false);
    $('#playersTotal').html(`Players Hand: ` + playersTotal);

    render();
});

$('#hit').on('click', function() {
    playersHand.push(randomCard());
    addHand("player");
   
    if(playersTotal > 21) {
        $('#hit').attr('disabled', true);
        $('#stand').attr('disabled', true);
        $("#dealer-card2").addClass(hiddenCard);
        $("#dealer-card2").removeClass('back-red');
        loss = true;
        // $('#dealersTotal').html(`Dealer\'s Hand: ${dealersTotal}`);
    }
    handleBet();
    render();

});

$('#stand').on('click', function() {
    $('#hit').attr('disabled', true);
    $('#dealer-card2').addClass(hiddenCard);
    $('#dealer-card2').removeClass('back-red');
    showDealersHand = true;

    $('#stand').attr('disabled', true);
    
    winLogic();
    handleBet();
    render();
     
});

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
            dealersTotal += value;
        } 
    }else if (whichPlayer === "player") {
        playersTotal = 0;
        for (var i = 0; i < playersHand.length; i++) {
            var value = playersHand[i].value;
            playersTotal += value;
        }
    }

    return playersTotal;
}


function checkBjWinner() {
    if (playersTotal === 21 && dealersTotal === 21) {
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
        push = true;
    } else if(playersTotal === 21) {
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
        $('#playersTotal').html("BLACKJACK").css({color: "red", fontWeight: "bold", fontSize: "20px"});
        blackjack = true;
    } else if (dealersTotal === 21) {
        $("#dealer-card2").addClass(dealersHand[1].id);
        $("#dealer-card2").removeClass('back-red');
        $('#dealersTotal').html("Dealer has Blackjack");
        loss = true;
    } else if (playersTotal < 21) {
        $('#hit').attr('disabled', false);
        $('#stand').attr('disabled', false);
    } 
}

function winLogic() {
    if(dealersTotal < 17) {
        dealersHand.push(randomCard());
        for (var i = 0; i < dealersHand.length; i++) {
            var newCard = 
            (`<div class="dealersCards card ${dealersHand[i].id}"></div>`); 
        }
        $('#dealersHand').append(newCard);
        addHand("dealer");
        winLogic();
        console.log(dealersHand);
    } else if(dealersTotal > 21) {
        $('#dealersTotal').html("Dealer Busts").css({fontWeight: "bold"});
        win = true;
    } else if(playersTotal > dealersTotal) {
        $('#playersTotal').html("YOU WIN").css({fontWeight: "bold"});
        win = true;
    } else if (playersTotal === dealersTotal){
        $('#playersTotal').html("PUSH").css({fontWeight: "bold"});
        $('#dealersTotal').html("PUSH").css({fontWeight: "bold"});
        push = true;
    } else if(dealersTotal > playersTotal) {
        $('#dealersTotal').html("Dealer Wins").css({color: "red", fontWeight: "bold", fontSize: "20px"});
        loss = true;
    }
    render()
}

function handleBet() {
    var totalWinLoss = 0;
     if(blackjack) {
         var blackjackWin = totalBet * 3;
         totalWinLoss = blackjackWin +  bankroll;
         bankroll = totalWinLoss;   
         totalBet = 0;
         console.log("blackjack win");

    } else if(win) {
        var handWin = totalBet * 2;
         totalWinLoss = handWin + bankroll;
         bankroll = totalWinLoss;
         totalBet = 0;
         console.log("regular win");

    } else if(loss) {
        totalBet = 0;
        console.log("loss");

    } else if(push) {
        totalWinLoss = bankroll + totalBet
        bankroll = totalWinLoss;
        totalBet = 0;
        console.log("push");  
    }
    
}


function render() {

    $('#playersTotal').html(`Player\'s Hand: ${playersTotal}`);
   
    $('#bankroll').html('Bankroll: $' + bankroll);
    $('#currentBet').html(`Current Bet: $${totalBet}`);

    for (var i = 0; i < playersHand.length; i++) {
        $('div#' + i).addClass(playersHand[i].id + ' playerCards card');
        $('div#' + i).removeClass('back-blue');
    }

    if (showDealersHand) {
        $('#dealersTotal').html(`Dealer\'s Hand: ${dealersTotal}`);        
    } else {
        $('#dealersTotal').html(`Dealer\'s Hand`);
    }
 
}

function initialize() {

    $('#hit').attr('disabled','disabled');
    $('#stand').attr('disabled','disabled');
    $('#deal').attr('disabled','disabled');
 
}



$('h1').css({color: "red", fontWeight: "bold", fontFamily: "Syncopate", fontSize: "75px", textAlign: "center", paddingBottom: "0"});

$('p').css({color: "white", fontFamily: "Syncopate", fontWeight: "bold", fontSize: "15px", margin: '0 auto'});



});
