export class Shots {
  constructor(game, x, y) {
    this.game = game;
    this.width = 30;
    this.height = 50;
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.markedForDeletion = false;
    this.greenLaser = document.getElementById("greenLaser");
  }
  update() {
    this.y -= this.speed;

    if (this.y + this.height < 0) {
      this.markedForDeletion = true;
      if (this.game.maxShots < 15) this.game.maxShots++;
    }

    // playerShot collision with enemy
    this.game.enemies.forEach((enemy) => {
      if (this.playerShotCollision(enemy)) {
        if (enemy.enemyHealth > 0) {
          enemy.enemyHealth--;
          this.markedForDeletion = true;
          // after the shot hit the enemy, recharge the bullets again
          if (this.game.maxShots < 15) this.game.maxShots++;
        } else {
          enemy.markedForDeletion = true;
          this.markedForDeletion = true;

          if (this.game.maxShots < 15) this.game.maxShots++;

          this.game.gameScore++;

          if (this.game.gameScore > this.game.bestScore) {
            this.game.bestScore = this.game.gameScore;
            localStorage.setItem(
              "bestScore",
              JSON.stringify(this.game.gameScore)
            );
          }
        }
      }
    });
  }

  draw(ctx) {
    ctx.drawImage(this.greenLaser, this.x, this.y, this.width, this.height);
  }

  playerShotCollision(enemy) {
    return (
      this.y + this.height > enemy.y &&
      this.y < enemy.y + enemy.height &&
      this.x + this.width >= enemy.x &&
      this.x < enemy.x + enemy.width
    );
  }
}

export class EnemyShots {
  constructor(game, x, y) {
    this.game = game;
    this.width = 30;
    this.height = 35;
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.markedForDeletion = false;
    this.redLaser = document.getElementById("redLaser");
  }
  update() {
    this.y += this.speed;

    if (this.y > this.game.gameHeight) {
      this.markedForDeletion = true;
    }

    // enemyShot collision with player
    if (this.enemyShotCollision()) {
      this.markedForDeletion = true;
      this.game.player.health -= 50;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.redLaser, this.x, this.y, this.width, this.height);
  }
  enemyShotCollision() {
    return (
      this.y + this.height > this.game.player.y &&
      this.y < this.game.player.y + this.game.player.height &&
      this.x + this.width >= this.game.player.x &&
      this.x < this.game.player.x + this.game.player.width
    );
  }
}
