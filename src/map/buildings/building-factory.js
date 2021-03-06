const Farm = require('./farm'),
    GasStation = require('./gas-station'),
    Hospital = require('./hospital'),
    House = require('./house'),
    PoliceStation = require('./police-station'),
    Laboratory = require('./laboratory'),
    Bank = require('./bank'),
    TradeSchool = require('./trade-school'),
    Apartment = require('./apartment')
;

let buildingConstructors = [
    Farm,
    GasStation,
    Hospital,
    House,
    PoliceStation,
    Laboratory,
    Bank,
    TradeSchool,
    Apartment
];

module.exports = class BuildingFactory {

    /**
     * @param {SeededRandom} seededRandom
     */
    constructor(seededRandom) {
        this.seededRandom = seededRandom;
    }

    pickConstructor() {
        return buildingConstructors[Math.floor(buildingConstructors.length * this.seededRandom.random())]
    }

    /**
     * @param {Tile} tile
     */
    createBuilding(tile, map) {
        console.log('dog');
        return new (this.pickConstructor())(tile, map);
    }
};