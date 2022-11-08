//generate code one time for entire game
//generate an array of 4 randomly from this array, include duplicates
const colors = ['red', 'yellow', 'green', 'blue', 'black', 'white']

function getCode(colors){
const code = []
    for (let i = 0; i < 4; i++){
    code.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    console.log(code)
}
getCode(colors)

//get player input: up to 10 guess while code remains constant
//player inputs their guess: 
//input field to type color name
//drag and drop from infinite pile?
//create hover event with menu for all 6 colors, clickable?

//demo round, we'll code and guess to check our feedback
const guess = ['blue', 'green', 'green', 'black']

//generate feedback
//check guess against code: compare two arrays and generate feedback
//compare guess array to code array and if index and color are a match, generate * for every match

const feedback = []

for (let i = 0; i < 4; i++) {
    if (guess[i] == code[i]){
    feedback.push('*')
    }
}

for (let i = 0; i < 4; i++){
    for (let j = 0; j < 4; j++ ){
        if (i !== j){
            if (guess[i] == code[j]) {
                feedback.push('+')
            }
        } 
    }
}
feedback.sort()
console.log(feedback)

//compare guess array to code array and if guess array includes any of the colors from code array, generate + for every match

//if a guess[i] === code[i], it should only generate a *, not a + (how to eliminate double counting)

//display feedback: * = right color, right place, + = right color


//repeat input/feedback until 10 wrong guesses (you lose) or one right guess(you win)

//Reveal code