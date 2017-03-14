'use strict'
//Define HTML strings
//Helper Functions available from starwars-helper.js
// oppCount() - return number of living opponents from global roster
// genColStr(maxCols) - return column string to generate maxCols columns <= 12 without closing </div> tag
// charImgStr(charKey) - return image string for a given character

var playerChar = {};
var oppChar = {};

function Character(name, hp, atk, ctr) {
	this.name = name;
  this.hp = hp;
  this.atk = atk;
  this.baseAtk = atk;
  this.ctr = ctr;
  this.alive = true;
}

function initRoster () {
  return {
    lukeSkywalker : new Character("Luke Skywalker", 200, 15, 10),
    darthVader : new Character("Darth Vader", 200, 10, 15),
    emperorPalpatine : new Character("Emperor Palpatine", 100, 15, 75),
    chewbacca : new Character("Chewbacca", 300, 5, 25)
  };
}
//Initialize characters
var roster = initRoster();
var currentSound;
var themeSong = "./assets/sounds/theme.mp3";
var robot = "./assets/sounds/R2D2.mp3";
playSound(themeSong);

function drawCharacterSelect(characterSet) {
  var pArena = $("#battleArena");
  var heroCol = genColStr(4);
  
  pArena.empty();
  $("#banner").text("Please select a character:");

  //Create a column and insert character image in document.  Note that images must follow key.png naming convention
  for(var key in characterSet) { 
    console.log("Key: " + key + " | " + characterSet[key].name);
    pArena.append(heroCol + charImgStr(key) + charStatStr(key) + '</div>');
  }
  //Add a click handler to each character image
  $(".hero-icon").click(charClickHandler);
}

function charClickHandler(){
  var hero = $(this).attr("id");
  console.log("hero:" + hero);
  playerChar = hero;
  drawOppSelect(roster);
}

function drawOppSelect(characterSet) {
  var pArena = $("#battleArena");
  var opponents = {};
  var victory = true;
  
  pArena.empty();
  var heroCol = genColStr(oppCount()); //Should be set to number of opponents remaining
  $("#banner").text("Please select your next Opponent:");

  for(var key in roster) {
    if(key != playerChar && roster[key].alive) {
      pArena.append(heroCol + charImgStr(key) + charStatStr(key) + '</div>');
      victory = false; 
    } 
  }
  if(victory) {
    drawGameOver(true);
    console.log("You Won, congratulations!");
  } else {
    $(".hero-icon").click(oppClickHandler);
  }
}

function drawGameOver(playerWin) {
  var pArena = $("#battleArena");
  pArena.empty();
  if(playerWin) {
    $("#banner").text("You Are Victorious!");
    playSound("./assets/sounds/cantina.mp3");
  
  } else {
    $("#banner").text("You have been Defeated!");
    playSound("./assets/sounds/fail.mp3")
  }
  //pArena.html('<button class="centered" id="atk-btn">Play Again?</button>');
  var newGameBtn = $("<button/>");
  newGameBtn.attr("class", "centered");
  newGameBtn.attr("id", "atk-btn");
  newGameBtn.text("PLAY AGAIN");
  
  newGameBtn.click(function(){
    drawCharacterSelect(roster);
    playSound(robot);
  });

  pArena.append(newGameBtn);
  roster = initRoster();


}

function oppClickHandler(){
  playSound(robot);
  var villain = $(this).attr("id");
  console.log("villain: " + villain);
  oppChar = villain; 
  drawBattleScreen(playerChar, oppChar);
}


function drawBattleScreen(hero, villain){

  var pArena = $("#battleArena");
  var heroCol = genColStr(3);
  var battleButton = '<button type="button" id="atk-btn" class="btn centered">Attack</button>';
  pArena.empty();
  $("#banner").text(roster[hero].name + " VS. " + roster[villain].name);
  pArena.append(heroCol + charImgStr(hero)  + charStatStr(hero) + '</div>');
  pArena.append(heroCol + battleButton + '</div>');
  pArena.append(heroCol + charImgStr(villain)  + charStatStr(villain) + '</div>');

  $("#atk-btn").click(battleClickHandler);

}

function battleClickHandler(){
  console.log("Attacking!");
  attackRound();

}

function attackRound() {
    var hero = roster[playerChar];
    var villain = roster[oppChar];
    var soundFx;
    if (villain.alive) {
      playBattleSound();
      villain.hp -= hero.atk;
      hero.atk += hero.baseAtk;
      $("#"+oppChar+"-hp").text(villain.hp);
      $("#"+playerChar+"-atk").text(hero.atk);

    }
    if(villain.hp > 0) {
      playBattleSound();
      hero.hp -= villain.ctr;
      $("#"+playerChar+"-hp").text(hero.hp);

    } else {
      console.log("Villain has been defeated!");
      $("#banner").append("Villain DOWNED");
      villain.alive = false;
      drawOppSelect(roster);
    }
    if (hero.hp <= 0) {
      hero.alive = false;
      console.log("Hero has died!");
      alert("Game Over! Please Try Again.");
      $("#banner").append("Hero HP: DOWNED");
      drawGameOver(false);
    } 
    console.log("Hero HP: " + hero.hp + " | Villain HP: " + villain.hp);

   
}



function charImgStr(charKey){
  var hero = roster[charKey];
  var imgStr = '<img class="hero-icon glowing-border centered" id="' + charKey + '" src="./assets/images/' + charKey + '.png" alt="' + roster[charKey].name +'">';
  return imgStr;
}

function charStatStr(charKey){   
  var hero = roster[charKey];
  var statStr = '<ul class="stat-text">';
  statStr += '<li>' + hero.name + '</li>';
  statStr += '<li> HP: <span id="' + charKey +'-hp">' + hero.hp + '</span></li>';
  statStr += '<li> Attack: <span id="' + charKey +'-atk">' + hero.atk + '</span></li>';
  statStr += "<li> Counter: " + hero.ctr + "</li>";
  statStr += "</ul>";
  return statStr;
}
//Character Select
drawCharacterSelect(roster);

//console.log("javascript executing");

