const Block = require('./block')

function createZ(x, y) {
	const blocks = [
		new Block(x, y),
		new Block(x + 1, y),
		new Block(x + 1, y + 1),
		new Block(x + 2, y + 1),
	]

	blocks.forEach(b => b.color = '🟩')

	return blocks
}

module.exports = createZ