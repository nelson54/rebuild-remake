const BaseBuilding = require('./base-building');

module.exports = class GasStation extends BaseBuilding {
    constructor() {
        super();

        this.image = 'hospital';
    }
};