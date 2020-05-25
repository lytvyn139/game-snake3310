const canvas = document.getElementById("snake-field");
const context = canvas.getContext("2d");
const box = 30;
const ground = new Image();
let score = 0;
let direction = null;
ground.src = "img/bg.png";
let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box
};

let snakeBodyColor = ['yellow'];
let food = {
    x: Math.floor(Math.random() * 28+1) * box,
    y: Math.floor(Math.random() * 25+1) * box
};

movement = (event) => {
    let key = event.keyCode;
    if (key === 65 || key === 37 && direction != "RIGHT") {
        direction = "LEFT";
    } else if (key === 87 || key === 38 && direction != "DOWN") {
        direction = "UP";
    } else if (key === 68 || key === 39 && direction != "LEFT") {
        direction = "RIGHT";
    } else if (key === 83 || key === 40 && direction != "UP") {
        direction = "DOWN";
    }
}
document.addEventListener("keydown", movement);

collision = (head, array) => {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

drawFood = (xx, yy, w, h, color) => {
    context.fillStyle = color;
    context.fillRect(xx, yy, w, h);
}

drawAll = () => {
    context.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "black" : snakeBodyColor;
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = "black";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    drawFood(0, 0, 0, 0, "yellow");
    context.fillRect(food.x, food.y, box, box);
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // if the snake eats the food
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 28+1) * box,
            y: Math.floor(Math.random() * 25+1) * box,
        }
    } else {
        // remove the tail
        snake.pop();
    }
    // add new Head
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // game over
    if (snakeX < box || snakeX > 32 * box || snakeY < 1 * box || snakeY > 26 * box || collision(newHead, snake)) {
        clearInterval(game);
        alert('GAME OVER !')
    }
    snake.unshift(newHead);
    context.fillStyle = "black";
    context.font = "50px Terminal";
    context.fillText(score, 16.5 * box, 30 * box);
}

let game = setInterval(drawAll, 100);