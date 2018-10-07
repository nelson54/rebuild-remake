const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .15;

/**
 * @type {module.SurvivorInfoSystem}
 */
module.exports = class SurvivorInfoSystem extends SystemInterface {
    constructor() {
        super();

        this.survivorInfoContainer = document.createElement('div');
        this.survivorInfoContainer.setAttribute('id', 'survivor-info-container');
        document.body.appendChild(this.survivorInfoContainer);

    }

    processGame(game) {
        this.survivorInfoContainer.innerHTML = "" +
            `<div id="survivors">
                <h3>Survivors</h3>
                <ul>
                    ${game.survivors.map((survivor)=> SurvivorInfoSystem.survivorHtml(survivor)).join("\n")}
                </ul>
            </div>
            <div id="dead">
                <h3>Graveyard</h3>
                <ul>
                    ${game.deadSurvivors.map((survivor) => SurvivorInfoSystem.survivorHtml(survivor)).join("\\n")}
                </ul>
            </div>
            `;
    }

    /**
     *
     * @param {Survivor} survivor
     */
    static survivorHtml(survivor) {
        return "" +
            `<li>
                <img height="32" width="32" src="/rebuild-remake/public/images/${survivor.face}.png"
                <strong>${survivor.firstName} ${survivor.lastName}</strong>
            </li>
            `;
    }
};