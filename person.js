module.exports = class Person {

	constructor(id, x, y, culture) {
		
		this.name = randomName(culture);
        this.id = id;

		this.econStance;
		this.polStance;
		this.totalLifeSatisfaction;

		this.money = 0;

		this.citizenship = [];
		this.x = x;
        this.y = y;

		this.happiness = 0;

		this.inHand = null;
        this.age = 0;
        this.culture = culture.name;

		this.home = {"x":null,"y":null}
        this.work = {"x":null,"y":null}

		this.isFirstTurn = true;

	}

}

function doTick(individual) {
	this.prevEconStance = individual.econStance;
	this.prevPolStance = individual.polStance;

	this.prevMoney = individual.money;

	this.prevHappiness = individual.happiness;


	this.totalLifeSatisfaction += (individual.happiness - 50) / individual.age;

	// If it is the first turn, there hasnt been a chance to calculate political stance based on happiness so instead it just gets set to whatever their country is.
	if(individual.isFirstTurn) {
		individual.polStance = individual.citizenship[0].polStance;
		individual.econStance = individual.citizenship[0].econStance;
	}


	// If they are unhappy, their political views will change because they don't like their current leadership
	if(prevHappiness <= 40) {
		// If they are really unhappy with their government they will go to the opposite viewpoint
		if(prevHappiness <= 15)
			if(Math.random() == 1){
				individual.polStance = -individual.polStance;
				individual.econStance = -individual.econStance;
			}
		individual.polStance += (Math.random()*4)-2;
		individual.econStance += (Math.random()*4)-2;
	}

	individual.polStance = clamp(individual.polStance, -10, 10);
	individual.econStance = clamp(individual.econStance, -10, 10);

}

function pickLetter(type,c) {
    var constanants = c.constanants;
    var vowels = c.vowels;
    if(type == "v") {
        if(Math.random() > 0.5) {
            return vowels[Math.floor(Math.random*vowels.length)]
        } else {
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    } else {
        if(Math.random() > 0.8) {
            return vowels[Math.floor(Math.random*vowels.length)]
        } else {
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    }
}

function randomName(c) {
    var vowels = c.vowels;
    var output = "";
    var type = "c";
    if(Math.random() > 0.5) {
        type = "v"
    }
    var letter = pickLetter(type,c);
    for(var i = 0; i < (Math.random()*20)+1; i++) {
        if(vowels.includes(letter)) {
            type = "v"
        } else {
            type = "c"
        }
        output = output+""+letter;
        letter = pickLetter(type,c);
    }
    return output;

}

// Clamp function cos js doesnt have it
function clamp(val,min,max){
  if(val > max)
    val = max;
  if(val < min)
    val = min;
  return val;
}