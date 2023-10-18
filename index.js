document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird");
    const gameBoard = document.querySelector(".game-container");
    const ground = document.querySelector(".ground");
    const scoreDiv = document.querySelector(".score");
    const game_over = document.querySelector(".gameOver");
    scoreDiv.innerHTML = "SCORE : " + 0;

    let birdBottom = 100;
    let birdLeft = 220;
    let gravity = 2;
    let isGameOver = false;
    let gap = 420 ;
    let score = 0;

    const startGame = () => {
    
        if(birdBottom > 0){
        birdBottom -= gravity
        bird.style.bottom = birdBottom + "px";
        bird.style.left = birdLeft + "px";
        }
    }

    const increaseScore = () => {
      score++;
      scoreDiv.innerHTML = "SCORE : " + score;
      console.log(score);
    }

    const scoreInterval = setInterval(increaseScore, 1000);

    const gameTimerId = setInterval(() => startGame(),20);

    const jumpControl = (e) => {
      if(e.keyCode === 32) jump();
    }

    const jump = () => {
        if(birdBottom < 455) {
       birdBottom += 35;
       bird.style.bottom = birdBottom + "px";
        }
    }

    document.addEventListener('keyup', jumpControl);

    const generateObstacles = () => {
      let obstacleLeft = 500;
      let randomNumber = Math.random() * 60;
      let obstacleBottom = randomNumber;
      const obstacle = document.createElement('div');
      const topObstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      topObstacle.classList.add('topObstacle');
      gameBoard.appendChild(obstacle);
      gameBoard.appendChild(topObstacle);
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";
      obstacle.style.bottom = obstacleBottom + "px";
      topObstacle.style.bottom = obstacleBottom + gap + "px";

      const moveObstacle = () => {
        if(obstacleLeft > -60 && !isGameOver) {
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";
        }
        else {
          clearTimeout(generateObstacleTimeout);
          clearInterval(moveObstacleTimerId);
          gameBoard.removeChild(obstacle);
          gameBoard.removeChild(topObstacle);
        }
        if(birdBottom === 26 || (obstacleLeft > 160 && obstacleLeft < 280 && (birdBottom < obstacle.offsetHeight + randomNumber - ground.offsetHeight
          || birdBottom > gap + obstacleBottom - ground.offsetHeight - bird.offsetHeight))){
          gameOver();
        }
      }
      const moveObstacleTimerId = setInterval(moveObstacle,20);
      const generateObstacleTimeout = setTimeout(generateObstacles, 2500);
    } 
    generateObstacles();

    const gameOver = () => {
      isGameOver = true;
      clearInterval(gameTimerId);
      clearInterval(scoreInterval);
      game_over.innerHTML = 'Game Over';
      document.removeEventListener('keyup', jumpControl);
    }
})