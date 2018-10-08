const BaseBuilding = require('./base-building');

module.exports = class Laboratory extends BaseBuilding {

    constructor() {
        super();

        this.image = 'laboratory';
    }
};