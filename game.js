//global variable for guesses
let guesses = []
let guess = [] 
let guessIndex = 0
let feedbackIndex = guessIndex

//generate code one time for entire game
//function getCode will generate an array of 4 randomly from colors[]
//function displayCode will load the generated code (secret) into the circles in the solution div
const colors = ['orangered', 'rgb(49, 164, 222)', 'rgb(236, 217, 14)', 'rgb(30, 179, 57)', 'black', 'lightgoldenrodyellow']

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
//problem: if secret contains duplicate colors, getFeedback generates a red and a white for each correct guess. should be just a red. How to make an if/else that has for loops inside it

// function getFeedback(guess, secret) {
// const feedback = []
// // console.log(guess)
// // console.log(secret)
// for (let i = 0; i < 4; i++) {
//     if (guess[i] == secret[i]){
//     feedback.push('red')
//     } else 
//     for (let i = 0; i < 4; i++){
//             for (let j = 0; j < 4; j++ ){
//                 if (i !== j){
//                     if (guess[i] == secret[j]) {
//                         feedback.push('white')
//                     }
//                 } 
// }
//     } }
//     feedback.sort()
//     console.log(feedback)
//     return feedback
// }

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
feedback.sort()
// console.log(feedback)
return feedback
}
//clues is a global variable that contains the feedback array
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
        console.log(`the guess is ${guess}`)
        console.log(`the secret is ${secret}`)
        clues = getFeedback(guess, secret)
        console.log(`the clues are ${clues}`)
        console.log(feedbackElements)
        updateFeedbackDOM()
        guess = [] //resets guess array for next guessIndex
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

let reply = Array.from(document.querySelectorAll(".feedback"))
let feedbackElements = reply.map(el => {
    console.log(el.children)
    return el.children
})

let updateFeedbackDOM = () => { 
        for (let j = 0; j < feedbackElements[guessIndex].length; j++){
        // console.log(clues)
        feedbackElements[guessIndex][j].style.backgroundColor = clues[j]
    }
}
//listen for click on color buttons, update DOM with guesses
const blackBtn = document.getElementById("button-black");
blackBtn.addEventListener('click', () => {
    guess.push("black")
    calculateGuess()
})
const blueBtn = document.getElementById("button-blue");
blueBtn.addEventListener('click', () => {
    guess.push("rgb(49, 164, 222)")
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
// //2D array for feedback board


// console.log(feedbackElements)

//struggling with feedback display, let's psuedocode out the goals:
//when the guess[] is completed, ie, when the guess[3] is entered via click on color button, I need to compare that 4-element array to the 4-element array called code[] stored in the global variable secret.
//for every index that matches between code[] and guess[], one circle in the feedback row should display red
//for every color included in the guess[] that is also included in the code[], but is not in the same index, one circle in the feedback row should display white
//that will display the feedback for that guess
//i++ moves on to the next guess 
//checkWin() => 
//if the feedback displays all red, the game is over with a "you win" modal that reveals the solution div
//if the feedback does not display all red on the 10th guess, game is over with a "you lose" modal that reveals the solution div


//restart button
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

//end game modals

//you win modal
//when feedback row is all red
//switch cover display to none and solution display to flex
//pop up modal with you win message
//Play again? button with restart functionality
//bonus--if you win in 5 or fewer guesses, add "impressive!" message
//bonus--if you win in the final guess, add "phew" message

//you lose modal
//when guessIndex = 10 (ie, you have submitted the 10th guess, guessIndex[9]):
//switch cover display to none and solution display to flex
//pop up modal with you fail message
//hint: a red dot means one of your guess colors is correct, but 
//Try again? button with restart functionality

