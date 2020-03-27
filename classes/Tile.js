module.exports = class Tile {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.elevation = 10;
        this.building = null;
    }
}