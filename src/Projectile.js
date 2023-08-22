class Projectile {
  constructor({ pos, vel, radius }) {
    this.pos = { ...pos };
    this.vel = { ...vel };
    this.radius = radius;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.draw();
  }

  draw() {
    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = "#f00";
    c.fill();
    c.closePath();

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius * 2, 0, Math.PI * 2, false);
    c.fillStyle = "#f001";
    c.fill();
    c.closePath();
  }
}
