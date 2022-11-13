//global variable for guesses
let guesses = []
let guess = [] 
let guessIndex = 0

//generate code one time for entire game
//function getCode will generate an array of 4 randomly from colors[]
//function displayCode will load the generated code (secret) into the circles in the solution div
const colors = ['orangered', 'rgb(40, 23, 169)', 'rgb(236, 217, 14)', 'rgb(30, 179, 57)', 'black', 'lightgoldenrodyellow']

let getCode = (colors) => {
const code = []
    for (let i = 0; i < 4; i++){
    code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code
}
let secret = getCode(colors)


let soln = (document.querySelector(".code"))

let displayCode = () => {
    for (let i = 0; i < secret.length; i++){
        soln.children[i].style.backgroundColor = secret[i]
    }
}

getCode(colors)
console.log(secret)
displayCode()


//every time user enters guess, guessCount++
//if guessCount == 10, game over

//generate feedback
//check guess against code: compare two arrays and generate feedback
//compare guess array to code array and if index and color are a match, generate * for every match
//compare guess array to code array and if guess array includes any of the colors from code array, generate + for every match
// use .sort() to equalize feedback array

function getFeedback(guess, secret) {
const feedback = []
// console.log(guess)
// console.log(secret)
for (let i = 0; i < 4; i++) {
    if (guess[i] == secret[i]){
    feedback.push('red')
    }
}
for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++ ){
        if (i !== j){
            if (guess[i] == secret[j]) {
                feedback.push('white')
            }
        } 
    }
}
// console.log(feedback)
feedback.sort()
return feedback
// console.log(feedback)
}
//now clues is a global variable that contains the feedback array
let clues = getFeedback(guess, secret)

// function checkWin(feedback){
//     let win = true
//     for (let i = 0; i < 4; i++){
//         if (feedback[i] !== 'red') {
//             win = false
//         } 
//     } if (guessIndex = 11){
//         win = false
//     }
//     return win
// }

//display feedback: red = right color, right place, white = right color

//repeat input/feedback until 10 wrong guesses (you lose) or one right guess(you win)
//checkWin called on each complete guess

//Reveal code
//calculate guess: 
//function to record each guess on a given guessIndex in an array of guesses
//then update the DOM and move to the next guessIndex after 4 guesses
//updateGuessDOM takes the guess entered and changes the circle (and it's border) to the corresponding color
let calculateGuess = () => {
    guesses[guessIndex] = guess
    updateGuessDOM()
    if (guess.length >= 4){
        guess = []
        guessIndex++
    } 
}
let updateGuessDOM = () => {
    for (let i = 0; i < guesses.length; i++){
        for (let j = 0; j < guess.length; j++){
            guessElements[i][j].style.backgroundColor = guesses[i][j]
            guessElements[i][j].style.border = guesses[i][j]
        }
    }
}

//listen for click on color buttons, turn next open circle corresponding color!
//Huge thanks to Kasper for guiding me through this--created a 2D array 
//click event: add the corresponding color to the array of guesses, call calculateGuess function.

const blackBtn = document.getElementById("button-black");
blackBtn.addEventListener('click', () => {
    guess.push("black")
    calculateGuess()
})
const blueBtn = document.getElementById("button-blue");
blueBtn.addEventListener('click', () => {
    guess.push("rgb(40, 23, 169)")
    calculateGuess()
})
const yellBtn = document.getElementById("button-yellow");
yellBtn.addEventListener('click', () => {
    guess.push("rgb(236, 217, 14)")
    calculateGuess()
})
const redBtn = document.getElementById("button-red");
redBtn.addEventListener('click', () => {
    guess.push("orangered")
    calculateGuess()
})
const greenBtn = document.getElementById("button-green");
greenBtn.addEventListener('click', () => {
    guess.push("rgb(30, 179, 57)")
    calculateGuess()
})
const whiteBtn = document.getElementById("button-white");
whiteBtn.addEventListener('click', () => {
    guess.push("lightgoldenrodyellow")
    calculateGuess()
})
//2D array for guess board
let circles = Array.from(document.querySelectorAll(".guess"))
let guessElements = circles.map(el => {
    return el.children
})
//2D array for feedback board
let reply = Array.from(document.querySelectorAll(".feedback"))
let feedbackElements = reply.map(el => {
    // console.log(el.children)
    return el.children
})
// console.log(feedbackElements)

//struggling with feedback display, let's psuedocode out the goals:
//when the guess[] is completed, ie, when the guess[3] is entered via click on color button, I need to compare that 4-element array to the 4-element array called code[] stored in the global variable secret.
//for every index that matches between code[] and guess[], one circle in the feedback row should display red
//for every color included in the guess[] that is also included in the code[], but is not in the same index, one circle in the feedback row should display white
//that will display the feedback for that guess
//if the feedback displays all red, the game is over with a "you win" modal that reveals the solution div
//if the feedback does not display all red on the 10th guess, game is over with a "you lose" modal that reveals the solution div


//other features to add
//restart button
//help button w/ modal

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {
    window.location.reload();
})

//open help modal
const helpBtn = document.getElementById("helpBtn");
helpBtn.addEventListener("click", (openHelp))
function openHelp(){
    helpModal.style.display = 'flex';
}

//close help modal
const closeBtn = document.getElementsByClassName("closeBtn")[0];
closeBtn.addEventListener("click", (closeModal));
function closeModal(){
    helpModal.style.display = 'none';
}

// //listen for outside click
// window.addEventListener("click", (clickOutside));
// function clickOutside(e){
//     if (e.target == helpModal){
//         helpModal.style.display = 'none';
//     }
// }

