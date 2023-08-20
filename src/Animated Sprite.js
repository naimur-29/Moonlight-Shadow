class AnimatedSprite {
  constructor({ img, frames = { max: 1 }, pos, vel, sprites }) {
    this.image = img;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.pos = { ...pos };
    this.vel = { ...vel };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.isMoving = false;
    this.sprites = { ...sprites };
  }

  draw() {
    c.drawImage(
      this.image,
      this.frames.val * this.width, // x-crop
      0, // y-crop
      this.width, // crop width
      this.height, // crop height
      this.pos.x,
      this.pos.y,
      this.width, // image width
      this.height // image height
    );

    if (!this.isMoving) return;

    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) {
        this.frames.val++;
      } else {
        this.frames.val = 0;
      }
    }
  }
}
