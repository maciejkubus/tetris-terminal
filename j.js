const Block = require('./block')

function createJ(x, y) {
	const blocks = [
		new Block(x + 1, y),
		new Block(x + 1, y + 1),
		new Block(x + 1, y + 2),
		new Block(x, y + 2),
	]

	blocks.forEach(b => b.color = '🟪')

	return blocks
}

module.exports = createJ