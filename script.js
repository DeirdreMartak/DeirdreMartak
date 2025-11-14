let currentnum = null;
let score = 0;
let attempts = 0;
let maxAttempts = 0;
let range = 0;
let running = false;

const difficultySelection = document.getElementById("difficulty");
const userInput = document.getElementById("user-input");

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("guess-button").addEventListener("click", checkGuess);
document.getElementById("next-button").addEventListener("click", loadNextNum);

function getDifficulty(){
    const difficulty = difficultySelection.value;

    if(difficulty === "easy"){
        return {range: 10, maxAttempts: 5};
    }
    else if(difficulty === "medium"){
        return {range: 50, maxAttempts: 10};
    }
    else{
        return {range: 100, maxAttempts: 20};
    }
}

function startGame(){

    // reset score, message, and hint
    score = 0;
    attempts = 0;
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("message").innerText = "";
    document.getElementById("hint").innerText = "";

    // displays game area
    document.getElementById("game").classList.remove("hidden");
    // calls fuction that pulls up a random number
    loadNextNum();
}

function loadNextNum(){
    // returns values for max number of attempts AND range of random number
    const setting = getDifficulty();


    // gets random number
    currentnum = Math.floor(Math.random() * setting.range) + 1;

    // sets attempts to 0 when new number is loaded
    attempts = 0;
    running = true;
    range = setting.range
    maxAttempts = setting.maxAttempts

    userInput.value = "";
    userInput.focus();

    document.getElementById("message").innerText = `Guess a number between 1 and ${range}`;
    document.getElementById("hint").innerText = "";
}

function checkGuess(){
    if(!running){
        document.getElementById("hint").innerText = "Click Next Number to play again";
    }

    const guess = parseInt(userInput.value, 10);

    if(isNaN(guess) || guess < 1 || guess > range){
        document.getElementById("message").innerText = `Error! Enter a number between 1 and ${range}`;
        return;
    }

    attempts++
    const attemptsLeft = maxAttempts - attempts;

    if (guess === currentnum){
        score ++;
        document.getElementById("score").innerText = `Score ${score}`;
        document.getElementById("message").innerText ="Correct! " +
        `It took ${attempts} times to find the answer.`;
        document.getElementById("hint").innerText = "click next number"
        running = false;
        return;
    }

    // incorrect 
    if (guess < currentnum){
        document.getElementById("hint").innerText = `Try a higher number, Attempts left: ${attemptsLeft}`;
    } else {
        document.getElementById("hint").innerText = `Try a lower number, Attempts left: ${attemptsLeft}`;
    }

    if(attemptsLeft <= 0){
        score = 0;
        document.getElementById("score").innerText = `Score: ${score}`;
        document.getElementById("message").innerText = `You lose! The correct answer was ${currentnum}`;
        document.getElementById("hint").innerText = "Click Next Number button  to play again";
        return;
    }

    userInput.focus();
}