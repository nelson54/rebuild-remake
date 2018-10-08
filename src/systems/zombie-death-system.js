const SystemInterface = require('./system-interface');
const DEATH_RATE = .02;

/**
 *
 * @type {module.ZombieDeathSystem}
 */
module.exports = class ZombieDeathSystem extends SystemInterface {
    constructor() {
        super();
        this.isGameSystem = false;
    }

    processTile(tile) {
        let game = tile.game;
        if(!tile.isCity && tile.properties.zombies > 0) {
            let deathAmount = Math.round(tile.properties.zombies * (DEATH_RATE * game.seededRandom.random()));

            tile.properties.zombies -= deathAmount;
        }
    }
};

