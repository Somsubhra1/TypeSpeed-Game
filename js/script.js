// Global vars
let score = 0;
let isPlaying;

// game levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2,
}

// setting level
let currentLevel = levels.easy;
let time = currentLevel;

var counter, status;

// DOM elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const timeDisplay = document.querySelector('#time');
const levelSelector = document.querySelector('#levelSelector');

// Words array
const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];

// Event listeners
window.addEventListener('load', init);
wordInput.addEventListener('input', startMatch);
levelSelector.addEventListener('change', chooseLevel);

// Initialize game
function init() {
    // show number of seconds in UI
    seconds.textContent = currentLevel;
    // load word from array
    showWord(words);
        
    // seconds count down
    counter = setInterval(countDown, 1000);

    // check game status
    status = setInterval(checkStatus, 50);
}

// Choose level
function chooseLevel() {
    clearInterval(counter);
    clearInterval(status);
    currentLevel = levels[levelSelector.value];
    time = currentLevel;
    init();    
}

// show random word
function showWord(words) {
    // generating random index
    const randIndex = Math.floor(Math.random() * words.length);
    
    // showing random word
    currentWord.textContent = words[randIndex];
    
}

function countDown() {
    // check if time is out or not
    if (time > 0) {
        time--;
    }
    else if (time == 0) {
        isPlaying = false;
    }
    timeDisplay.textContent = time;
}

// check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.textContent = 'Game over!!! :('
        score = -1;
    }
}

// Start matching word
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    scoreDisplay.textContent = (score == -1) ? '0' : score;
}

// to check if word matches or not
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        if (isPlaying) {
            message.innerHTML = "Correct!! :)";
        }        
        return true;
    }
    message.textContent = '';
    return false;
}