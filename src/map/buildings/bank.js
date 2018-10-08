const BaseBuilding = require('./base-building');

module.exports = class Bank extends BaseBuilding {

    constructor() {
        super();

        this.image = 'bank';
    }
};