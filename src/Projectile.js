class Projectile {
  constructor(pos, radius, color, velocity) {
    this.pos = { ...pos };
    this.radius = radius;
    this.color = color;
    this.velocity = { ...velocity };
  }

  show() {
    // instance color:
    c.fillStyle = this.color;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }

  update() {
    // update position:
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    // redraw the instance:
    this.show();
  }
}
