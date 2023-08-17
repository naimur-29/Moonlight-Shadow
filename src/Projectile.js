class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  show() {
    c.beginPath();
    c.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }
}
