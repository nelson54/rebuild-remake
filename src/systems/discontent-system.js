const SystemInterface = require('./system-interface');

/**
 * Cleans up dead survivors from survivor list when deceased.
 *
 * @type {module.SkillSystem}
 */

module.exports = class DiscontentSystem extends SystemInterface {

    constructor() {
        super();
    }

    processGame(game) {
        game.survivors = game.survivors.filter((survivor)=> {
            if(survivor.isAlive) {
                return true;
            } else {
                game.deadSurvivors.push(survivor);
                return false;
            }
        })
    }
};