export class Shots {
  constructor(game, x, y) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.markedForDeletion = false;
  }
  update() {
    this.y -= this.speed;

    if (this.y + this.height < 0) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export class EnemyShots {
  constructor(game, x, y) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.speed = 2;
    this.markedForDeletion = false;
  }
  update() {
    this.y += this.speed;

    if (this.y > this.game.gameHeight) {
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
