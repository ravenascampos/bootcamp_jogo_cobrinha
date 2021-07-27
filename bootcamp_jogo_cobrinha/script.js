//variáveis//

let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
//tamanho da box
let box = 32
//posição da snake
let snake = [] //snake como lista
snake[0] = {
  //posição no box
  x: 8 * box,
  y: 8 * box
}

//movimento da snake
let direction = 'right'

//variáveis da comida
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

//funções de desenho
//função criar background
function creatBG() {
  context.fillStyle = 'black'
  context.fillRect(0, 0, 16 * box, 16 * box) //cor //desenha a caixa (x, y, altura, largura)
}

//cobrinha
function creatSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'lightgreen'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}
//comida da cobrinha
function drawFood() {
  context.fillStyle = 'pink'
  context.fillRect(food.x, food.y, box, box)
}

//evento de tecla
document.addEventListener('keydown', update)
//argumento do evento de tecla
function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left' //se o botão for 37 e não for rigth, muda pra left
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

//função para inciar o jogo
function startGame() {
  //ultrapassar os limites da parede
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  //fim de jogo
  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(game)
      alert('Game Over')
    }
  }

  creatBG()
  creatSnake()
  drawFood()

  //posição da snake ao iniciar o jogo
  let snakeX = snake[0].x
  let snakeY = snake[0].y

  //coornadas da cobrinha
  if (direction == 'right') snakeX += box //aumenta um box
  if (direction == 'left') snakeX -= box //diminui uma box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  //aumentar o tamanho da cobrinha
  if (snakeX != food.x || snakeY != food.y) {
    snake.pop() //para retirar o ultimo elemento da snake
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
  }

  //para acrescentar um elemento na frente - cabeça da snake
  let newHead = {
    x: snakeX,
    y: snakeY
  }
  //função que cria a cabeça
  snake.unshift(newHead)
}

//variável para atualizar o jogo a cada 100 milisegundos
let game = setInterval(startGame, 100)
