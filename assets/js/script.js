/**
 * Author: Hailey D. Francis (hfran7@yahoo.com)
 * Last Edited: 12/4/22
 */

//going to make questions object constants for now
//would be cleaner to have these object constants saved in a seperate file, may do that in the future if possible
//Theoretically could store the options in an array and have the correct answer's index be saved. I believe this may have problems with the buttons, may try to execute in future
const q0 = {
    question: "This is a test question",
    o1: "This is choice 1. It is wrong.",
    o2: "This is choice 2. It is wrong.",
    o3: "This is choice 3. It is right.",
    o4: "This is choice 4. It is wrong.",
    answer: "o3",
  };

  const q1 = {
    question: "What's a string",
    o1: "It's yarn",
    o2: "It's code",
    o3: "It's spaghetti",
    o4: "It's not real",
    answer: "o2",
  };

  const q2 = {
    question: "What is my favorite color",
    o1: "Purple",
    o2: "Red",
    o3: "Blue",
    o4: "Green",
    answer: "o1",
  };

const q_Bank =[q0, q1, q2]; //array of question objects
const lastIndex = q_Bank.length - 1;

highScore_Storage = window.localStorage;

var questionIndex = 0; //index of the current question, globally scoped for easy access between functions
var curQuestion = "";

var introEls = $("#intro").children(); //Elements displayed before the quiz starts
var startButton = $("#start-button"); //Button to start the quiz
var timerEl = $("#timer"); //timer display
var questionForm = $("#question-form"); //form that holds all of the elements for the questions to be displayed
var questionDisplay = $(".question-display"); //class used to toggle showing and hiding the form
var quizCompleteDisplay = $(".quizComplete-display");
var highScoresDisplay = $(".highScores-display");
var viewScoresLink = $("#view-scores");

var timeInterval = "";

//different answer choices
var option1 = $("#option1");
var option2 = $("#option2");
var option3 = $("#option3");
var option4 = $("#option4");

//timeLeft is outside of timer function so that it can be reduced in other functions (primarily when a question is answered incorrectly)
var timeLeft = 200; //starting with 300s (5min), README didn't specify time limit

/**
 * @function_name startQuiz
 * @description 
 * Displays the first question and starts the timer
 * @param N/A
 * @return N/A
 */
function startQuiz(){
    startTimer();
    introEls.hide();
    viewScoresLink.hide();
    questionDisplay.show();
    displayQuestion(questionIndex);
}

/**
 * @function_name startTimer
 * @description 
 * Starts the timer for the quiz. Uses setInterval function
 * @param N/A
 * @return N/A
 */
function startTimer(){
    timeLeft = 200;
    timeInterval = setInterval(function(){
        timeString = "Timer: " + timeLeft;
        timerEl.text(timeString);
        if(timeLeft <= 0){
            quizComplete();
        }
        timeLeft--;
        

    }, 1000);
}

/**
 * @description 
 * This function is in charge of displaying the question and answer choices to the user.
 * @param {int} index
 * @return N/A 
 */
function displayQuestion(index){
    // saves info about current question. Possible dryer way to create with for loop
    curQuestion = q_Bank[index];
    var question = curQuestion.question;
    var o1 = curQuestion.o1;
    var o2 = curQuestion.o2;
    var o3 = curQuestion.o3;
    var o4 = curQuestion.o4;

    questionForm.append("<h3>" + question + "</h3>");
    questionForm.append("<button type=\"button\" id=\"option1\">" + o1 + "</button>");
    questionForm.append("<button type=\"button\" id=\"option2\">" + o2 + "</button>");
    questionForm.append("<button type=\"button\" id=\"option3\">" + o3 + "</button>");
    questionForm.append("<button type=\"button\" id=\"option4\">" + o4 + "</button>");

}

/**
 * @description takes the current question object and compares the user's button input answer to the question's correct answer
 * @param {object} curQuestion 
 * @param {string} answer 
 */
function checkAnswer(curQuestion, answer){
    if(answer != curQuestion.answer){
        incorrect(); //reduces time
        displayMessage("Incorrect!");
    }else{
        displayMessage("Correct!");
    }
    questionForm.children().remove(); //removes current question/answers from form for next question
    if((questionIndex < lastIndex) && timeLeft > 0){
        questionIndex += 1;
        displayQuestion(questionIndex);
    }else{
        questionDisplay.hide();
        quizComplete();
    }
}

/**
 * @description 
 * Should reduce timeLeft by 10 without displaying negative numbers
 * Updates display timer b/c timer only updates every second in timer's interval
 * @param N/A
 * @return N/A
 */
 function incorrect(){
    timeLeft -= 10;
    var timeString = "Timer: " + timeLeft;
    timerEl.text(timeString);
}

/**
 * @description
 * Displays whether the user's previous answer was correct or incorrect.
 * Message will disapear after a few seconds.
 * @param {string} message 
 */
function displayMessage(message){
    $("#answer").replaceWith("<p id=\"answer\">" + message + "</p>");
    //Makes the message appear for one second
    var msgInterval = setInterval(function(){
        clearInterval(msgInterval);
        $("#answer").replaceWith("<p id=\"answer\"></p>");
    }, 1000);
    
}

function quizComplete(){
    questionDisplay.hide();
    questionForm.children().remove();
    questionIndex = 0;
    clearInterval(timeInterval);
    timerEl.text("");
    viewScoresLink.show();
    questionIndex = 0;
    $("#your-score-was").replaceWith("<h3 id=\"your-score-was\">Your Score was " + timeLeft + "!</h3>");
    quizCompleteDisplay.show();
}

function submitScore(){
    var curInitials = $("#initials").val();
    var value = curInitials + ": " + timeLeft;
    highScore_Storage.setItem(curInitials, value);
    quizCompleteDisplay.hide();
    $("#initials").val("");
    introEls.show();
}

function viewScores(){
    introEls.hide();
    quizCompleteDisplay.hide();
    $("#high-score-list").children().remove();
    Object.keys(highScore_Storage).forEach((key) => {
        var score = highScore_Storage.getItem(key);
        $("#high-score-list").append("<li>" + score + "</l1>");
       });
    highScoresDisplay.show();
}

function goBack(){
    highScoresDisplay.hide();
    $("#high-score-list").children().remove();
    introEls.show();
}

function clearScores(){
    highScore_Storage.clear();
    $("#high-score-list").children().remove()
}

// BUTTONS
startButton.on("click", startQuiz);
//wrapped in an anonymous function since jQuery only handles function references (can't input parameters)
questionForm.on('click', '#option1', function(event){
    checkAnswer(curQuestion, "o1");
})
questionForm.on('click', '#option2', function(event){
    checkAnswer(curQuestion, "o2");
})
questionForm.on('click', '#option3', function(event){
    checkAnswer(curQuestion, "o3");
})
questionForm.on('click', '#option4', function(event){
    checkAnswer(curQuestion, "o4");
})

//LINK
viewScoresLink.click(viewScores);
$("#go-back").click(goBack);
$("#clear-scores").click(clearScores);
$("#submit-score").click(submitScore);


