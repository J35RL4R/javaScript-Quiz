const startButton = document.querySelector('#start-btn')
const nextButton = document.querySelector('#next-btn')
const questionContainer = document.querySelector('#question-container')
const questionElement = document.querySelector('#question')
const answerButtons = document.querySelector('#answer-buttons')

var counter = document.querySelector('#current-score')
var timer = document.querySelector('#timer')
var count = localStorage.getItem("count");


counter.textContent = count;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);


nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
});

function qtimer() {
    var fiveMinutes = 60 * 5,
    display = document.querySelector('#timer');

    startTimer(fiveMinutes, display);
}


function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    myInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = 'Time Left ' + minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(myInterval);
            doneFunction();
        }
    }, 1000);
}
function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    setNextQuestion();
    qtimer();
    startTimer();
  
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);

};

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-outline-light');
        if(answer.correct){
            button.dataset.correct = answer.correct
        };
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)
    });
}
function resetState(){
    nextButton.classList.add('hide')
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)    
    }
    ClearStatusClass(document.body)
}
function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
    if(correct){
        count++;
        counter.textContent = 'Correct Answers: ' + count;
        localStorage.setItem("count", count);
    }
}
function setStatusClass(element, correct){
    ClearStatusClass(element)
    if (correct){
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function ClearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: 'What is 2 + 2?', 
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]
    },
    {
        question: 'What is 2 + 3?', 
        answers: [
            {text: '4', correct: true},
            {text: '22', correct: false},
            {text: '4', correct: true},
            {text: '22', correct: false}
        ]

    }
]

