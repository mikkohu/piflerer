import Character from './prefab/character';


export let isInElevator = (character) => {
    return 570 < character.x && character.x < 640;
}

export let isToLeftOf = (sprite1, sprite2) => {
    return sprite1.x < sprite2.x;
}

/**
Compare x-codrinates of comp1 and comp2
and return the one closer to the sprite
*/

export let getCloserOne = (sprite, comp1, comp2) => {
    let comp1Dist = Math.abs(comp1.x - sprite.x);
    let comp2Dist = Math.abs(comp2.x - sprite.x);

    if(comp1Dist < comp2Dist) {
	return comp1;
    } else {
	return comp2;
    }
}

export let getFloor = (sprite) => {
    if(191<=sprite.y&&sprite.y<=192) {
	return 4;

    } else if (351<=sprite.y && sprite.y<=352) {
	return 3;

    } else if (511<=sprite.y && sprite.y<=512) {
	return 2;

    } else if (671<=sprite.y && sprite.y<=672){
	return 1;
    }
    return 2;
}

export let getFloorButton = (group, floor, guard) => {
    let button1 = null;
    let button2 = null;
    console.log(guard.y);

    group.forEach((button) => {
	if(+button.floor === floor){
	    console.log('Found button on floor '+floor);
	    if(button1 === null) {
		button1 = button;
	    } else {
		button2 = button;
	    }
	}
    }, this);

    return getCloserOne(guard, button1, button2);
}
