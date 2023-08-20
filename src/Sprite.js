class Sprite {
  constructor({ img, pos, vel }) {
    this.image = img;
    this.pos = { ...pos };
    this.vel = { ...vel };
  }

  draw() {
    c.drawImage(
      this.image,
      this.pos.x, // x-crop
      this.pos.y // y-crop
    );
  }
}
