const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
    question: 'Which of the following is true about typeof operator in JavaScript?',
    choice1: 'The typeof is a unary operator that is placed before its single operand, which can be any type',
    choice2: 'Its value is a string indicating the data type operand',
    choice3: 'Both of the above',
    choice4: 'None of the above',
    answer: 3,
},
{
    question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
    choice1: 'global variable',
    choice2: 'local variable',
    choice3: 'Both of the above',
    choice4: 'None of the above',
    answer: 1,
},
{
    question: 'Which built-in method removes the last element from an array and returns the last element?',
    choice1: 'last()',
    choice2: 'get()',
    choice3: 'pop()',
    choice4: 'None of the above',
    answer: 3,
},
{
    question: 'Which of the following function of Number object returns the number value?',
    choice1: 'toString()',
    choice2: 'valueOf',
    choice3: 'toLocaleString',
    choice4: 'toPrecision',
    answer: 2,
},
{
    question: 'Which of the following function of String object creates a string to blink as if it were in a <blink> tag?',
    choice1: 'anchor',
    choice2: 'big',
    choice3: 'blink',
    choice4: 'italics',
    answer: 4,
}
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }


    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]

    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

var count = 65;
var interval = setInterval(function(){
  document.getElementById('count').innerHTML=count;
  count--;
  if (count === 0){
    window.location.href = "end.html"
     }
}, 1000);


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        

    }, 1000)
})   

})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
