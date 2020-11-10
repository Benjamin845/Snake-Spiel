let boardWidth = 20;
let boardHeight = 20;
let size = 15;
let snakePos = [{ x: 5, y: 5 }];
let snakeLength = 3;
let applePosX = 0;
let applePosY = 0;
let dirX = 1;
let dirY = 0;
let points = 0;
let speed = 3;
let backgroundColor = 'lightgray';
this.focus();
function setup() {
  createCanvas(boardWidth * size, boardHeight * (size + 1));
  background(backgroundColor);
  noStroke();
  frameRate(speed);
  drawApple();
}

function draw() {
  if (snakePos.length >= snakeLength) {
    fill(backgroundColor);
    rect(snakePos[0].x * size, snakePos[0].y * size, size, size);
    snakePos.shift();
  }


  let posX = snakePos[snakePos.length - 1].x + dirX;
  let posY = snakePos[snakePos.length - 1].y + dirY;


  if (posX < 0 || posX >= boardWidth|| posY < 0 || posY >= boardHeight) {
    background('red');
    return;
  }
  

  for (let i = 0; i < snakePos.length; i++) {
    if (snakePos[i].x === posX && snakePos[i].y === posY) {
      background('fuchsia');
      return;
    }
  }


  if (posX === applePosX && posY === applePosY) {
    // Punkte erhöhen
    points++;
    

    if (speed < 20) {
      speed++;
      frameRate(speed);
    }
    

    drawApple();
    snakeLength++;
  }


  fill('green');
  rect(posX * size, posY * size, size, size);
  snakePos.push({ x: posX, y: posY });
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    dirX = -1;
    dirY = 0;
  } else if (keyCode === RIGHT_ARROW) {
    dirX = 1;
    dirY = 0;
  } else if (keyCode === UP_ARROW) {
    dirX = 0;
    dirY = -1;
  } else if (keyCode === DOWN_ARROW) {
    dirX = 0;
    dirY = 1;
  }
}

function drawApple() {
 
  applePosX = Math.round(Math.random() * (boardWidth - 1));
  applePosY = Math.round(Math.random() * (boardHeight - 1));

 
  fill('red');
  ellipse(applePosX * size + size / 2, applePosY * size + size / 2, size);
  
 
  fill('gray');
  rect(0, boardHeight * size, boardWidth * size, size + 5);
  fill('white');
  textSize(size - 5);
  text('Points: ' + points.toString(), size, boardHeight * (size + 1) - 5);
}
