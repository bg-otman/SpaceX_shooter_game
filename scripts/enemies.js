export class Enemy {
  constructor(game, gameWidth, gameHeight) {
    this.game = game;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 171;
    this.height = 61;
    this.x = Math.random() * (this.gameWidth - this.width);
    this.y = -this.height;
    this.imageEnemy = document.getElementById("enemyOneImg");
    this.speed = 1;
    this.markedForDeletion = false;
    this.dx = Math.ceil(Math.random() * 2);
    this.enemyHealth = 2;
    this.healthBar = 100;
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
    ctx.drawImage(this.imageEnemy, this.x, this.y, this.width, this.height);
    this.enemyHealthBar(ctx);
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
  ///
  enemyHealthBar(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.x + this.width * 0.2,
      this.y + this.height + 10,
      this.healthBar,
      10
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.strokeRect(
      this.x + this.width * 0.2,
      this.y + this.height + 10,
      100,
      10
    );
    ctx.stroke();
  }
}
