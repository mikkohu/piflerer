import * as tilemap from '../tilemap'
const floor1 = 173;
const floor2 = 331;
const floor3 = 493;
const floor4 = 654;
export default class Elevator extends Phaser.Group{
    constructor({game, floor, map}) {
	super(game);
	this.game = game;

	this.worldY = floor1; //This is super dirty, find out a better way!
	let elevatorCeiling = tilemap.findObjectsFromLayer('ceiling', map, 'Elevator')[0];
	let elevatorFloor = tilemap.findObjectsFromLayer('floor', map, 'Elevator')[0];

	let ecSprite = new Phaser.Sprite(this.game, elevatorCeiling.x, elevatorCeiling.y, 'elevatorCeiling');
	let efSprite = new Phaser.Sprite(this.game, elevatorFloor.x, elevatorFloor.y, 'elevatorFloor');

	//ecSprite.anchor.setTo(0, 0.5);
	//efSprite.anchor.setTo(0, 0.5);

	this.game.physics.arcade.enable(ecSprite);
	this.game.physics.arcade.enable(efSprite);
	ecSprite.enableBody = true;
	efSprite.enableBody = true;
	this.enableBody = true;

	this.add(ecSprite);
	this.add(efSprite);
	
	ecSprite.body.allowGravity = false;
	efSprite.body.allowGravity = false;
	ecSprite.body.immovable = true;
	efSprite.body.immovable = true;

	this.moving = false;
	
	this.targetY = floor1;
	this.floor = 1;
    }

    update() {
	if(this.targetY < this.worldY) {
	    this.y += 1.0;
	    this.worldY -= 1.0;
	}

	if(this.targetY > this.worldY) {
	    this.y -= 1.0;
	    this.worldY += 1.0
	}	
    }

    currentFloor() {
	switch(this.worldY) {
	case floor1:
	    return 1;
	case floor2:
	    return 2;
	case floor3:
	    return 3;
	case floor4:
	    return 4;
	default:
	    return -1;
	}
    }

    call(floor) {
	console.log(floor);
	switch(+floor) {
	case 1:
	    console.log(floor);
	    this.targetY = floor1;
	    this.floor = +floor;
	    break;
	case 2:
	    console.log(floor);
	    this.targetY = floor2;
	    this.floor = +floor;
	    break;
	case 3:
	    console.log(floor);
	    this.targetY = floor3;
	    this.floor = +floor;
	    break;
	case 4:
	    console.log(floor);
	    this.targetY = floor4;
	    this.floor = +floor;
	    break;
	}
    }
}
