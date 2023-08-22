const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const ctrl = document.querySelector(".control-overlay");

canvas.width = 1024;
canvas.height = 576;

// STATES:
// day & night cycle:
let IS_NIGHT = true;
let PREV_IS_NIGHT = false;
let FRAME = 0;
// keeping track of if any movement keys are pressed:
const KEYS = {
  latest: [],
};

// load images:
// BACKGROUND:
const backgroundImg = new Image();
backgroundImg.src = "./assets/level_01.png";

const backgroundImgNight = new Image();
backgroundImgNight.src = "./assets/level_01_night.png";

// foreground:
const foregroundImg = new Image();
foregroundImg.src = "./assets/level_01_foreground.png";

const foregroundImgNight = new Image();
foregroundImgNight.src = "./assets/level_01_foreground_night.png";

// player:
// down:
const playerDownImage = new Image();
playerDownImage.src = "./assets/playerDown.png";

const playerDownImageNight = new Image();
playerDownImageNight.src = "./assets/playerDownNight.png";

// up:
const playerUpImage = new Image();
playerUpImage.src = "./assets/playerUp.png";

const playerUpImageNight = new Image();
playerUpImageNight.src = "./assets/playerUpNight.png";

// left:
const playerLeftImage = new Image();
playerLeftImage.src = "./assets/playerLeft.png";

const playerLeftImageNight = new Image();
playerLeftImageNight.src = "./assets/playerLeftNight.png";

// right:
const playerRightImage = new Image();
playerRightImage.src = "./assets/playerRight.png";

const playerRightImageNight = new Image();
playerRightImageNight.src = "./assets/playerRightNight.png";

// GLOBAL VARIABLES/CONSTANTS:
const OFFSET = {
  x: -700,
  y: -700,
};

let MOVABLES = [];

// PLAYER:
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
      upNight: playerUpImageNight,
      down: playerDownImage,
      downNight: playerDownImageNight,
      left: playerLeftImage,
      leftNight: playerLeftImageNight,
      right: playerRightImage,
      rightNight: playerRightImageNight,
    },
  }),
  stats: {
    speed: {
      x: 3,
      y: 3,
    },
  },
});

// map:
const BACKGROUND = new Sprite({
  img: backgroundImg,
  pos: {
    x: OFFSET.x,
    y: OFFSET.y,
  },
  sprites: {
    day: backgroundImg,
    night: backgroundImgNight,
  },
});
MOVABLES.push(BACKGROUND);

const FOREGROUND = new Sprite({
  img: foregroundImg,
  pos: {
    x: OFFSET.x,
    y: OFFSET.y,
  },
  alpha: 0.7,
  sprites: {
    day: foregroundImg,
    night: foregroundImgNight,
  },
});
MOVABLES.push(FOREGROUND);

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

// projectiles:
let projectiles = [];

window.addEventListener("pointerdown", (event) => {
  const angle = Math.atan2(
    event.clientY - PLAYER.sprite.pos.y,
    event.clientX - PLAYER.sprite.pos.x
  );

  const vel = {
    x: Math.cos(angle) * 5,
    y: Math.sin(angle) * 5,
  };

  const p = new Projectile({
    pos: {
      x: PLAYER.sprite.pos.x + PLAYER.sprite.width / 2,
      y: PLAYER.sprite.pos.y + PLAYER.sprite.height / 2,
    },
    vel: {
      ...vel,
    },
    radius: 3,
  });
  projectiles.push(p);
  console.log(p.pos);
});

// animation loop:
function animate() {
  // handle day night cycle:
  FRAME++;

  if (FRAME >= 30000) {
    FRAME = 0;
    IS_NIGHT = !IS_NIGHT;
  }

  if (IS_NIGHT !== PREV_IS_NIGHT) {
    handleDayNight();
    PREV_IS_NIGHT = IS_NIGHT;
  }

  BACKGROUND.draw();

  handlePlayerControl();
  PLAYER.draw();

  FOREGROUND.draw();

  // projectiles:
  projectiles.forEach((p) => {
    p.update();
  });

  // console.log(projectiles);

  // draw boundaries:
  // boundaries.forEach((b) => {
  //   b.draw();
  // });

  window.requestAnimationFrame(animate);
}

animate();
