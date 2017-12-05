export default class ElevatorButton extends Phaser.Sprite{
    consturctor({game, x, y, asset, floor}){
	super(game,x,y,asset);

	thhis.anchor.setTo(0.5);
	this.floor = floor;
    }
}
