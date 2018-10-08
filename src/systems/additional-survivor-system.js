const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .1;

/**
 * Automated survivor spawn when this system is running
 * @type {module.AdditionalSurvivorSystem}
 */
module.exports = class AdditionalSurvivorSystem extends SystemInterface {
    constructor() {
        super();

    }

    processGame(game) {
        if(Math.random() < SURVIVOR_SPAWN_RATE) {
            game.survivors.push(survivorGenerator())
        }
    }
};