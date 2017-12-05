export default class Character extends Phaser.Sprite{

    constructor(game,x,y,asset,frame) {
	super(game,x,y,asset,frame);

	this.game = game;

	this.anchor.setTo(0.5);

	this.game.physics.arcade.enable(this);
	this.body.setSize(16,64,0,0); //Trim the collision box

	this.enableBody = true;
    }
    
}
