var startButton = $("#start-button");
var timerEl = $("#timer");

//timeLeft is outside of timer function so that it can be reduced in other functions (primarily when a question is answered incorrectly)
var timeLeft = 300; //starting with 300s (5min), README didn't specify time limit

/**
 * Description: Function to start quiz
 * param: N/A
 * return: N/A
 */
function startQuiz(){
    startTimer();
    console.log("marker1");
    //display a question and its options
    //once question is answered, move on to next question
        //if question is wrong, subtract from timer
}

/**
 * Description: Starts the timer for the quiz. Uses setInterval function
 * Param: N/A
 * return: N/A
 */
function startTimer(){
    var timeString = "Timer: " + timeLeft;
    console.log("marker2");
    var timeInterval = setInterval(function(){
        timeString = "Timer: " + timeLeft;
        timerEl.text(timeString);
        timeLeft--;
        if(timeLeft == 0){
            clearInterval(timeInterval);
        }

    }, 1000);
}


startButton.on("click", startQuiz);
