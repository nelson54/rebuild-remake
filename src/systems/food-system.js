const SystemInterface = require('./system-interface');

/**
 * Handles food consumption and starvation.
 *
 * @type {module.SkillSystem}
 */
const MAX_STARVATION = 2;

module.exports = class FoodSystem extends SystemInterface {

    constructor() {
        super();
        this.cleanup();
    }

    processTile(tile) {
        if(tile.isCity) {
            this.foodProduction += tile.food;
        }
    }

    processGame(game) {

        game.food -= Math.floor(game.survivors.length * .66);

        if(game.food <= 0) {
            let starvationCount = Math.round(MAX_STARVATION * Math.random());

            for (let i = 0; i < starvationCount; i++) {
                game.survivors[Math.floor(game.survivors.length * Math.random())].isAlive = false;
            }

            game.food = 0;
        }

        game.food += this.foodProduction;
    }

    cleanup() {
        this.foodProduction = 0;
    }
};