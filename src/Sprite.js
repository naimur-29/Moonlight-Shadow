class Sprite {
  constructor({ img, pos, vel, alpha = 1, sprites }) {
    this.image = img;
    this.pos = { ...pos };
    this.vel = { ...vel };
    this.alpha = alpha;
    this.sprites = { ...sprites };
  }

  draw() {
    c.globalAlpha = this.alpha;
    c.drawImage(
      this.image,
      this.pos.x, // x-crop
      this.pos.y // y-crop
    );
    c.globalAlpha = 1;
  }
}
