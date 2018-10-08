module.exports = class BaseBuilding {
    constructor(tile) {
        this.tile = tile;

        this.image = 'unknown';
        this.redraw = true;
    }

    get housing() {
        return 0;
    }

    get food() {
        return 0;
    }

    get defense() {
        return 0;
    }
}



;