function oppCount () {
    var count = 0;
    for(var key in roster) {
      if(roster.hasOwnProperty(key) && typeof(roster.key) != "function" && roster[key].alive) {
        count++;
      }
    }
    console.log("Count is: " + count);
    return count-1; //There will always be a hero among them. 
}

function genCol(lg, md, sm, xs) {
  return '<div class="hero-col col-lg-' + lg + ' col-md-' + md + ' col-sm-' + sm + ' col-xs-' + xs +'">';
}

function genColStr (maxCols) {
  return genCol(12/maxCols, 12/maxCols, 12/maxCols, 12);
  // return '<div class="col-lg-' + (12/colLg) + ' col-md-' + (12/) + ' col-sm-' + sm + ' col-xs-' + xs +'">';

}


function playBattleSound() {
  playSound('./assets/sounds/clash'+ (Math.floor(Math.random() * 21)+1)+'.wav');
}

function playSound(soundFile) {
  var audioElement = document.createElement('audio');

  audioElement.setAttribute('src', soundFile);
  pauseSound();
  audioElement.play();
  currentSound = audioElement;
  return audioElement;

}

function pauseSound() {
    if(currentSound) {
      currentSound.pause();
    }
    return true;
}
//UNUSED IN CURRENT ITERATION



var game = function () {
    var gameRound = 1;
    var playerCharacter = {}; 
    var oppCharacter = {}; 

    return {

      chooseOpponent : function () {
      },

      initiateAttack : function () {
      },

      counterAttack : function () {
      },

      printScreen : function () {   
      }
    }
};
//initiate game
