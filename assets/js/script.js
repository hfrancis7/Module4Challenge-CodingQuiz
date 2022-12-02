/**
 * Author: Hailey D. Francis (hfran7@yahoo.com)
 * Last Edited: 12/1/22
 */

var introEls = $("#intro").children();
var startButton = $("#start-button");
var timerEl = $("#timer");
var questionForm = $("#question-form");

var option1 = $("#option1");
var option2 = $("#option2");
var option3 = $("#option3");
var option4 = $("#option4");

//timeLeft is outside of timer function so that it can be reduced in other functions (primarily when a question is answered incorrectly)
var timeLeft = 300; //starting with 300s (5min), README didn't specify time limit

/**
 * Description: Function to start quiz
 * param: N/A
 * return: N/A
 */
function startQuiz(){
    startTimer();
    introEls.toggle();
    displayQuestion();
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
    console.log("incorrect function begin execute");
    if(timeLeft > 10){
        timeLeft = timeLeft - 10;
    }else{
        timeLeft = 0;
    }
    console.log("incorrect function end execute");
}

function displayQuestion(){
    //questions will likely be displayed in the same order every time. 
    //If randomizing the order is trivial, might change
    //for each loop TODO
        var question = q0.question;
        var o1 = q0.c1;
        var o2 = q0.c2;
        var o3 = q0.c3;
        var o4 = q0.c4;
        var answer = q0.answer;

        questionForm.append("<h3>" + question + "</h3>");
        questionForm.append("<button type=\"button\" id=\"option1\">" + o1 + "</button>");
        questionForm.append("<button type=\"button\" id=\"option2\">" + o2 + "</button>");
        questionForm.append("<button type=\"button\" id=\"option3\">" + o3 + "</button>");
        questionForm.append("<button type=\"button\" id=\"option4\">" + o4 + "</button>");

}

function checkAnswer(){
    
}


startButton.on("click", startQuiz);
option1.on("click", incorrect);


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