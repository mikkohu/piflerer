import Character from './character';
import * as gameManager from '../gameManager'

const patrolTargetLeft = 170;
const patrolTargetRight = 1088;
export default class Guard extends Character{


    constructor({game,x,y,asset,frame, elevator, elevatorButtons}) {
	super(game,x,y,asset,frame);

	this.animations.add('walk', ['guardW001.png', 'guardW002.png', 'guardW003.png', 'guardW004.png', 'guardW005.png'], 15)
	this.animations.add('idle', ['guardI001.png', 'guardI002.png', 'guardI003.png', 'guardI004.png', 'guardI005.png', 'guardI006.png'], 10)
	this.facingLeft;

	this.elevator = elevator;
	this.elevatorButtons = elevatorButtons;

	this.targetFloor = 3;
	this.patrolUp = true;

	this.task = this.goAndPressButton;

	this.enableBody = true;
    }

    update() {
	this.task();

	if(this.body.velocity.x != 0) {
	    this.animations.play('walk');
	} else {
	    this.animations.play('idle');
	};
    }

    moveLeft() {
	this.body.velocity.x = -150;
	if(this.alarmed) {
	    this.body.velocity.x -= 100;
	}

	if(!this.facingLeft) {
	    this.scale.x *= -1;
	    this.facingLeft = true;
	}
    }

    moveRight() {
	this.body.velocity.x = 150;
	if(this.alarmed) {
	    this.body.velocity.x += 100;
	}

	if(this.facingLeft) {
	    this.scale.x *= -1;
	    this.facingLeft = false;
	}
    }

    goAndPressButton() {
	let floor = gameManager.getFloor(this);
	console.log(floor);
	let floorButton = gameManager.getFloorButton(this.elevatorButtons, floor, this);
	if(this.x > floorButton.x+5) {
	    this.moveLeft()
	}
	else if(this.x < floorButton.x-5) {
	    this.moveRight();
	} else {
	   this.elevator.call(floor);
	   this.task = this.waitForElevator;
	}
    }

    waitForElevator() {
	if(gameManager.getFloor(this) == this.elevator.currentFloor()) {
	    this.task = this.getToElevator;
	}
    }

    getToElevator() {
	if(this.x < 600) {
	    this.moveRight();
	} else if (this.x >605) {
	    this.moveLeft();
	} else {
	    console.log('in elevator')
	    this.elevator.call(this.targetFloor);
	    this.task = this.waitInElevator;
	}
    }

    waitInElevator() {
	console.log('waiting in elevator');
	if(this.elevator.currentFloor() == this.targetFloor) {
	    this.task = this.patrolFloorLeft;
	}
    }

    patrolFloorLeft() {
	console.log('patrol to the left');
	if(this.x > patrolTargetLeft) {
	    this.moveLeft();
	} else {
	    this.task = this.patrolFloorRight;
	}
    }

    patrolFloorRight() {
	if(this.x < patrolTargetRight) {
	    this.moveRight();
	} else {
	    let floor = gameManager.getFloor(this);
	    if(this.moveUp) {
		if(floor === 4) {
		    this.moveUp = false;
		    this.targetFloor = 3;
		} else {
		    this.targetFloor++;
		}
	    } else {
		if(floor === 1) {
		    this.moveUp = true;
		    this.targetFloor = 2;
		} else {
		    this.targetFloor--;
		}
	    }
	    this.task = this.goAndPressButton;
	}
    }
}
