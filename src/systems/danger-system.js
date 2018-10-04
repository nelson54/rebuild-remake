const SystemInterface = require('./system-interface');

const FULL_DANGER_THRESHOLD = 30;

module.exports = class DangerSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        tile.properties.danger = (tile.properties.zombies / FULL_DANGER_THRESHOLD);
    }
};