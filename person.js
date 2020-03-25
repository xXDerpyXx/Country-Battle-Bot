module.exports = class Person {

    constructor(id,x,y,culture) {
        this.name = randomName(culture);
        this.id = id;
        this.econStance = 0;
        this.polStance = 0;
        this.totalLifeSatisfaction = 0;
        this.x = x;
        this.y = y;

        this.money = 0;
        this.citizenship = [];

        this.happiness = 0;
        this.inHand = null;
        this.age = 0;
        this.culture = culture.name;

        this.home = {"x":null,"y":null}
        this.work = {"x":null,"y":null}

    }
}

function pickLetter(type,c){
    var constanants = c.constanants;
    var vowels = c.vowels;
    if(type == "v"){
        if(Math.random() > 0.5){
            return vowels[Math.floor(Math.random*vowels.length)]
        }else{
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    }else{
        if(Math.random() > 0.8){
            return vowels[Math.floor(Math.random*vowels.length)]
        }else{
            return constanants[Math.floor(Math.random*constanants.length)]
        }
    }
}

function randomName(c){
    var vowels = c.vowels;
    var output = "";
    var type = "c";
    if(Math.random() > 0.5){
        type = "v"
    }
    var letter = pickLetter(type,c);
    for(var i = 0; i < (Math.random()*20)+1; i++){
        if(vowels.includes(letter)){
            type = "v"
        }else{
            type = "c"
        }
        output = output+""+letter;
        letter = pickLetter(type,c);
    }
    return output;

}

function calculateTurn(individual) {
    this.prevEconStance = individual.econStance;
    this.prevPolStance = individual.polStance;

    this.prevMoney = individual.money;

    this.prevHappiness = individual.happiness;

    //set happiness
    //add to life satisfaction
    //do other stuff too

    this.totalLifeSatisfaction += (individual.happiness - 50) / individual.age; //this way if your happiness is less than average it reduces, but also the older you are the 
    //less it impacts, idk if this is a good idea but yeah.

    if(individual.isFirstTurn) {
        individual.polStance = individual.citizenship[0].calculatePolCompass();
    }

    if(prevHappiness <= 40) {
        if(prevHappiness <= 20)
            if(Math.random() == 1)
                individual.polStance = [-individual.polStance, -individual.polStance];
        individual.polStance = [this.prevPolStance[0]+(Math.random()*2)-1, this.prevPolStance[1]+(Math.random()*2)-1];
    }

}

function clamp(val,min,max){
  if(val > max)
    val = max;
  if(val < min)
    val = min;
  return val;
}