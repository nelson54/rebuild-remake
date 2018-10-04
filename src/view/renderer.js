class Renderer {

    /**
     * @param {Game} game
     */
    constructor(game) {
        this.game = game;

        this.game = game;
        let canvas = this.canvas = document.createElement('canvas');
        canvas.width = game.width;
        canvas.height = game.height;
        document.body.appendChild(canvas);

        this.context = canvas.getContext('2d');
    }

    dangerToColor(danger) {
        if (danger > .7) {
            return '#af0e00';
        } else if (danger > .5) {
            return '#cf853b';
        } else if (danger > .2) {
            return '#cfc635';
        } else {
            return '#00a34a';
        }
    }

    drawScene() {
        let tileWidth = this.game.width / this.game.map.tiles.length,
            tileHeight = this.game.height / this.game.map.tiles[0].length;

        this.game.map.forEach((tile) => {
            if(tile.isCity) {
                this.context.fillStyle = '#fff';
            } else {
                this.context.fillStyle = this.dangerToColor(tile.properties.danger);
            }

            this.context.fillRect(tile.x * tileWidth, tile.y * tileHeight, tileWidth, tileHeight);
        });

        this.game.sprites.forEach((sprite) => {
            this.draw(sprite);
        });
    }

    /**
     * @param {Sprite} sprite
     */
    draw(sprite) {
        this.context.fillStyle = sprite.color;
        this.context.fillRect(sprite.position.x, sprite.position.y, sprite.size.x, sprite.size.y);
    }
}

module.exports = Renderer;