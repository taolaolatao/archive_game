document.addEventListener('DOMContentLoaded', (e) => {
	'use stricts';

	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const box = 32;
	let score = 0;
	let direction = '';
	let snake = [];
	snake[0] = { x: 9 * box, y: 10 * box };
	let food = {
		x: Math.floor(Math.random() * 17 + 1) * box,
		y: Math.floor(Math.random() * 15 + 3) * box,
	};

	const groundImg = new Image();
	const foodImg = new Image();
	groundImg.src = 'ground.png';
	foodImg.src = 'food.png';

	const dead = new Audio();
	const eat = new Audio();
	dead.src = 'audio/dead.mp3';
	eat.src = 'audio/eat.mp3';

	function collision(head, snakes) {
		for (let i = 0; i < snakes.length; i++) {
			if (head.x === snakes[i].x && head.y === snakes[i].y) {
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

		if (direction === 'DOWN') snakeY += box;
		if (direction === 'UP') snakeY -= box;
		if (direction === 'LEFT') snakeX -= box;
		if (direction === 'RIGHT') snakeX += box;

		if (food.x === snakeX && food.y === snakeY) {
			score++;
			eat.play();
			food = {
				x: Math.floor(Math.random() * 17 + 1) * box,
				y: Math.floor(Math.random() * 15 + 3) * box,
			};
		} else {
			// Remove old Head
			snake.pop();
		}

		// Add new head
		const newHead = {
			x: snakeX,
			y: snakeY,
		};

		if (
			snakeX < box ||
			snakeX > 17 * box ||
			snakeY < 3 * box ||
			snakeY > 17 * box ||
			collision(newHead, snake)
		) {
			dead.play();
			clearInterval(game);
			$('#score').text(score);
			$('#game-over-modal').modal('show');
		}

		snake.unshift(newHead);
		console.log(snake);

		ctx.fillStyle = 'white';
		ctx.font = '45px Arial';
		ctx.fillText(score, 2.3 * box, 1.6 * box);
	}

	let game = setInterval(draw, 100);

	document.addEventListener('keydown', (e) => {
		switch (true) {
			case e.keyCode === 38 && direction !== 'DOWN':
				direction = 'UP';
				break;
			case e.keyCode === 40 && direction !== 'UP':
				direction = 'DOWN';
				break;
			case e.keyCode === 37 && direction !== 'RIGHT':
				direction = 'LEFT';
				break;
			case e.keyCode === 39 && direction !== 'LEFT':
				direction = 'RIGHT';
				break;
		}
	});

	$('#btn-reset').click(() => {
		window.location.reload();
	});
});
