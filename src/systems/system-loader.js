const DangerSystem = require('./danger-system');
const MacroDangerSystem = require('./macro-danger-system');
const SpawnSystem = require('./spawn-system');
const ZombieMovementSystem = require('./zombie-movement-system');
const ZombieDeathSystem = require('./zombie-death-system');
const SkillSystem = require('./skill-system');
const AdditionalSurvivorSystem = require('./additional-survivor-system');
const FoodSystem = require('./food-system');
const DeathSystem = require('./death-system');
const SurvivorInfoSystem = require('./survivor-info-system');
/**
 * Prepares game systems
 *
 * @type {module.SystemLoader}
 */
module.exports = class SystemLoader {

    static create() {
        return new SystemLoader();
    }

    // TODO need to add a lifecycle system some lifecycles need to be updated during player phase like calculating the macro danger as survivors are reassigned tasks
    loadSystems() {
        return [
            // START OF TURN PHASE
            new SpawnSystem(),
            new DangerSystem(),
            new MacroDangerSystem(),

            // PLAYER PHASE

            // END OF TURN PHASE
            new ZombieDeathSystem(),
            new ZombieMovementSystem(),
            new SkillSystem(),

            new FoodSystem(),
            new DeathSystem(),
            new AdditionalSurvivorSystem(),

            new SurvivorInfoSystem()
        ]
    }
};