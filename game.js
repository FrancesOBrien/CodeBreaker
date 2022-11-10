//generate code one time for entire game
//function getCode will generate an array of 4 randomly from this array, include duplicates
const colors = ['red', 'yellow', 'green', 'blue', 'black', 'white']

function getCode(colors){
const code = []
    for (let i = 0; i < 4; i++){
    code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return code
}
let secret = getCode(colors)

//get player input: up to 10 guess while code remains constant
//player inputs their guess: 
//six color buttons on the screen with event listners to push that color into guess array!

//demo round, we'll enter code and guess to check our feedback
// const code = ['white', 'green', 'yellow', 'red']
const guess = ['white', 'green', 'yellow', 'red']
const guessCount = 0
//every time user enters guess, guessCount++
//if guessCount == 10, game over

//generate feedback
//check guess against code: compare two arrays and generate feedback
//compare guess array to code array and if index and color are a match, generate * for every match
//compare guess array to code array and if guess array includes any of the colors from code array, generate + for every match
// use .sort() to equalize feedback array

function getFeedback(guess, secret) {
const feedback = []
for (let i = 0; i < 4; i++) {
    if (guess[i] == secret[i]){
    feedback.push('*')
    }
}
for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++ ){
        if (i !== j){
            if (guess[i] == secret[j]) {
                feedback.push('+')
            }
        } 
    }
}
feedback.sort()
console.log(feedback)
console.log(checkWin(feedback))
}
console.log(guess)
getFeedback(guess, secret)

function checkWin(feedback){
    let win = true
    for (let i = 0; i < 4; i++){
        if (feedback[i] !== '*') {
            win = false
        } 
    } return win
}

//display feedback: * = right color, right place, + = right color


//repeat input/feedback until 10 wrong guesses (you lose) or one right guess(you win)
//checkWin called on each guess

//Reveal code



//listen for click on color buttons, turn next open circle corresponding color!

const blackBtn = document.getElementById("button-black");
blackBtn.addEventListener('click', () => {
    console.log("black button clicked")
})
const blueBtn = document.getElementById("button-blue");
blueBtn.addEventListener('click', () => {
    console.log("blue button clicked")
})
const yellBtn = document.getElementById("button-yellow");
yellBtn.addEventListener('click', () => {
    console.log("yellow button clicked")
})
const redBtn = document.getElementById("button-red");
redBtn.addEventListener('click', () => {
    console.log("red button clicked")
})
const greenBtn = document.getElementById("button-green");
greenBtn.addEventListener('click', () => {
    console.log("green button clicked")
})
const whiteBtn = document.getElementById("button-white");
whiteBtn.addEventListener('click', () => {
    console.log("white button clicked")
})