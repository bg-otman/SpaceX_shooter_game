export class Boom {
  constructor(game, x, y) {
    this.game = game;
    this.explosionImage = document.getElementById("explosion");
    this.spriteWidth = 80;
    this.spriteHeight = 90;
    this.width = 80;
    this.height = 90;
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameInterval = 100;
    this.frameTimer = 0;
  }
  update(deltaTime) {
    // this when enemy destroyed, move boom down little to make moving illusion while explosion
    this.y += 0.2;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(ctx) {
    ctx.drawImage(
      this.explosionImage,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
