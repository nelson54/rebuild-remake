const EMOTICON_SIZE = 32;

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

        this.hasSupplyImage = new Image();
        this.hasSupplyImage.src = `/4x-game-library/images/has-apple.png`;

        this.hasPeopleImage = new Image();
        this.hasPeopleImage.src = `/4x-game-library/images/has-people.png`;

        this.context = canvas.getContext('2d');
    }

    static dangerToColor(danger) {
        if (danger > .9) {
            return 'rgba(175, 14, 0, .5)';
        } else if (danger > .8) {
                return 'rgba(175, 53, 152, .5)';
        } else if (danger > .7) {
            return 'rgba(207, 133, 59, .5)';
        } else if (danger > .5) {
            return 'rgba(207, 198, 53, .5)';
        } else if (danger > .2) {
            return 'rgba(0,   163, 74, .5)';
        } else if (danger > 0) {
            return 'rgba(3, 107, 163,  .5)';
        } else {

        }
    }

    drawScene() {
        let tileWidth = this.game.width / this.game.map.tiles.length,
            tileHeight = this.game.height / this.game.map.tiles[0].length;

        this.context.clearRect(0, 0, this.game.width, this.game.height);

        this.game.map.forEach((tile) => {
            let building = tile.building,
                x = tile.x * tileWidth,
                y = tile.y * tileHeight;

            if(building.redraw) {
                building.isLoaded = false;
                building.canvasImage = new Image();
                building.canvasImage.src = `/4x-game-library/images/${building.image}.png`;

                building.canvasImage.onload = ()=>{
                    building.isLoaded = true;

                    building.drawPosition = {
                        x: x + ( (tileWidth - EMOTICON_SIZE) / 2),
                        y: y + ( (tileHeight - EMOTICON_SIZE) / 2)
                    };
                };

                building.redraw = false;
            }

            if(!tile.isCity) {
                this.context.fillStyle = Renderer.dangerToColor(tile.properties.danger);
                this.context.fillRect(x, y, tileWidth, tileHeight);

            }

            if(building.isLoaded) {
                this.context.drawImage(building.canvasImage, building.drawPosition.x, building.drawPosition.y, EMOTICON_SIZE, EMOTICON_SIZE);

                if(tile.hasFood && !tile.isCity) {
                    this.context.drawImage(this.hasSupplyImage, building.drawPosition.x-6, building.drawPosition.y-3, 16, 16);
                }

                if(tile.hasPeople && !tile.isCity) {
                    this.context.drawImage(this.hasPeopleImage, building.drawPosition.x, building.drawPosition.y, 16, 16);
                }
            }

            if(!tile.isScouted) {
                this.context.fillStyle = 'rgb(0, 0, 0, .5)';
                this.context.fillRect(x, y, tileWidth, tileHeight);
            }
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