var game = function () {
  var timerId;
  var questArray = []; 
  var promptArray = ["A", "B", "C", "D"];
  var currQuest = 0; 
  var timeLeft = 10;
  var gameOver = false;
  var userCorrect = 0;
  var userWrong = 0;
  var listen = false;

  function getQuestions() {
    var category = $("#category").val();
    var difficulty = $("#difficulty").val();
    var numQuestions = $("#question-number").val();

    queryURL = "https://opentdb.com/api.php?amount=" + numQuestions + "&category=" + category + "&difficulty=" + difficulty + "&type=multiple";
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response){
      if(response > 0) {
        alert("Something went wrong, please try again.");
        gameOver();
      }
      this.questArray = [];
      resultsLength = response.results.length;
      for(var i = 0; i < resultsLength; i++){
        var tempQ = response.results[i];
        if(tempQ.hasOwnProperty("question")){
          questArray[i]= new MultChoiceQ(tempQ.question, tempQ.correct_answer, tempQ.incorrect_answers);
        } 
      }
      postQuestion(questArray[currQuest]);
    });
  }
  
  //Checks for game over condition and then call next question
  function postNextQuestion(){
    currQuest++;
    if(currQuest >= questArray.length) {
      alert("Game Over! Your score was: " + + userCorrect + '/' + (userCorrect + userWrong));
      gameOver();
    } else {
      postQuestion(questArray[currQuest]);
    }
  }

  function postQuestion(question) {

    $("#question").empty();
    $("#pFoils").empty();

    $("#question").text(parse(question.prompt));
    var length = question.foilArr.length;
    for (var i = 0; i<length; i++) {
      var newBtn = $("<label>");
      newBtn.addClass("answer foil btn btn-lg btn-block btn-primary"); //("class", "radio answer");
      newBtn.text(promptArray[i] + ". " + parse(question.foilArr[i]));
      newBtn.on("click", evalResponse); 
      $("#pFoils").append(newBtn);    
    }
    var listen = true;
    timeLeft = 30;
    timerId = setInterval(countdown, 1000);
  }

  function gameOver() {
      $("#response-area").append('<p>Previous Score: ' + userCorrect + '/' + (userCorrect+userWrong) + '</p>');
      $("#trivia-panel").hide();
      $("#trivia-start").show();
      $("#game-settings").show();
  }

  //This is the meat of the game -- determines whether an answer is correct or not, sets a timeout and moves on. 
  //If timer runs out, it gets sent here as well as an empty response.  
  function evalResponse(){
    $(".answer").off(); //Only accept one answer, this removes the click listener from all foils.

    var buttonElement = $(this);  //Save unnecessary clockcycles. 
    var userResponse = buttonElement.text().substr(3); //Need to remove the first three characters before comparisons. 
    var answer = questArray[currQuest].answer;
    
    if (userResponse === answer){ //Correct Answer
      userCorrect++;
      buttonElement.removeClass("btn-primary").addClass("btn-success");   
    } else { //Wrong Answer
      userWrong++;
      $(".answer").each(function(i, item) {
        buttonElement.removeClass("btn-primary").addClass("btn-danger");
        if( $(item).text().substr(3) === answer) {
          console.log("Should be changing a button to green");
          $(this).removeClass("btn-primary").addClass("btn-success")            
          return false;
        }
      });
    }

    updateScore();
    clearTimeout(timerId);
    //$("#timer").text("00"); //This was causing awkward button shrinkage for timer.  
    //Wait 2 seconds
    setTimeout(postNextQuestion, 2000);
  }


  function updateScore() {
    $("#correct").text(userCorrect);
    $("#wrong").text(userWrong);
  }


  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      //Is there a better way to step into the chain when the timer runs out? repeating the code here seems cludgy
      evalResponse();
    } else {
      $("#timer").text("00:"+timeLeft);
      timeLeft--;
    }
  }

  return {
      start : function () {
        getQuestions();
      },

      pause : function () {
        //functionality not yet implemented :)
      }
    }
};

//initialize a new game
var triviaGame; //make triviaGame a global variable just in case. 

$("#trivia-start").click(function(){
  triviaGame = new game();
  $("#trivia-panel").show();
  $("#trivia-start").hide();
  $("#game-settings").hide();
  triviaGame.start();
});

$("#timer").click(function() {
  //Considered adding a pause function by clicking timer, not yet implemented. 
})







