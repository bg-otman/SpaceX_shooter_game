import { Player } from "./player.js";
import { Inputs } from "./inputs.js";
import { Background } from "./background.js";
import { Shots } from "./shots.js";
import { Enemy } from "./enemies.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 650;

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.player = new Player(this, this.gameWidth, this.gameHeight);
    this.background = new Background(this, this.gameWidth, this.gameHeight);
    this.shots = [];
    this.shotTimer = 0;
    this.enemies = [];
    this.enemiesInterval = 3500;
    this.enemiesTimer = 0;
  }
  update(inputs, deltaTime) {
    this.background.update();
    this.player.update(inputs);
    // player shoot
    if (inputs.shot === " " && this.shotTimer > 15) {
      this.shots.push(
        new Shots(this, this.player.x + this.player.width * 0.45, this.player.y)
      );
      this.shotTimer = 0;
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
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      }
      enemy.update();
    });
    this.addEnemy(deltaTime);
  }
  ///
  draw(ctx) {
    this.background.draw(ctx);
    this.player.draw(ctx);
    this.shots.forEach((shot) => shot.draw(ctx));
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
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
}

const inputs = new Inputs();
const game = new Game(canvas.width, canvas.height);

let lastStamp = 0;
function animate(timeStamp) {
  const deltaTime = timeStamp - lastStamp;
  lastStamp = timeStamp;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  game.update(inputs, deltaTime);
  game.draw(ctx);
  requestAnimationFrame(animate);
}
animate(0);
