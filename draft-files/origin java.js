var qTimer = document.querySelector('#quizTimer');
var startButton = document.querySelector('#start-btn')
var qSection = document.querySelector('#Question');
var aBtns = document.querySelector('#answer-buttons');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('start', function(){
    console.log('fuck java')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
})
 
function setNextQuestion(){
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    qSection.textContent = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn','btn-primary')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        aBtns.append(button)
    });
}

function selectAnswer(e){
 const selectedButton = e.target
 const correct = selectedButton.dataset.correct
 setStatusClass(document.body, correct)
 Array.from(answerButtons)
}

const questions = [
    {
        question: 'What is 2 + 2?', 
        answers: [
            { text: '4', correct: true},
            {text: '22', correct: false}
        ]
    }
]

//timer script:
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer === 0) {
            stopInterval();
        }
    }, 1000);
}

function countDown() {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#timer');
    startTimer(fiveMinutes, display);
};
var stopInterval = function(){
    alert('times up!')
    clearInterval(timer)
}


/* This function retrieves the values from the html input elements; Sort of
   getting run in the background, it sets the totalSeconds variable which
   is used in getFormattedMinutes/Seconds() and the renderTime() function.
   It essentially resets our timer */
   function setTime() {
    var minutes;
  
    if (status === "Working") {
      minutes = workMinutesInput.value.trim();
    } else {
      minutes = restMinutesInput.value.trim();
    }
  
    clearInterval(interval);
    totalSeconds = minutes * 60;
  }
  
  // This function does 2 things. displays the time and checks to see if time is up.
  function renderTime() {
    // When renderTime is called it sets the textContent for the timer html...
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
  
   // ..and then checks to see if the time has run out
    if (secondsElapsed >= totalSeconds) {
      if (status === "Working") {
        alert("Time for a break!");
      } else {
        alert("Time to get back to work!");
      }
  
      stopTimer();
    }
  }
  
  // This function is where the "time" aspect of the timer runs
  // Notice no settings are changed other than to increment the secondsElapsed var
  function startTimer() {
    setTime();
  
    // We only want to start the timer if totalSeconds is > 0
    if (totalSeconds > 0) {
      /* The "interval" variable here using "setInterval()" begins the recurring increment of the
         secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function() {
          secondsElapsed++;
  
          // So renderTime() is called here once every second.
          renderTime();
        }, 1000);
    } else {
      alert("Minutes of work/rest must be greater than 0.")
    }
  }
  
  /* This function stops the setInterval() set in startTimer but does not
     reset the secondsElapsed variable and does not reset the time by calling "setTime()" */
  function pauseTimer() {
    clearInterval(interval);
    renderTime();
  }
  
  /* This function stops the interval and also resets secondsElapsed
     and calls "setTime()" which effectively reset the timer
     to the input selections workMinutesInput.value and restMinutesInput.value */
  function stopTimer() {
    secondsElapsed = 0;
    setTime();
    renderTime();
  }
  
  /* Our timer is fancy enough to handle 2 different settings at once this toggle
     function basically just specifies which of our 2 timer settings to use. */
  function toggleStatus(event) {
    var checked = event.target.checked;
  
    if (checked) {
      status = "Working";
    } else {
      status = "Resting";
    }
  
    statusSpan.textContent = status;
  
    secondsElapsed = 0;
    setTime();
    renderTime();
  }
  
  function getTimePreferences() {
    /* Here we check to see if any preferences have
       been set in the local storage via "setTimePreferences()" */
    var preferences = JSON.parse(localStorage.getItem("preferences"));
  
    // If preferences have been set then use any value available
    if (preferences) {
      if (preferences.workMinutes) {
        workMinutesInput.value = preferences.workMinutes;
      }
  
      if (preferences.restMinutes) {
        restMinutesInput.value = preferences.restMinutes;
      }
    }
  
    // This is where the app is really kicked-off, setTime and renderTime are the two main routines.
    setTime();
    renderTime();
  }
  
  function setTimePreferences() {
    localStorage.setItem(
      "preferences",
      JSON.stringify({
        workMinutes: workMinutesInput.value.trim(),
        restMinutes: restMinutesInput.value.trim()
      })
    );
  }
  
  playButton.addEventListener("click", startTimer);
  pauseButton.addEventListener("click", pauseTimer);
  stopButton.addEventListener("click", stopTimer);
  statusToggle.addEventListener("change", toggleStatus);
  inputs.addEventListener("change", setTimePreferences);
  inputs.addEventListener("keyup", setTimePreferences);
  