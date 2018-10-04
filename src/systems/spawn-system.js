const SystemInterface = require('./system-interface');

const ZOMBIE_SPAWN_RATE = 2;

/**
 * Spawns zombies at a random percentage of the ZOMBIE SPAWN RATE
 *
 * @type {module.SpawnSystem}
 */
module.exports = class SpawnSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        if(tile.isEdge()) {
            tile.properties.zombies += Math.floor(ZOMBIE_SPAWN_RATE * Math.random())
        }
    }
};