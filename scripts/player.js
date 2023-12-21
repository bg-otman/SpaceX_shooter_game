export class Player {
  constructor(game, gameWidth, gameHeight) {
    this.game = game;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 170;
    this.height = 105;
    this.x = 240;
    this.y = 450;
    this.speedX = 0;
    this.speedY = 0;
    this.playerImage = document.getElementById("player");
    this.health = 300;
    this.playerDead = false;
  }
  update(inputs) {
    // horizontal movement
    this.x += this.speedX;
    // hr boundries
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > this.gameWidth) {
      this.x = this.gameWidth - this.width;
    }
    // vertical movement
    this.y += this.speedY;
    // vr boundries
    if (this.y < 0) {
      this.y = 0;
    } else if (this.y + this.height > this.gameHeight) {
      this.y = this.gameHeight - this.height;
    }
    // controls
    if (inputs.keys.includes("ArrowRight")) {
      this.speedX = 5;
    } else if (inputs.keys.includes("ArrowLeft")) {
      this.speedX = -5;
    } else if (inputs.keys.includes("ArrowUp")) {
      this.speedY = -5;
    } else if (inputs.keys.includes("ArrowDown")) {
      this.speedY = 5;
    } else {
      this.speedX = 0;
      this.speedY = 0;
    }
    ////
    if (this.health <= 0) this.playerDead = true;
  }
  draw(ctx) {
    if (!this.playerDead) {
      ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }
  }
}
