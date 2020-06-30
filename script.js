let canvas  = document.getElementById("snake");
let p = document.getElementById("pont");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let pontuacao = 0;
let time = 200;
snake[0] = {
    x : 8 * box,
    y : 8 * box
}

let direction = "right";

function sortear() {
    return Math.floor(Math.random() * 15 + 1) * box;
}

let food = {
    x : sortear(),
    y : sortear()
}

function criarBG() {
    context.fillStyle = "Lightblue";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
    for(let i = 0; i < snake.length; i++ ){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down" ) direction = "up";
    if (event.keyCode == 39 && direction != "left" ) direction = "right";
    if (event.keyCode == 40 && direction != "up"   ) direction = "down";
}

document.addEventListener('keydown', update);

function iniciarJogo() {

    if (snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if (snake[0].y < 0 && direction == "up"  ) snake[0].y = 15 * box;
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].y > 15 * box && direction == "down" ) snake[0].y = 0;

    for(let i = 1 ; i < snake.length ; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert(`Game Over! Tente novamente. Você fez ${pontuacao} pontos`);
            document.location.reload(true);
        }
    }

    criarBG();
    criarSnake();
    criarFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "down") snakeY += box;
    if (direction == "up"  ) snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    else{
        food.x = sortear();
        food.y = sortear();
        ++pontuacao;
        p.innerHTML = pontuacao;
    }

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, time);
