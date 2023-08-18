class Sprite {
  constructor({ img, frames = 1, pos, vel }) {
    this.image = img;
    this.framesPerImg = frames;
    this.pos = { ...pos };
    this.vel = { ...vel };
    this.image.onload = () => {
      this.width = this.image.width / this.framesPerImg;
      this.height = this.image.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      0, // x-crop
      0, // y-crop
      this.width, // crop width
      this.height, // crop height
      this.pos.x,
      this.pos.y,
      this.width, // image width
      this.height // image height
    );
  }
}
