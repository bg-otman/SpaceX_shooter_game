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

    if (this.enemyPlayerCollision()) {
      this.markedForDeletion = true;
    }
  }
  ///
  draw(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  ///
  enemyPlayerCollision() {
    return (
      this.y + this.height > this.game.player.y &&
      this.y < this.game.player.y + this.game.player.height &&
      this.x + this.width >= this.game.player.x &&
      this.x < this.game.player.x + this.game.player.width
    );
  }
}
