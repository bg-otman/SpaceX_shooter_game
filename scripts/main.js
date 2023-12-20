import { Player } from "./player.js";
import { Inputs } from "./inputs.js";
import { Background } from "./background.js";
import { Shots, EnemyShots } from "./shots.js";
import { Enemy } from "./enemies.js";
import { playerHealth, score, shotsAmo, gameEnd, bestScore } from "./ui.js";
import { Boom } from "./explosion.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// music
const gameMusic = document.getElementById("music");
let musicOn = true;
const musicImgContainer = document.querySelector(".msc");
const musicIcon = document.getElementById("musicIcon");
const ICON_VOLUME_PATH = "../images/volume.png";
const ICON_MUTE_PATH = "../images/mute.png";

canvas.width = 700;
canvas.height = 650;

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(this, this.gameWidth, this.gameHeight);
    this.background = new Background(this, this.gameWidth, this.gameHeight);
    this.gameOver = false;
    this.gameScore = 0;
    this.bestScore = JSON.parse(localStorage.getItem("bestScore")) || 0;
    this.shots = [];
    this.enemies = [];
    this.enemyShots = [];
    this.explosions = [];
    this.maxShots = 15;
    this.shotTimer = 0;
    this.enemiesInterval = 3500;
    this.enemiesTimer = 0;
    this.enemyShotFrame = 5;
    this.enemyShotTimer = 0;
    this.shotInterval = 500;
  }
  update(inputs, deltaTime) {
    this.background.update();
    this.player.update(inputs);
    // player shoot
    if (
      inputs.shot === " " &&
      this.shotTimer > 15 &&
      this.shots.length < this.maxShots
    ) {
      this.shots.push(
        new Shots(
          this,
          this.player.x + this.player.width * 0.42,
          this.player.y - 30
        )
      );
      this.shotTimer = 0;
      this.maxShots--;
    } else {
      this.shotTimer++;
    }
    /// remove shots passed the screen from shots array
    this.shots.forEach((shot) => {
      if (shot.markedForDeletion) {
        this.shots.splice(this.shots.indexOf(shot), 1);
      }
    });
    this.shots.forEach((shot) => shot.update());

    // enemies
    this.enemies.forEach((enemy) => {
      if (enemy.markedForDeletion) {
        this.explosions.push(new Boom(this, enemy.x, enemy.y));
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
      enemy.update();
    });

    this.explosions.forEach((boom) => {
      boom.update(deltaTime);
      if (boom.markedForDeletion) {
        this.explosions.splice(this.explosions.indexOf(boom), 1);
      }
    });
    this.addEnemy(deltaTime);
    this.enemyShot();
    // game over
    if (this.player.playerDead) {
      this.explosions.push(
        new Boom(
          this,
          this.player.x + this.player.width * 0.5,
          this.player.y + this.player.height * 0.5
        )
      );
      this.gameOver = true;
    }
  }
  ///
  draw(ctx) {
    this.background.draw(ctx);
    playerHealth(ctx, this);
    this.player.draw(ctx);
    this.shots.forEach((shot) => shot.draw(ctx));
    this.enemies.forEach((enemy) => enemy.draw(ctx));
    this.enemyShots.forEach((shot) => shot.draw(ctx));
    this.explosions.forEach((boom) => boom.draw(ctx));
    score(ctx, this);
    bestScore(ctx, this);
    shotsAmo(ctx, this);
  }
  ///
  addEnemy(deltaTime) {
    if (this.enemiesTimer > this.enemiesInterval) {
      this.enemiesTimer = 0;
      this.enemies.push(new Enemy(this, this.gameWidth, this.gameHeight));
    } else {
      this.enemiesTimer += deltaTime;
    }
  }
  // I placed enemy shot here, to keeps the shots even the enemy is destroyed
  enemyShot() {
    this.enemyShotTimer += this.enemyShotFrame;

    if (this.enemyShotTimer > this.shotInterval) {
      this.enemies.forEach((e) => {
        this.enemyShots.push(
          new EnemyShots(this, e.x + e.width * 0.5, e.y + e.height)
        );
      });
      this.enemyShotTimer = 0;
    }
    // Update and remove shots
    this.enemyShots.forEach((shot) => {
      shot.update();
      if (shot.markedForDeletion) {
        this.enemyShots.splice(this.enemyShots.indexOf(shot), 1);
      }
    });
  }
}

const inputs = new Inputs();
const game = new Game(canvas.width, canvas.height);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && game.gameOver) {
    restartGame(game);
  }
});

let lastStamp = 0;
function animate(timeStamp) {
  const deltaTime = timeStamp - lastStamp;
  lastStamp = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(inputs, deltaTime);
  game.draw(ctx);
  gameLevels(game);
  if (!game.gameOver) {
    requestAnimationFrame(animate);
  } else {
    gameEnd(ctx, game);
  }
}
// start animate
document.getElementById("startBtn").addEventListener("click", () => {
  // hide start game page
  document.querySelector(".start_game").style.display = "none";
  controlMusic();
  animate(0);
});

function restartGame(game) {
  game.player = new Player(game, game.gameWidth, game.gameHeight);
  game.gameOver = false;
  game.gameScore = 0;
  game.bestScore = JSON.parse(localStorage.getItem("bestScore")) || 0;
  game.shots = [];
  game.enemies = [];
  game.enemyShots = [];
  game.explosions = [];
  game.maxShots = 15;
  game.shotTimer = 0;
  game.enemiesInterval = 3500;
  game.enemiesTimer = 0;
  game.enemyShotFrame = 5;
  game.enemyShotTimer = 0;
  game.shotInterval = 500;
  animate(0);
}

musicImgContainer.addEventListener("click", () => {
  musicOn = !musicOn;
  controlMusic();
});

gameMusic.addEventListener("ended", () => {
  controlMusic();
});

function controlMusic() {
  if (musicOn) {
    musicIcon.src = ICON_VOLUME_PATH;
    gameMusic.volume = 0.5;
    gameMusic.play();
  } else {
    musicIcon.src = ICON_MUTE_PATH;
    gameMusic.pause();
  }
}

function gameLevels(game) {
  if (game.gameScore > 99) {
    game.enemiesInterval = 2000;
  } else if (game.gameScore > 60) {
    game.enemiesInterval = 2500;
  } else if (game.gameScore > 30) {
    game.enemiesInterval = 3000;
  }
}
