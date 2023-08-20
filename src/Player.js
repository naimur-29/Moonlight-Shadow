class Player {
  constructor({ sprite, vel }) {
    this.sprite = sprite;
    this.vel = { ...vel };
  }

  draw() {
    this.sprite.draw();
  }
}
