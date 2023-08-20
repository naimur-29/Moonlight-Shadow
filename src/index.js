const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// load images:
// BACKGROUND:
const backgroundImg = new Image();
backgroundImg.src = "./assets/level_01.png";

// foreground:
const foregroundImg = new Image();
foregroundImg.src = "./assets/level_01_foreground.png";

// player:
const playerDownImage = new Image();
playerDownImage.src = "./assets/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "./assets/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./assets/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = "./assets/playerRight.png";

// GLOBAL VARIABLES/CONSTANTS:
const OFFSET = {
  x: -700,
  y: -710,
};

let MOVABLES = [];

// map:
const BACKGROUND = new Sprite({
  img: backgroundImg,
  pos: {
    x: OFFSET.x,
    y: OFFSET.y,
  },
});
MOVABLES.push(BACKGROUND);

const FOREGROUND = new Sprite({
  img: foregroundImg,
  pos: {
    x: OFFSET.x,
    y: OFFSET.y,
  },
});
MOVABLES.push(FOREGROUND);

const PLAYER = new Player({
  sprite: new AnimatedSprite({
    img: playerDownImage,
    frames: { max: 4 },
    pos: {
      x: canvas.width / 2 - playerDownImage.width / 2 / 4,
      y: canvas.height / 2 - playerDownImage.height / 2,
    },
    sprites: {
      up: playerUpImage,
      down: playerDownImage,
      left: playerLeftImage,
      right: playerRightImage,
    },
  }),
});

// keeping track of if any movement keys are pressed:
const KEYS = {
  latest: {
    key: "",
  },
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// map boundary:
const boundaries = [];

// collisions:
const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

collisionsMap.forEach((row, i) => {
  row.forEach((col, j) => {
    if (col === 1025)
      boundaries.push(
        new Boundary({
          pos: {
            x: j * Boundary.width + OFFSET.x,
            y: i * Boundary.height + OFFSET.y,
          },
        })
      );
  });
});
MOVABLES = [...MOVABLES, ...boundaries];

// animation loop:
function animate() {
  BACKGROUND.draw();

  // draw boundaries:
  //   boundaries.forEach((b) => {
  //     b.draw();
  //   });

  PLAYER.draw();

  FOREGROUND.draw();

  handlePlayerControl();

  window.requestAnimationFrame(animate);
}

animate();
