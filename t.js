const Block = require('./block')

function createT(x, y) {
	const blocks = [
		new Block(x, y),
		new Block(x + 1, y),
		new Block(x + 2, y),
		new Block(x + 1, y + 1),
	]

	blocks.forEach(b => b.color = '⬜')

	return blocks
}

module.exports = createT