const BaseBuilding = require('./base-building');

module.exports = class House extends BaseBuilding {
    constructor() {
        super();

        this.image = 'apartment';
    }

    get housing() {
        return 2;
    }
};