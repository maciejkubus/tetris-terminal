const readline = require('readline')
const createO = require('./o')
const createI = require('./i')
const createJ = require('./j')
const createL = require('./l')
const createS = require('./s')
const createT = require('./t')
const createZ = require('./z')

let score = 0

const map = {
	width: 10,
	height: 16
}

let blocks = []

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const draw = () => {
	for(let y = 0; y <= map.height; y++) {
		let line = ""
		for(let x = 0; x <= map.width; x++) {
			const block = blocks.find(b => b.x == x && b.y == y);
			if(block) {
				line += block.color;
			}
			else {
				line += '⬛'
			}
		}
		console.log(line)
	}
	console.log('score: ' + score);
}

const create = (x, y) => {
	const r = random(0, 6);

	if(r == 0) return createI(x, y);
	if(r == 1) return createJ(x, y);
	if(r == 2) return createL(x, y);
	if(r == 3) return createO(x, y);
	if(r == 4) return createS(x, y);
	if(r == 5) return createT(x, y);
	if(r == 6) return createZ(x, y);
}

const die = () => {
	console.log('you lost')
	console.log('score: ' + score);
	process.exit()
}

const check = () => {
	for(let y = 0; y <= map.height; y++) {
		let points = 0
		let row = []
		
		for(let x = 0; x <= map.width; x++) {
			const block = blocks.find(b => b.x == x && b.y == y);
			if(block) {
				points++;
				row.push(block)
			}
		}

		if(points > 10) {
			score++
			row.forEach(b => b.y = map.height + 10)
			blocks.forEach(b => {
				if(b.y <= y) {
					b.y++
				}
			})
		}
	}

	blocks.forEach(b => {
		if(b.y == 0 && !b.falling) {
			die();
		}
	})
}

const another = () => {
	blocks.forEach(b => b.falling = false)
	check();

	blocks = [...blocks, ...create(4, -2)]
}

const fall = () => {
	blocks.forEach(b => b.fall())
}

const collide = () => {
	for (let i = 0; i < blocks.length; i++) {
		if(blocks[i].falling && blocks[i].y >= map.height) {
			return true;
		}

		for (let j = 0; j < blocks.length; j++) {
			if(
				blocks[i].falling && !blocks[j].falling && 
				blocks[i].x == blocks[j].x && blocks[i].y + 1 == blocks[j].y
			) {
				return true;
			} 
		}
	}
	return false;
}

const rotate = (n) => {
	let lowestX = map.width;
	let lowestY = map.height;

	blocks.forEach(b => {
		if(b.falling) {
			if(b.y < lowestY) lowestY = b.y
			if(b.x < lowestX) lowestX = b.x
		}
	})

	
	blocks.forEach(b => {
		if(b.falling) {
			const x = b.y - lowestY;
			const y = b.x - lowestX;
			b.y = (y * -n) + lowestY;
			b.x = (x * n) + lowestX;
		}
	})

}

const move = (x) => {
	blocks.forEach(b => {
		if(b.falling) {
			b.x += x
		}
	})
}

const align = () => {
	let x = 0;
	blocks.forEach(b => {
		if(b.x < 0) {
			x = 1
		}
		if(b.x > map.width) {
			x = -1
		}
	})
	move(x)
}

const update = () => {
	console.clear();
	align();
	
	if(collide()) {
		another()
	} else {
		fall();
	}

	draw();
}

const main = () => {
	readline.emitKeypressEvents(process.stdin);

	if (process.stdin.isTTY)
			process.stdin.setRawMode(true);

	process.stdin.on('keypress', (chunk, key) => {
		if(key.name == 'q') {
			process.exit()
		}
		if(key.name == 'right') {
			move(1)
		}
		if(key.name == 'left') {
			move(-1)
		}
		if(key.name == 'up') {
			rotate(1)
		}
		if(key.name == 'down') {
			rotate(-1)
		}
		align()
		
	});
	setInterval(update, 200)
	blocks = [...blocks, ...create(4, 0)]
}

main();