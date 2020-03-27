module.exports = function doTick(individual) {
    var v = require.main.require('./vars.js');
    
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

	individual.polStance = v.fn.clamp(individual.polStance, -10, 10);
	individual.econStance = v.fn.clamp(individual.econStance, -10, 10);

}