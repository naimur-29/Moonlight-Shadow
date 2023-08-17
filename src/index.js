const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  window.location.reload();
});

// global functions:
function getPercentage(original, percent) {
  return (original * percent) / 100;
}

// player:
const playerInitPos = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};

const player = new Player(
  playerInitPos,
  ((canvas.width + canvas.height) / 2) * 0.03,
  "blue"
);

player.show();

// projectile:
const projectiles = [];

// shoot projectile on click:
addEventListener("click", (event) => {
  const projectileInitPos = {
    ...player.pos,
  };

  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );

  const velocity = {
    x: Math.cos(angle) * player.stats.projectileSpeed,
    y: Math.sin(angle) * player.stats.projectileSpeed,
  };

  for (let i = 0; i < player.stats.projectileCount; i++) {
    setTimeout(() => {
      projectiles.push(new Projectile(projectileInitPos, 3, "red", velocity));
    }, 100 * i);
  }
});

// animate:
// animation loop:
function animate() {
  c.fillStyle = "rgba(0, 0, 0)";
  c.globalAlpha = 0.5;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.globalAlpha = 1;

  projectiles.forEach((projectile) => {
    projectile.update();
  });

  player.show();
  requestAnimationFrame(animate);
}
animate();
