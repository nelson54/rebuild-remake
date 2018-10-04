class Sprite {

    /**
     * @param {Point} position
     * @param {Point} size
     * @param color
     */
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }
}

module.exports = Sprite;