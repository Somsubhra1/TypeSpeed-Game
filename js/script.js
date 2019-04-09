// Global vars
let score = 0;
let isPlaying;

// API stuff
const API = {
    key: "91c7cc67169395721f00c09edd909b2d76244ef3e41bebe8b",
    limit: 125,
};

const URL = `https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=${API.limit}&api_key=${API.key}`;


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
var words = [
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

// fetch words from API
fetchWords();

// Event listeners
window.addEventListener('load', init);
wordInput.addEventListener('input', startMatch);
levelSelector.addEventListener('change', chooseLevel);

// Initialize game
function init() {
    // show number of seconds in UI
    seconds.textContent = currentLevel;
        
    // seconds count down
    counter = setInterval(countDown, 1000);

    // check game status
    status = setInterval(checkStatus, 50);
}

// Choose level
function chooseLevel() {
    // clearing countDowns
    clearInterval(counter);
    clearInterval(status);

    // selecting level
    currentLevel = levels[levelSelector.value];
    time = currentLevel;

    // initialising again
    init();    
}

// fetch words from API:
function fetchWords() {
    axios.get(URL)
        .then(function (res) {
            res.data.forEach(element => {
                if (!element.word.includes('-') && !element.word.includes(' ')) {
                    words.push(element.word.toLowerCase());                    
                }
            });            
            // load words
            showWord(words);
        })
        .catch(err => {
            console.log('error');
        });
    
}

// show random word
function showWord(words) {      
    // generating random index
    let randIndex = Math.floor(Math.random() * words.length);  
    
    // showing random word
    currentWord.innerHTML = words[randIndex];

    // removing already used word
    words.splice(randIndex, 1);    
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