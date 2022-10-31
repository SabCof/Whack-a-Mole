const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const countdownBoard = document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;

// Function ou va apparaitre Yoda
function pickRandomHole(hole){
    const randomHole = Math.floor(Math.random() * holes.length);
    const trou = holes[randomHole];
    if (trou === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return trou;
}

// Function popOut Yoda apparait et disparait
function popOut(){
    const time = Math.random() * 1300 + 400;
    const trou = pickRandomHole(holes);
    trou.classList.add('up');
    setTimeout(function(){
        trou.classList.remove('up');
        if (!timeUp) popOut();
    }, time);
}

// Function début du décompte
function startGame() {
    countdown = timeLimit/1000;
    scoreBoard.textContent = 0;
    scoreBoard.getElementsByClassName.display = 'block';
    countdownBoard.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    setTimeout(function(){
        timeUp = true;
    }, timeLimit);

    let starCountdown = setInterval(function(){
        countdown -= 1;
        countdownBoard.textContent = countdown;
        if (countdown < 0){
            countdown = 0;
            clearInterval(starCountdown);
            countdownBoard.textContent = 'Times UP !! Thank you for protecting our planet ! This is the way !';
        }
    }, 1000);
}

// Evenement au click début du jeux
startButton.addEventListener('click', startGame);

// Function qui change d'image quand on clik dessus 
function whack(e){
    score++;
    this.style.backgroundImage = 'url("/images/yoda2.png")';
    this.style.pointerEvents = 'none';
    setTimeout(() => {
        this.style.backgroundImage = 'url("/images/yoda1.png")';
        this.style.pointerEvents = 'all';
    }, 800);
    //Décompte des points
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));



