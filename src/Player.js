class Player {
  constructor(pos, radius, color) {
    this.pos = { ...pos };
    this.radius = radius;
    this.color = color;

    this.stats = {
      projectileSpeed: 10,
      projectileCount: 1,
    };
  }

  show() {
    // instance color:
    c.fillStyle = this.color;

    c.beginPath();
    c.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  }
}
