const healthContainer = 300;
const scoreBoardImg = document.getElementById("scoreBoard");
const myFont = new FontFace("Arcade", "url(../arcade_font/ARCADE_N.TTF)");
document.fonts.add(myFont);

export function playerHealth(ctx, game) {
  const healthBarX = game.gameWidth * 0.5 - healthContainer * 0.5;
  const healthBarY = game.gameHeight - 40;

  game.enemies.forEach((enemy) => {
    if (enemy.enemyPlayerCollision()) {
      game.player.health -= 50;
    }
  });

  // Draw health
  ctx.fillStyle = "red";
  ctx.fillRect(healthBarX, healthBarY, game.player.health, 20);

  // Draw health bar container
  ctx.save();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.strokeRect(healthBarX, healthBarY, healthContainer, 20);
  ctx.restore();
}

export function score(ctx, game) {
  const boardPosY = scoreBoardImg.height / 2;
  const boardPosX = game.gameWidth;

  ctx.drawImage(scoreBoardImg, 350, 0, boardPosX / 1.3, boardPosY);
  ctx.save();
  ctx.font = "30px fantasy";
  ctx.fillStyle = "#10cad9";
  ctx.fillText("Score", boardPosX - 80, boardPosY + 30);
  ctx.restore();

  ///
  ctx.font = "30px fantasy";
  ctx.textAlign = "center";
  ctx.fillStyle = "#162997";
  ctx.fillText(game.gameScore, boardPosX - 81, boardPosY / 1.6);
}

export function shotsAmo(ctx, game) {
  ctx.font = "30px fantasy";
  ctx.textAlign = "center";
  ctx.fillStyle = "#f15a18";
  ctx.fillText(
    `Bullets: ${game.maxShots - 7}`,
    game.gameWidth - 100,
    game.gameHeight - 20
  );
}

export function gameEnd(ctx, game) {
  myFont.load().then(() => {
    ctx.save();
    ctx.font = "55px Arcade";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "white";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ee3434";
    ctx.fillText("Game Over!", game.gameWidth * 0.5, game.gameHeight * 0.4);
    ctx.font = "bold 20px Arcade";
    ctx.fillText(
      "Press Enter to Restart",
      game.gameWidth * 0.5,
      game.gameHeight * 0.5
    );
    ctx.restore();
  });
}

export function bestScore(ctx, game) {
  ctx.save();
  ctx.font = "28px fantasy";
  ctx.fillStyle = "#10cad9";
  ctx.fillText(`Best Score: ${game.bestScore}`, 90, game.gameHeight - 20);
  ctx.restore();
}
