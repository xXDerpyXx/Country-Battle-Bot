module.exports = class Person {

	constructor(id, x, y, culture, rand = Math) {
		var v = require.main.require('./vars.js');
    

		this.name = v.fn.randomName(culture, rand);
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