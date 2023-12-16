import { EnemyShots } from "./shots.js";

export class Enemy {
  constructor(game, gameWidth, gameHeight) {
    this.game = game;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 60;
    this.height = 60;
    this.x = Math.random() * (this.gameWidth - this.width);
    this.y = -this.height;
    this.imageEnemy = "";
    this.speed = 1;
    this.markedForDeletion = false;
    this.dx = Math.ceil(Math.random() * 2);
    this.enemyShotFrame = 5;
    this.enemyShotTimer = 0;
    this.shotInterval = 500;
    this.enemyShots = [];
  }
  update() {
    // vertical mouvement
    this.y += this.speed;
    if (this.y > this.gameHeight) {
      this.markedForDeletion = true;
    }
    // horizontal mouvement
    if (this.x + this.width > this.gameWidth || this.x < 0) {
      this.dx = -this.dx;
    }
    this.x += Math.floor(Math.random() * 2 - this.dx);

    // enemy shots
    this.enemyShotTimer += this.enemyShotFrame;

    if (this.enemyShotTimer > this.shotInterval) {
      this.enemyShots.push(
        new EnemyShots(
          this.game,
          this.x + this.width * 0.5,
          this.y + this.height
        )
      );
      this.enemyShotTimer = 0;
    }

    // Update and remove shots
    this.enemyShots.forEach((shot) => {
      shot.update();
      if (shot.markedForDeletion) {
        this.enemyShots.splice(this.enemyShots.indexOf(shot), 1);
      }
    });

    // enemy-player collision
    if (
      this.y + this.height > this.game.player.y &&
      this.y < this.game.player.y + this.game.player.height &&
      this.x + this.width >= this.game.player.x &&
      this.x < this.game.player.x + this.game.player.width
    ) {
      this.markedForDeletion = true;
    }
  }
  ///
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // Draw shots
    this.enemyShots.forEach((shot) => shot.draw(ctx));
  }
}
