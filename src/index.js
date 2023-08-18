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
const playerImage = new Image();
playerImage.src = "./assets/playerDown.png";

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

const PLAYER = new Sprite({
  img: playerImage,
  frames: 4,
  pos: {
    x: canvas.width / 2 - playerImage.width / 2 / 4,
    y: canvas.height / 2 - playerImage.height / 2,
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

function playerCollisionDetection({ player, boundary }) {
  return (
    player.pos.x + player.width * 0.75 >= boundary.pos.x &&
    player.pos.x + player.width * 0.25 <= boundary.pos.x + boundary.width &&
    player.pos.y + player.height * 0.75 <= boundary.pos.y + boundary.height &&
    player.pos.y + player.height >= boundary.pos.y
  );
}

// animation loop:
function animate() {
  BACKGROUND.draw();

  // draw boundaries:
  //   boundaries.forEach((b) => {
  //     b.draw();
  //   });

  PLAYER.draw();

  FOREGROUND.draw();

  let isTouchingBoundary = false;
  if (KEYS.w.pressed && KEYS.latest.key === "w") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER,
          boundary: {
            ...boundary,
            pos: { x: boundary.pos.x, y: boundary.pos.y + 3 },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary) MOVABLES.forEach((m) => (m.pos.y += 3));
  } else if (KEYS.a.pressed && KEYS.latest.key === "a") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER,
          boundary: {
            ...boundary,
            pos: { x: boundary.pos.x + 3, y: boundary.pos.y },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary) MOVABLES.forEach((m) => (m.pos.x += 3));
  } else if (KEYS.s.pressed && KEYS.latest.key === "s") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER,
          boundary: {
            ...boundary,
            pos: { x: boundary.pos.x, y: boundary.pos.y - 3 },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary) MOVABLES.forEach((m) => (m.pos.y -= 3));
  } else if (KEYS.d.pressed && KEYS.latest.key === "d") {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER,
          boundary: {
            ...boundary,
            pos: { x: boundary.pos.x - 3, y: boundary.pos.y },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary) MOVABLES.forEach((m) => (m.pos.x -= 3));
  }

  window.requestAnimationFrame(animate);
}

animate();

window.addEventListener("keydown", (event) => {
  event.preventDefault();
  KEYS.latest.key = event.key.toLowerCase();

  switch (event.key.toLowerCase()) {
    case "w":
      KEYS.w.pressed = true;
      break;
    case "a":
      KEYS.a.pressed = true;
      break;
    case "s":
      KEYS.s.pressed = true;
      break;
    case "d":
      KEYS.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();

  switch (event.key.toLowerCase()) {
    case "w":
      KEYS.w.pressed = false;
      break;
    case "a":
      KEYS.a.pressed = false;
      break;
    case "s":
      KEYS.s.pressed = false;
      break;
    case "d":
      KEYS.d.pressed = false;
      break;
  }
});
