import Player from '../prefab/player';
import Guard from '../prefab/guard';
import ElevatorButton from '../prefab/elevatorButton';
import Elevator from '../prefab/elevator'
import * as tilemap from '../tilemap';
import * as gameManager from '../gameManager';
let bgMusic;

let wallLayer;
let elevatorPitFloorLayer;
let scoreText;
const moveSpeed = 150;

export default class Play extends Phaser.State {
    create() {

	scoreText = this.game.add.text(10,10);

	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.sound.stopAll();

	this.game.stage.backgroundColor = '#787878'

	this.game.physics.arcade.gravity.y = 550;
	
	let map = this.add.tilemap('house');
	map.addTilesetImage('houseTiles');

	wallLayer = map.createLayer('floorAndWalls');
	wallLayer.resizeWorld();

	elevatorPitFloorLayer = map.createLayer('elevatorPitFloor');
	
	bgMusic = this.game.add.audio('bgMusic');
	bgMusic.loopFull();

	map.setCollision([68,128,188,248], true, wallLayer);
	map.setCollisionBetween(181, 185, true, wallLayer);

	map.setCollision([68,128,188,248], true, elevatorPitFloorLayer);
	map.setCollisionBetween(181, 185, true, elevatorPitFloorLayer);


	this.characters = this.game.add.group();

	this.lootables = this.game.add.group();

	this.guards = this.game.add.group();
	this.createLootables(map, this.lootables);

	let playerSpawn = tilemap.findObjectsFromLayer('Player', map, 'Player');

	this.player = new Player({
	    game: this.game,
	    x: playerSpawn[0].x,
	    y: playerSpawn[0].y,
	    asset: 'player',
	    frame: 1});

	this.characters.add(this.player);

	let elevatorButtons = tilemap.findObjectsFromLayer('elevatorButton', map, 'elevatorButtons');
	this.buttons = this.game.add.group();
	this.buttons.enableBody = true;
	for(let i = 0; i < elevatorButtons.length; i++) {
	    let button = elevatorButtons[i];
	    let newButton = new ElevatorButton({
		game: this.game,
		x: button.x,
		y: button.y,
		asset: 'elevatorButton',
		floor: button.properties['floor']});
	    this.buttons.add(newButton);
	    newButton.body.allowGravity = false;
	}

	let doorSpawns = tilemap.findObjectsFromLayer('door', map, 'doors');
	this.doors = this.game.add.group();
	this.doors.enableBody = true;

	for(let i = 0; i < doorSpawns.length; i++) {
	    let door = doorSpawns[i];	    
            let newDoor = new Phaser.Sprite(this.game, door.x, door.y, 'door');
	    this.doors.add(newDoor);
	    newDoor.body.allowGravity = false;
	}	
	

	this.elevator = new Elevator({
	    game:this.game,
	    floor: 1,
	    map: map});

	let guardSpawn = tilemap.findObjectsFromLayer('guard', map, 'guard');

	this.guards.add( new Guard ({
	    game: this.game,
	    x: guardSpawn[0].x,
	    y: guardSpawn[0].y,
	    asset: 'guard',
	    frame:1,
	    elevator: this.elevator,
	    elevatorButtons: this.buttons}));


	this.game.world.bringToTop(this.characters);
	this.game.world.bringToTop(this.guards);
	this.facingLeft = false;

	this.cursors = this.game.input.keyboard.createCursorKeys();
	this.interactKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.spacebardown = false;
    }

    update() {
	scoreText = "Score: "+this.player.lootAmount;
	
	this.game.physics.arcade.collide(this.player, wallLayer);
	this.game.physics.arcade.collide(this.player, this.elevator);

	if(this.game.physics.arcade.overlap(this.guards, this.player) && this.player.visible) {
	    this.state.start('GameOver')
	}

	if(this.elevator.currentFloor !== 1) {
	    this.game.physics.arcade.collide(this.player, elevatorPitFloorLayer);
	}


	this.game.physics.arcade.collide(this.guards, this.elevator);
	

	this.game.physics.arcade.overlap(this.player, this.lootables, this.loot, null, this);

	this.guards.forEach((guard) => {
	    if(guard.task == guard.patrolFloorRight) {
		this.game.physics.arcade.collide(guard, elevatorPitFloorLayer);
	    }
	    if(guard.task != guard.waitInElevator) {
		this.game.physics.arcade.collide(this.guards, wallLayer);
	    }
	    guard.body.velocity.x = 0;
	    guard.update()}, this)

	if(this.interactKey.isDown && !this.spacebardown) {
	    this.spacebardown = true;
	    this.game.physics.arcade.overlap(this.buttons, this.player, this.callElevator, null, this);

	    if(!this.player.visible) {
		this.player.visible = true;

		this.characters.add(this.player);
	    } else {
		this.game.physics.arcade.overlap(this.doors, this.player, this.hideInCloset, null, this);
	    }
	} else if ( !this.interactKey.isDown ) {
	    this.spacebardown = false;
	}

	if(this.elevatorUp) {
	    
	    this.elevator.y -= 0.1;
	}

	this.player.body.velocity.x = 0;

	let elevatorFloor = this.elevator.currentFloor();
	if (gameManager.isInElevator(this.player) &&
	   elevatorFloor > 0) {
	    if (this.cursors.down.isDown && this.elevator.floor > 1) {
		this.elevator.call(this.elevator.floor -1);
	    }

	    if (this.cursors.up.isDown && this.elevator.floor < 4) {
		this.elevator.call(this.elevator.floor +1);
	    }	    
	}

	if (this.cursors.left.isDown && this.player.visible) {
	    this.player.body.velocity.x = (moveSpeed-this.player.lootAmount)*-1;
	    if (!this.facingLeft) {
		this.player.scale.x *= -1;
		this.facingLeft = true;
	    }	    
	}

	if (this.cursors.right.isDown && this.player.visible) {
	    this.player.body.velocity.x = moveSpeed-this.player.lootAmount;
	    if (this.facingLeft) {
		this.player.scale.x *= -1;
		this.facingLeft = false;
	    }
	}


	if(this.player.body.velocity.x != 0) {
	    this.player.animations.play('walk');
	}
	else {
	    this.player.animations.play('idle');
	};				     
    }

    createLootables(map, group) {
	let lootables = tilemap.findObjectsFromLayer('lootable', map, 'loot');
	group.enableBody = true;

	for(let i = 0; i < lootables.length; i++) {
	    let lootable = lootables[i];
	    let newLootable = new Phaser.Sprite(this.game, lootable.x, lootable.y, lootable.name);
	    newLootable.name = lootable.name;
	    newLootable.enableBody = true;
	    newLootable.stolen = false;
	    group.add(newLootable);
	    newLootable.body.allowGravity = false;
	}
    }

    callElevator(player, button) {
	this.elevator.call(button.floor);
    }

    hideInCloset(player, door) {
	this.characters.remove(this.player);
	this.player.visible = false;
    }

    loot(player, lootable) {
	if(!lootable.stolen) {
	    lootable.loadTexture(lootable.name+'Stolen')
	    lootable.stolen = true;
	    this.player.lootAmount += 30;
	}		
    }
}

