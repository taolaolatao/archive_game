document.addEventListener('DOMContentLoaded', function () {
	'use stricts';

	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const box = 32;
	let snake = [];
	let direction = '';
	let score = 0;
	snake[0] = { x: 9 * box, y: 10 * box };
	let food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box,
	};

	// Load Image
	const foodImg = new Image();
	foodImg.src = 'food.png';

	const groundImg = new Image();
	groundImg.src = 'ground.png';

	// Load Audio
	const dead = new Audio();
	const eat = new Audio();
	const down = new Audio();
	const up = new Audio();
	const left = new Audio();
	const right = new Audio();

	dead.src = 'audio/dead.mp3';
	eat.src = 'audio/eat.mp3';
	down.src = 'audio/down.mp3';
	up.src = 'audio/up.mp3';
	left.src = 'audio/left.mp3';
	right.src = 'audio/right.mp3';

	function collision(newHead, snake) {
		for (let i = 0; i < snake.length; i++) {
			if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
				return true;
			}
		}
		return false;
	}

	function draw() {
		ctx.drawImage(groundImg, 0, 0);
		for (let i = 0; i < snake.length; i++) {
			ctx.fillStyle = i == 0 ? 'green' : 'white';
			ctx.fillRect(snake[i].x, snake[i].y, box, box);
		}
		ctx.drawImage(foodImg, food.x, food.y);

		let snakeX = snake[0].x;
		let snakeY = snake[0].y;

		// which direction
		if (direction == 'LEFT') snakeX -= box;
		if (direction == 'UP') snakeY -= box;
		if (direction == 'RIGHT') snakeX += box;
		if (direction == 'DOWN') snakeY += box;

		if (snakeX === food.x && snakeY === food.y) {
			score++;
			eat.play();
			food = {
				x: Math.floor(Math.random() * 17 + 1) * box,
				y: Math.floor(Math.random() * 15 + 3) * box,
			};
		} else {
			// remove old head
			snake.pop();
		}

		// Add new head
		const newHead = {
			x: snakeX,
			y: snakeY,
		};
		console.log(snake);

		if (
			snakeX < box ||
			snakeX > 17 * box ||
			snakeY < 3 * box ||
			snakeY > 17 * box ||
			collision(newHead, snake)
		) {
			dead.play();
			clearInterval(game);
			document.getElementById('score').textContent = score;
			$('#game-over-modal').modal('show');
		}
		snake.unshift(newHead);

		ctx.fillStyle = 'white';
		ctx.font = '45px Arial';
		ctx.fillText(score, 2.3 * box, 1.6 * box);
	}

	let game = setInterval(draw, 100);

	document.addEventListener('keydown', (e) => {
		switch (true) {
			case e.keyCode === 38 && direction !== 'DOWN':
				direction = 'UP';
				// up.play();
				break;
			case e.keyCode === 40 && direction !== 'UP':
				direction = 'DOWN';
				// down.play();
				break;
			case e.keyCode === 37 && direction !== 'RIGHT':
				direction = 'LEFT';
				// left.play();
				break;
			case e.keyCode === 39 && direction !== 'LEFT':
				direction = 'RIGHT';
				// right.play();
				break;
		}
	});

	$('#btn-reset').click(() => {
		window.location.reload();
	});
});
