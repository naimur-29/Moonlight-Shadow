class Player {
  constructor({ sprite, stats }) {
    this.sprite = sprite;
    this.stats = { ...stats };
  }

  draw() {
    this.sprite.draw();
  }
}
