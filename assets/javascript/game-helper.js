function MultChoiceQ (prompt, answer, foilArr) {
  this.prompt = prompt;
  this.answer = answer;
  this.foilArr = foilArr;
  this.foilArr.push(answer);
  this.foilArr = shuffle(this.foilArr);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Removes HTML encoding
function parse(str) {
	var parser = new DOMParser;
	var dom = parser.parseFromString(
	'<!doctype html><body>' + str,
	'text/html');
	//console.log(decodedString);
	return dom.body.textContent;
}