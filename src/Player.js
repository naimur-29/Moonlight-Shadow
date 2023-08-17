class Player {
  constructor(x, y, radius, color) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
  }

  show() {
    c.beginPath();
    c.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
