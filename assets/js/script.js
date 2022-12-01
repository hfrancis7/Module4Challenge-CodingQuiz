/**
 * Author: Hailey D. Francis (hfran7@yahoo.com)
 * Last Edited: 12/1/22
 */

var startButton = $("#start-button");
var timerEl = $("#timer");
var questionDisplay = $("display-question");

var question = $("#question");
var option1 = $("option1");
var option2 = $("option2");
var option3 = $("option3");
var option4 = $("option4");

//timeLeft is outside of timer function so that it can be reduced in other functions (primarily when a question is answered incorrectly)
var timeLeft = 300; //starting with 300s (5min), README didn't specify time limit

/**
 * Description: Function to start quiz
 * param: N/A
 * return: N/A
 */
function startQuiz(){
    startTimer();
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
    var timeInterval = setInterval(function(){
        timeString = "Timer: " + timeLeft;
        timerEl.text(timeString);
        timeLeft--;
        if(timeLeft <= 0){
            clearInterval(timeInterval);
        }

    }, 1000);
}

/**
 * Description: Should reduce timeLeft by 10 without displaying negative numbers
 * Param: N/A
 * return: N/A
 * note: haven't tested yet
 */
function incorrect(){
    if(timeLeft > 10){
        timeLeft = timeLeft - 10;
    }else{
        timeLeft = 0;
    }
}

function displayQuestion(event){
    //questions will likely be displayed in the same order every time. 
    //If randomizing the order is trivial, might change
    event.preventDefault();
    

}

function answerQuestion(event){
    event.preventDefault();


}


startButton.on("click", startQuiz);


//going to make questions object constants for now
const q0 = {
    question: "This is a test question",
    c1: "This is choice 1. It is wrong.",
    c2: "This is choice 2. It is wrong.",
    c3: "This is choice 3. It is right.",
    c4: "This is choice 4. It is wrong.",
    answer: "c3",
  };

const q_Bank =[q0];