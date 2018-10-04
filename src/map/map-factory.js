const Map = require('./map');
    Farm = require('./buildings/farm'),
    House = require('./buildings/house');

class MapFactory {
    /**
     * @param {buildings} configuration
     */
    constructor(configuration) {
        this.configuration = configuration;
    }

    static preConfiguredInstance() {
        return new MapFactory(require('../configuration/map-generator-configuration'));
    }

    /**
     * @param {Point} size
     * @return {Map}
     */
    buildMap(size) {

        let map = new Map(size);

        for(let buildingConfig in this.configuration.buildings) {

        }

        return map;
    }

    /**
     *
     * @param {type, priority, frequency, size, maxFood} buildingConfig
     */
    generateBuildings(buildingConfig) {

    }
}

module.exports = MapFactory;