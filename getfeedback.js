const secret = ['black', 'black', 'green', 'blue']
const guess = ['black', 'green', 'black', 'blue']

function getFeedback(guess, secret){
    const feedback = []
    guess.forEach((element, index) => {
        if (element === secret[index] && secret.includes(element)){
            feedback.push('red')
        } else if (secret.includes(element)){
            feedback.push('black')
        }
    })
    feedback.sort()
    feedback.reverse()
    return feedback
}
let clues = getFeedback(guess, secret)
console.log(clues)