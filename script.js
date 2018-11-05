const card_deck = [
    "fa-tablets",
    "fa-user-md",
    "fa-ambulance",
    "fa-capsules",
    "fa-brain",
    "fa-ambulance",
    "fa-notes-medical",
    "fa-prescription-bottle",
    "fa-tablets",
    "fa-stethoscope",
    "fa-notes-medical",
    "fa-stethoscope",
    "fa-capsules",
    "fa-prescription-bottle",
    "fa-user-md",
    "fa-brain"];  

const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const playAgain = document.querySelector(".playAgain");
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modalText");

let timer = document.querySelector(".timer");

let interval;
let second = 0;
let minute = 0;
let timeStart = false;

let cards_open = [];
let matches = 0;
let numberOfMoves = moves.textContent;
let numberOfStars = 3;

function startNewGame() {
	resetTimer();
	timer.style.display = "none";
	timeStart = false;
	timer.textContent = minute + " minutes " + second + " seconds";
	shuffle(card_deck);
	cards_open = [];
	matches = 0;
	moves.textContent = 0;
	numberOfMoves = moves.textContent;

	
	for (let i = 0; i < card_deck.length; i++) {
		let deck_element = deck.getElementsByTagName("li");
		let class_element = deck_element[i].getAttribute("class");
		deck_element[i].className = "";
		deck_element[i].classList.add("card");

		let icon_element = deck.getElementsByTagName("i");
		let icon_class = icon_element[i].getAttribute("class");
		icon_element[i].className = "";
		icon_element[i].classList.add("fa", card_deck[i]);
	}

	stars.innerHTML = '<li><i class="fa fa-heartbeat"></i></li> <li><i class="fa fa-heartbeat"></i></li> <li><i class="fa fa-heartbeat"></i></li>';
	numberOfStars = 3;
}


function flipCard(card) {
	card.classList.add("open", "show");
}

function youHaveAMatch() {
	cards_open[0].classList.remove("open", "show");
	cards_open[0].classList.add("match");
	cards_open[1].classList.remove("open", "show");
	cards_open[1].classList.add("match");
	cards_open = [];
	matches++;
}

function noMatch() {
	setTimeout(function() {
		cards_open[0].classList.remove("open", "show");
		cards_open[1].classList.remove("open", "show");
		cards_open = [];
	}, 1000)
}

function addMove(card) {
	if (!card.classList.contains("match")) {
		numberOfMoves++;
		moves.innerText = numberOfMoves;
	}
}

function gameOver() {
	if (matches === 8) {
		modal.style.display = "block";
		modalText.textContent = "You finished the game in " + minute + " minutes and " + second + " seconds!\nGame completed in " + numberOfMoves + " moves and with " + numberOfStars + " heartbeats!";
		startNewGame();
	}
}


function resetTimer() {
	clearInterval(interval);
	second = 0;
	minute = 0;
}

function startTimer() {
	interval = setInterval(function() {
		timer.textContent = minute + " minutes " + second + " seconds ";
		second++;
		if (second === 60) {
			minute++;
			second = 0;
		}
	}, 1000)
}


restart.addEventListener("click", startNewGame);

playAgain.addEventListener("click", function() {
	modal.style.display = "none";
	timer.style.display = "none";
	startNewGame();
})

deck.addEventListener("click", function(event) {
	
	let card = event.target;
	
	if (!timeStart) {
		startTimer();
		timeStart = true;
		timer.style.display = "inline-block";
	}


	if (!card.classList.contains("open")) {

		if (cards_open.length < 2) {
				flipCard(card);
				cards_open.push(card);
		}

		if (cards_open.length === 2) {

			addMove(card);
			
			if (cards_open[0].innerHTML === cards_open[1].innerHTML) {
				youHaveAMatch();
			} else {
				noMatch();
			}

			if (numberOfMoves === 15) {
				stars.innerHTML = '<li><i class="fa fa-heartbeat"></i></li> <li><i class="fa fa-heartbeat"></i></li>';
				numberOfStars--;
			
			} else if (numberOfMoves === 21) {
				stars.innerHTML = '<li><i class="fa fa-heartbeat"></i></li>';
				numberOfStars--;
			}
		}
		gameOver();
	}
})

function shuffle(array) {
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

startNewGame();
