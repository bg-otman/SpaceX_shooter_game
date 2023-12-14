export class Inputs {
  constructor() {
    this.keys = [];
    this.shot = "";
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowUp") &&
        this.keys.indexOf(e.key) === -1 &&
        this.keys.length < 4
      ) {
        this.keys.push(e.key);
      }

      if (e.key === " ") {
        this.shot = e.key;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowUp" ||
        e.key === "ArrowDown"
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }

      if (e.key === " ") {
        this.shot = "";
      }
    });
  }
}
