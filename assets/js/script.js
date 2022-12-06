/**
 * Author: Hailey D. Francis (hfran7@yahoo.com)
 * Last Edited: 12/5/22
 */

// QUESTION + ANSWER OBJECT CONSTANTS //
const q0 = {
    question: "How do you have a link in your html open a new browser window?",
    o1: "target=\"_new\"",
    o2: "blank=\"_open\"",
    o3: "target=\"_blank\"",
    o4: "open=\"_blank\"",
    answer: "o3",
  };

  const q1 = {
    question: "What does HTML stand for?",
    o1: "Hyperlinks and Text Markup Language",
    o2: "Hypertext Markup Language",
    o3: "Home Tool Markup Language",
    o4: "Hyper tool Markup Language",
    answer: "o2",
  };

  const q2 = {
    question: "What does CSS stand for?",
    o1: "Cascading Style Sheets",
    o2: "Coding Style Sheets",
    o3: "Cascading Sheet Styles",
    o4: "Coding Sheet Styles",
    answer: "o1",
  };

  const q3 = {
    question: "Commonly used data types DO NOT include:",
    o1: "strings",
    o2: "booleans",
    o3: "integers",
    o4: "assets",
    answer: "o4",
  };

  const q4 = {
    question: "The condition in an if/else statement is enclosed within ____.",
    o1: "\"quotes\"",
    o2: "{curly brackets}",
    o3: "(parentheses)",
    o4: "[square brackets]",
    answer: "o3",
  };

  const q5 = {
    question: "Arrays in JavaScript can be used to store which of the following?",
    o1: "numbers and strings",
    o2: "booleans",
    o3: "other arrays",
    o4: "all of the above",
    answer: "o4",
  };

  const q6 = {
    question: "Inside which HTML element do we put the JavaScript?",
    o1: "<script>",
    o2: "<js>",
    o3: "<javascript>",
    o4: "<scripting>",
    answer: "o1",
  };

  const q7 = {
    question: "Which of the following is an advantage of using JavaScript?",
    o1: "Less server interaction",
    o2: "Immediate feedback to users",
    o3: "increased interactivity",
    o4: "all of the above",
    answer: "o4",
  }

  const q8 = {
    question: "Which of the following type of variables takes precedence over others if names are the same?",
    o1: "Global variable",
    o2: "Local variable",
    o3: "Both of the above",
    o4: "None of the above",
    answer: "o2",
  }

  const q9 = {
    question: "Which built-in method reverses the order of the elements of an array?",
    o1: "changeOrder(order)",
    o2: "reverse()",
    o3: "sort(order)",
    o4: "None of the above",
    answer: "o2",
  }





const q_Bank =[q0, q1, q2, q3, q4, q5, q6, q7, q8, q9]; //array of question objects
const lastIndex = q_Bank.length - 1;

// END OF QUESTION + ANSWER OBJECT CONSTANTS //

highScore_Storage = window.localStorage; //local storage

var questionIndex = 0; //index of the current question, globally scoped for easy access between functions
var curQuestion = "";

// JQUERY VARIABLES //
var introEls = $("#intro"); //Elements displayed before the quiz starts
var startButton = $("#start-button"); //Button to start the quiz
var timerEl = $("#timer"); //timer display
var questionForm = $("#question-form"); //form that holds all of the elements for the questions to be displayed
var questionDisplay = $(".question-display"); //class used to toggle showing and hiding the form
var quizCompleteDisplay = $(".quizComplete-display");
var highScoresDisplay = $(".highScores-display");
var viewScoresLink = $("#view-scores");

var timeInterval = "";

// different answer choices //
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
    timerEl.text("Timer:");
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
    questionForm.append("<button class=\"button\" type=\"button\" id=\"option1\">" + o1 + "</button><br>");
    questionForm.append("<button class=\"button\" type=\"button\" id=\"option2\">" + o2 + "</button><br>");
    questionForm.append("<button class=\"button\" type=\"button\" id=\"option3\">" + o3 + "</button><br>");
    questionForm.append("<button class=\"button\" type=\"button\" id=\"option4\">" + o4 + "</button><br>");

}

/**
 * @description takes the current question object and compares the user's button input answer to the question's correct answer
 * @param {object} curQuestion 
 * @param {string} answer 
 */
function checkAnswer(curQuestion, answer){
    if(answer != curQuestion.answer){
        incorrect(); //reduces time
        $(".cat").replaceWith("<img src=\"./assets/images/cat_incorrect.png\" class=\"cat\"></img>");
        displayMessage("Incorrect!");
    }else{
        $(".cat").replaceWith("<img src=\"./assets/images/cat_correct.png\" class=\"cat\"></img>");
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
        $(".cat").replaceWith("<img src=\"./assets/images/cat_neutral.png\" class=\"cat\"></img>");
    }, 750);
    
}

/**
 * @description
 * Shows "Quiz complete elements", allows user to input their initials
 */
function quizComplete(){
    questionDisplay.hide(); //hides the question display
    questionForm.children().remove(); //clears all elements of question
    questionIndex = 0; //resets question index list
    clearInterval(timeInterval); //stops timer
    timerEl.text(""); //removes timer display
    viewScoresLink.show();

    //shows the user what their score was based on the timer
    $("#your-score-was").replaceWith("<h3 id=\"your-score-was\">Your Score was " + timeLeft + "!</h3>");
    quizCompleteDisplay.show();
}

/**
 * @description
 * Saves score to local storage, if user doesn't enter anything into input box than an alert box appears.
 * NOTE: There is currently no check to see if the user is entering valid initials. The user can currently enter
 * however many and whatever kinds of letters/numbers/symbols they wish.
 */
function submitScore(){
    var curInitials = $("#initials").val();
    $("#initials").val("");
    var keyFound = false;
    
    //if user has entered nothing
    if(curInitials == ""){
        alert("Please input your initials.");
    }else{
        //if user already has score saved
        Object.keys(highScore_Storage).forEach((key) => {
            if(key == curInitials){
                keyFound = true;
                var score = highScore_Storage.getItem(key);
                let  userAnswer = confirm("You already a score saved. (" + score + ") Are you sure you want to overwrite this score?");
                if(userAnswer){
                    var value = curInitials + ": " + timeLeft;
                    highScore_Storage.setItem(curInitials, value);
                    quizCompleteDisplay.hide();
                    introEls.show();
                }
            }
        })
        if(!keyFound){
            var value = curInitials + ": " + timeLeft;
            highScore_Storage.setItem(curInitials, value);
            quizCompleteDisplay.hide();
            introEls.show();
        }
        

        
    }
    
}

/**
 * @description
 * hides other elements and displays the current high scores from local storage.
 * re-prints list every time upon pressing "view scores"
 */
function viewScores(){
    introEls.hide();
    quizCompleteDisplay.hide();
    $("#high-score-list").children().remove();
    $(".cat").replaceWith("<img src=\"./assets/images/cat_celebrate.png\" class=\"cat\"></img>");
    Object.keys(highScore_Storage).forEach((key) => {
        var score = highScore_Storage.getItem(key);
        $("#high-score-list").append("<li>" + score + "</l1>");
       });
    highScoresDisplay.show();
}

/**
 * @description
 * hides high score elements, clears li elements and displays intro elements again.
 * Also used to go back to main screen from Quiz Complete display
 */
function goBack(){
    highScoresDisplay.hide();
    quizCompleteDisplay.hide();
    $("#high-score-list").children().remove();
    $(".cat").replaceWith("<img src=\"./assets/images/cat_neutral.png\" class=\"cat\"></img>");
    introEls.show();
}

/**
 * @description
 * Clears the high scores from local storage
 */
function clearScores(){
    highScore_Storage.clear();
    $("#high-score-list").children().remove();
}

// BUTTONS //
startButton.on("click", startQuiz);
$("#clear-scores").click(clearScores);
$("#submit-score").click(submitScore);

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

// LINK
viewScoresLink.click(viewScores);
$("#go-back").click(goBack);
$("#go-back2").click(goBack);



