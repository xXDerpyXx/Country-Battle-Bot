module.exports = class Country {
	constructor(id, x, y, name) {
		
		this.name = name;
        this.id = id;

		this.econStance;
		this.polStance;

		this.government;
		this.economy = "capitalism"

		this.population;

		this.money = 0;
		this.inventory;

		this.x = x;
        this.y = y;

	}
}