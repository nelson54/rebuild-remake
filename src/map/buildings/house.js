const BaseBuilding = require('./base-building');

module.exports = class House extends BaseBuilding {
    constructor() {
        super();

        this.image = 'house';
    }

    get housing() {
        return 1;
    }
};