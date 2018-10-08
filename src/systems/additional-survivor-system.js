const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .1;

/**
 * Automated survivor spawn when this system is running
 * @type {module.AdditionalSurvivorSystem}
 */
module.exports = class AdditionalSurvivorSystem extends SystemInterface {

    processGame(game) {
        let seededRandom = game.seededRandom;

        if(seededRandom.random() < SURVIVOR_SPAWN_RATE) {
            game.survivors.push(survivorGenerator(seededRandom))
        }
    }
};