const Block = require('./block')

function createS(x, y) {
	const blocks = [
		new Block(x + 1, y),
		new Block(x + 2, y),
		new Block(x, y + 1),
		new Block(x + 1, y + 1),
	]

	blocks.forEach(b => b.color = '🟥')

	return blocks
}

module.exports = createS