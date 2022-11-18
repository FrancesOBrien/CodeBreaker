//global variable for guesses
let guesses = []
let guess = [] 
let guessIndex = 0
let feedbackIndex = guessIndex

//generate code one time for each round of the game
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
console.log(secret) //comment this out when going live or people can inspect and cheat!
displayCode() //loads the secret code into the solution div

//update getFeedback():
//I want to check each element in a guess[] for two conditions
//conditionRed = this color is in correct index :
//create a for loop that checks for this condition and store that condition in an array variable
//conditionWhite = this color is included in the code[], but in a different index
//create the nested for loop that checks for this condition and store that condition in an array variable
//if an element satisfies both conditions, I only want conditionRed to be expressed, conditionWhite should be muted
//add both array variables into one array variable

//also, each element of the guess array should only produce one element in the clue array
function getFeedback(guess, secret){
    const feedback = []
    guess.forEach((element, index) => {
        if (element === secret[index] && secret.includes(element)){
            feedback.push('red')
        } else if (secret.includes(element)){
            feedback.push('black')
        } else {
            feedback.push('blanchedalmond')
        }
    })
    feedback.sort()
    feedback.reverse()
    return feedback
}
//SQUEEEEEEIDIDIT
//generate feedback
//function getFeedback compares guess[] to secret[] and generates feedback array of strings stored in global variable clues[]
// function getFeedback(guess, secret) {
// const feedback = []
//     for (let i = 0; i < 4; i++) {
//         if (guess[i] == secret[i]){
//             feedback.push('red')
//         }
//     }
//     for (let i = 0; i < 4; i++){
//         for (let j = 0; j < 4; j++ ){
//             if (i !== j){
//                 if (guess[i] == secret[j]) {
//                     feedback.push('white')
//                 }
//             } 
//         }
//     }
//     feedback.sort() //sorts the array so all reds appear first
//     feedback.slice(0,3) //cuts the feedback off at 4 elements to avoid excess whites
//     return feedback
// }
//clues is a global variable that contains the feedback array
let clues = getFeedback(guess, secret)

//every time user enters guess, guessCount++
//if guessIndex == 10, game over

// function checkWin(){
//     let win = true
//     for (let i = 0; i < clues.length; i++){
//         if (clues[i] !== 'red') {
//             win = false
//         } 
//     return win
// }}
function checkWin(){
    let win = true
    for (let i = 0; i < clues.length; i++){
        if (clues[i] !== 'red' || clues.includes('black')){ //win case needs to cover doubles in guess[]
            win = false
        }
    } return win
}


//calculate guess: 
//function to record each guess on a separate guessIndex in the array of guesses
//then update the DOM so guesses appear as colors
//then update the DOM so the feedback clues appear as colors
//then move to the next guessIndex after 4 guesses

let calculateGuess = () => {
    guesses[guessIndex] = guess
    updateGuessDOM()
    if (guess.length >= 4){
        // console.log(`the guess is ${guess}`)
        // console.log(`the secret is ${secret}`)
        clues = getFeedback(guess, secret)
        // console.log(`the clues are ${clues}`)
        // console.log(feedbackElements)
        updateFeedbackDOM()
        if (checkWin() == true){
            console.log('you win! play again?')
            winModal.style.display = "flex"
            cover.style.display = "none"
            solution.style.display = "flex"
        }
        guess = [] //resets guess array for next guessIndex
        guessIndex++
        if (guessIndex == 10){
            console.log('you lose, try again?')
            loseModal.style.display = "flex"
            cover.style.display = "none"
            solution.style.display = "flex"
        }
    } }


//2D array for guess board

let circles = Array.from(document.querySelectorAll(".guess"))
let guessElements = circles.map(el => {
    return el.children
})

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
    // console.log(el.children)
    return el.children
})

let updateFeedbackDOM = () => { 
        for (let j = 0; j < feedbackElements[guessIndex].length; j++){
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
const lxBtn = document.getElementById("lxBtn");
lxBtn.addEventListener('click', (closeLose));
function closeLose(){
    loseModal.style.display = 'none'
}
const tryAgainBtn = document.getElementById("tryAgainBtn");
tryAgainBtn.addEventListener("click", () => {
    window.location.reload();
})

const wxBtn = document.getElementById("wxBtn");
wxBtn.addEventListener("click", (winClose));
function winClose(){
    winModal.style.display = 'none'
}
const playAgainBtn = document.getElementById("playAgainBtn");
playAgainBtn.addEventListener("click", () => {
    window.location.reload();
})
//end game modals

//you win modal
//when feedback row is all red and no black
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

