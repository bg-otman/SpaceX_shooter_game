export class Background {
  constructor(game, gameWidth, gameHeight) {
    this.game = game;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.x = 0;
    this.y = 0;
    this.starsY = 0;
    this.background = document.getElementById("pink-bg");
    this.stars = document.getElementById("stars-bg");
  }
  update() {
    this.starsY++;
    if (this.starsY > this.gameHeight) this.starsY = 0;
  }
  draw(ctx) {
    // fixed background
    ctx.drawImage(
      this.background,
      this.x,
      this.y,
      this.gameWidth,
      this.gameHeight
    );
    // first stars bg
    ctx.drawImage(
      this.stars,
      this.x,
      this.starsY,
      this.gameWidth,
      this.gameHeight
    );
    // second stars bg to create illusion of movement
    ctx.drawImage(
      this.stars,
      this.x,
      this.starsY - this.gameHeight,
      this.gameWidth,
      this.gameHeight
    );
  }
}
