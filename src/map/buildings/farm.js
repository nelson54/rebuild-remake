const BaseBuilding = require('./base-building');

module.exports = class Farm extends BaseBuilding {

    constructor() {
        super();

        this.image = 'farm';
    }

    get food() {
        return 1;
    }
};