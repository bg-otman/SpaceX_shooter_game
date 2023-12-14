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
    if (this.shots.length === 0 && inputs.shot === " ") {
      this.shots.push(new Shots(this));
    } else if (inputs.shot === " " && this.shotTimer > 15) {
      this.shots.push(new Shots(this));
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

    this.enemiesShots(ctx);
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
  enemiesShots(ctx) {
    this.enemies.forEach((enemy) => {
      let shotPosX = enemy.x + enemy.width * 0.5 - enemy.shotWidth * 0.5;
      ctx.fillStyle = "green";
      if (enemy.y > 0) {
        ctx.fillRect(
          shotPosX,
          enemy.shotPosY,
          enemy.shotWidth,
          enemy.shotHeight
        );
      }
    });
  }
}

const inputs = new Inputs();
export const game = new Game(canvas.width, canvas.height);

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
