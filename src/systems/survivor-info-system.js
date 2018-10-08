const SystemInterface = require('./system-interface');
const survivorGenerator = require('../survivors/survivor-generator');

const SURVIVOR_SPAWN_RATE = .15;

/**
 * @type {module.SurvivorInfoSystem}
 */
module.exports = class SurvivorInfoSystem extends SystemInterface {
    constructor() {
        super();

        this.gameInfoContainer = document.createElement('div');
        this.gameInfoContainer.setAttribute('id', 'game-info-container');
        document.body.appendChild(this.gameInfoContainer);

        this.survivorInfoContainer = document.createElement('div');
        this.survivorInfoContainer.setAttribute('id', 'survivor-info-container');
        document.body.appendChild(this.survivorInfoContainer);

    }

    processGame(game) {

        this.addGameInfo(game);
        this.addSurvivorInfo(game);

    }

    addGameInfo(game) {

        let foodUsed = game.properties.foodDelta;

        let gameInfoInnerHtml = "" +
            `<div id="gameInfo">
                <h3>Game Info</h3>
                
                <p><strong>Turn: </strong> ${game.turns}</p>
                <p><strong>Food: </strong> ${game.food} (${foodUsed})</p>
                <p><strong>Defense from buildings: </strong> ${game.properties.buildingDefense}</p>
                <p><strong>Defense from survivors: </strong> ${game.properties.survivorDefense}</p>
                
                <p><strong>Total Defense: </strong> ${game.properties.buildingDefense + game.properties.survivorDefense}</p>
                
                
                <p><strong>Total Surrounding Zombies: </strong> ${game.properties.surroundingZombies}</p>
                
                <p><strong>Total Average Zombies: </strong> ${Number.parseFloat(game.properties.totalAverageZombies).toFixed(2)}</p>
                <p><strong>Total Danger Rating: </strong> ${Number.parseFloat(game.properties.dangerRating * 100).toFixed(2)}%</p>
            </div>
            <hr class='clear'>
            `;

        if(gameInfoInnerHtml !== this.gameInfoInnerHtmlPreviousHtml) {
            this.gameInfoContainer.innerHTML = this.gameInfoInnerHtmlPreviousHtml = gameInfoInnerHtml;
        }
    }


    addSurvivorInfo(game) {
        let survivorInfoInnerHtml = "" +
            `<div id="survivors">
                <h3>Survivors (${game.survivors.length})</h3>
                <ul>
                    ${game.survivors.map((survivor)=> SurvivorInfoSystem.survivorHtml(survivor)).join("\n")}
                </ul>
            </div>
            <div id="dead">
                <h3>Graveyard (${game.deadSurvivors.length})</h3>
                <ul>
                    ${game.deadSurvivors.map((survivor) => SurvivorInfoSystem.survivorHtml(survivor)).join("\n")}
                </ul>
            </div>
            `;

        if(survivorInfoInnerHtml !== this.survivorInfoInnerHtmlPreviousHtml) {
            this.survivorInfoContainer.innerHTML = this.survivorInfoInnerHtmlPreviousHtml = survivorInfoInnerHtml;
        }
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