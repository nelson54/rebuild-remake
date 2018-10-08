const Point = require('../point');

const STARTING_ZOMBIE_RATE = 5;

module.exports = class Tile {

    /**
     * @param {Game} game
     * @param {Point} position
     */
    constructor(game, position, map) {
        this.id = game.seededRandom.guid();
        this.game = game;
        this.position = position;
        this.properties = {zombies: STARTING_ZOMBIE_RATE};
        this.map = map;
        this.isCity = false;
        this.isScouted = false;
    }

    get x() {
        return this.position.x;
    }

    set x(x) {
        this.position.x = x;
    }

    get y() {
        return this.position.y;
    }

    set y(y) {
        this.position.y = y;
    }

    get food() {
        return this.building.food;
    }

    setBuilding(building) {
        this.building = building;
    }

    hasBuilding() {
        return !!this.building;
    }

    isEdge() {
        return (this.x === 0) ||
            (this.y === 0) ||
            (this.x === (this.game.map.size.x - 1)) ||
            (this.y === (this.game.map.size.x - 1));
    }
};