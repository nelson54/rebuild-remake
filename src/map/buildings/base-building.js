module.exports = class BaseBuilding {
    constructor(tile, survivors, food) {
        this.tile = tile;
        this.survivors = survivors;
        this.food = food;
    }

    get additionalHousing() {
        return 0;
    }

    get foodProduction() {
        return 0;
    }

    get security() {
        return 0;
    }
};