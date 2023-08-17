const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// player:
const x = canvas.width / 2;
const y = canvas.height / 2;

const player = new Player(x, y, 30, "blue");

player.show();

// projectile:

addEventListener("click", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const projectile = new Projectile(x, y, 5, "yellowgreen", null);
  projectile.show();
});
