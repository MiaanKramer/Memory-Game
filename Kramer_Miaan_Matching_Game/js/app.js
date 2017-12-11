/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976


// a list containing all of the card classes
const orderedCards = ['diamond', 'diamond', 'cube' , 'cube' ,'paper-plane-o' , 'paper-plane-o' , 'anchor' , 'anchor' , 'bolt' , 'bolt' , 'leaf' , 'leaf' , 'bomb' , 'bomb' , 'bicycle' , 'bicycle'];

let deckParent = document.getElementById('deckParent');
let movesHolder = document.getElementById('move');
let resetBtn = document.getElementById('restart');
let playAgainBtn = document.getElementById('restart-Game');
let scoreBoard = document.getElementById('final');
let endMoves = document.getElementById('end-moves');
let gameArea = document.getElementById('game');

let lastCard , currentCard = null;

var moves = 0;
var rating = 3;
var correct = 0;

let rating1 = document.getElementById('starThree');
let rating2 = document.getElementById('starTwo');
let rating3 = document.getElementById('starOne');

let startTime = null;

let timeHolder = document.getElementById('timer');

function shuffle(array) {

    // shuffle function given at the start of the project as a helper function
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
playAgainBtn.addEventListener('click' , function() {
    // adds the reset function as an event listener to the play again button displayed at the end of the game
    reset();
    scoreBoard.classList.add('hide');
})

function reset() {

    // a reset function which resets the board and reshuffles the cards
    moves = 0;
    correct = 0;
    moveIncrement(0);
    deckParent.innerHTML = "";
    generateCards();
    rating = 3;
    game.classList.remove('hide');
    startTime = Date.now();
    setInterval(function() {
        let time = new Date(Date.now()-startTime);
        timeHolder.innerHTML = ' ' + time.getSeconds();
    }, 1000);
    currentCard , lastCard = null;
}
resetBtn.addEventListener('click', function () {
    reset();
})
function moveIncrement(i) {
    moves += i;
    /* Loop that increments moves and sets it appropraitely */

    /* 2 If statements to check what the appropriate star rating should be and setting the star hollow if moves passes a certain number*/
    if(moves > 21) {
        rating3.className = 'fa fa-star-o';
        rating = 2;
    } else {
        rating3.className = 'fa fa-star';
    }
    if(moves > 25) {
        rating2.className = 'fa fa-star-o';
        rating = 1;
    } else {
        rating2.className = 'fa fa-star';
    }
    movesHolder.innerHTML = moves;
}
function generateCards() {
    /* Simple loop that creates the card elements and assigns them their classes */
    let shuffledCards = shuffle(orderedCards);
    for (card of shuffledCards) {

        // creates an element of type LI and adds the card class to it

        let cardBlock = document.createElement('LI');
        cardBlock.classList.add('card');
        cardBlock.dataset.cardType = card;

        // adds an event listener to the class

        cardBlock.addEventListener('click' , function ($event) {    
            currentCard = $event.target;
            test(currentCard);        
        })

        // creates an element of typ I and adds the randomised class from the shuffledCards array

        let cardItem = document.createElement('I');
        cardItem.className += 'fa fa-' + card;

        // appends I to LI and LI to the deckParent element

        cardBlock.appendChild(cardItem);
        deckParent.appendChild(cardBlock);

    }
}
function test(clickedCard) {
    Array.from(deckParent.children).forEach(function(card) {
        card.classList.remove('missmatch');
        // removes the class missmatch from all children of the deckParent element
    })
    if(clickedCard.classList.contains('done') || clickedCard.classList.contains('clicked')){
        return;
        // checks if the card has already been clicked
    }
    if(lastCard != null) {
        clickedCard.classList.add('open');
        if(lastCard.dataset.cardType === clickedCard.dataset.cardType){
            // match
            clickedCard.classList.add('done');
            lastCard.classList.add('done');
            clickedCard.classList.add('match');
            lastCard.classList.add('match');
            correct ++;

            // locks cards in open state
            if(correct == 8) {
                finalScore();
            }
        }else{
            // not a match
            clickedCard.classList.add('missmatch');
            lastCard.classList.add('missmatch');

            // removes open class and hides card again 

            clickedCard.classList.remove('open');
            lastCard.classList.remove('open');
        }
        lastCard = null;
        moveIncrement(1);
        // increments moves by one
    } else {
        clickedCard.classList.add('open');
        moveIncrement(1);
        lastCard = clickedCard;
    }
}
reset();
function finalScore() {
    // Hides main game area to display score
    gameArea.classList.add('hide');
    // Displays as soon as the player matches all the cards
    scoreBoard.classList.remove('hide');
    correct = 0;
    let rainbowCon = document.getElementById('rainbow').innerHTML;
    // Sets values to display in final score
    document.getElementById('end-stars').innerHTML = " " + rating;
    document.getElementById('end-moves').innerHTML = " " + moves;
    document.getElementById('end-time').innerHTML = timeHolder.innerHTML + " ";
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
