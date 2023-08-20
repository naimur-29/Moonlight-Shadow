const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// STATES:
let isNight = true;

// load images:
// BACKGROUND:
const backgroundImg = new Image();
backgroundImg.src = isNight
  ? "./assets/level_01_night.png"
  : "./assets/level_01.png";

// foreground:
const foregroundImg = new Image();
foregroundImg.src = isNight
  ? "./assets/level_01_foreground_night.png"
  : "./assets/level_01_foreground.png";

// player:
const playerDownImage = new Image();
playerDownImage.src = isNight
  ? "./assets/playerDownNight.png"
  : "./assets/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = isNight
  ? "./assets/playerUpNight.png"
  : "./assets/playerUp.png";

const playerLeftImage = new Image();
playerLeftImage.src = isNight
  ? "./assets/playerLeftNight.png"
  : "./assets/playerLeft.png";

const playerRightImage = new Image();
playerRightImage.src = isNight
  ? "./assets/playerRightNight.png"
  : "./assets/playerRight.png";

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
  stats: {
    speed: {
      x: 3,
      y: 3,
    },
  },
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
for (let i = 0; i < COLLISIONS.length; i += 70) {
  collisionsMap.push(COLLISIONS.slice(i, i + 70));
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
  handlePlayerControl();
  PLAYER.draw();
  c.globalAlpha = 0.7;
  FOREGROUND.draw();
  c.globalAlpha = 1;

  window.requestAnimationFrame(animate);
}

animate();
