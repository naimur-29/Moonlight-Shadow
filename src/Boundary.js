class Boundary {
  static width = 48;
  static height = 48;

  constructor({ pos }) {
    this.pos = { ...pos };
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "rgba(255, 100, 150)";
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
