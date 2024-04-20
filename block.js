class Block {
	x = 0;
	y = 0;
	color = '⬜';
	falling = true;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	fall() {
		if(this.falling) {
			this.y++
		}
	}
}

module.exports = Block