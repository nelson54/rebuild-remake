const SystemInterface = require('./system-interface');

/**
 * Handles food consumption and starvation.
 *
 * @type {module.SkillSystem}
 */
const FOOD_REGENERATION = 5;
const MAX_STARVATION = 3;

module.exports = class FoodSystem extends SystemInterface {

    constructor() {
        super();
    }

    processGame(game) {

        game.food -= game.survivors.length;

        if(game.food <= 0) {
            let starvationCount = Math.round(MAX_STARVATION * Math.random());

            for (let i = 0; i < starvationCount; i++) {
                game.survivors[Math.floor(game.survivors.length * Math.random())].isAlive = false;
            }

            game.food = 0;
        }

        game.food += FOOD_REGENERATION;
    }
};