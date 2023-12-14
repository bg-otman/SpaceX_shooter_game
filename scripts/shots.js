export class Shots {
  constructor(game) {
    this.game = game;
    this.width = 20;
    this.height = 20;
    this.x =
      this.game.player.x - this.width * 0.5 + this.game.player.width * 0.5;
    this.y = this.game.player.y;
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
