export default class Preload extends Phaser.State {
    preload() {

	this.load.image('elevatorButton', 'img/elevatorButton.png');
	this.load.image('elevatorCeiling', 'img/elevatorCeiling.png');
	this.load.image('elevatorFloor', 'img/elevatorFloor.png');

	this.load.tilemap('house', 'tilemaps/house.json',
			  null, Phaser.Tilemap.TILED_JSON);
	this.load.image('houseTiles', 'img/tiles/houseTiles.png');

	this.load.image('table', 'img/table.png');
	this.load.image('tableStolen', 'img/tableStolen.png');

	this.load.image('title', 'img/title.png');
	this.load.image('gameOver', 'img/gameOver.png');
	
	this.load.image('painting', 'img/painting.png');
	this.load.image('paintingStolen', 'img/paintingStolen.png')
	this.load.image('door', 'img/door.png');

	this.load.atlasJSONArray('player','img/playerSprites.png','img/playerSprites.json');
	this.load.atlasJSONArray('guard', 'img/guardSprites.png', 'img/guardSprites.json');

	this.load.audio('bgMusic', 'audio/bgMusic.wav');
    }

    create() {
	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

	this.state.start('Title');
    }
}
