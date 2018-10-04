module.exports = class SystemInterface {


    constructor() {
        this.isGameSystem = true;
        this.isTileSystem = true;
    }

    /***
     * @param {Game} game
     */
    processGame(game) {

    }

    /***
     * @param {Tile} tile
     */
    processTile(tile) {

    }

    cleanup() {

    }
};