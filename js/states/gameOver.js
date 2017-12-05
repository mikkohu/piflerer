export default class GameOver extends Phaser.State {
    create() {
	this.game.add.image(0,0,'gameOver');

   	this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    update() {
	if(this.spacebar.isDown) {
	    this.state.start('Play');
	}
    }
}
