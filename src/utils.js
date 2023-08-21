// PC EVENT:
window.addEventListener("keydown", (event) => {
  event.preventDefault();

  if (
    !KEYS.latest.length ||
    KEYS.latest[KEYS.latest.length - 1] !== event.key.toLocaleLowerCase()
  ) {
    KEYS.latest.push(event.key.toLowerCase());
  }
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();
  KEYS.latest.length &&
    KEYS.latest.splice(KEYS.latest.lastIndexOf(event.key.toLowerCase()), 1);
});

// PHONE EVENTS:
function recordKey(event, key) {
  event.preventDefault();

  if (KEYS.latest[KEYS.latest.length - 1] !== key) {
    KEYS.latest.push(key);
  }
}

function removeLatestRecord(event, key) {
  event.preventDefault();

  if (KEYS.latest.length) {
    KEYS.latest.splice(KEYS.latest.lastIndexOf(key), 1);
  }
}

// UP
document.querySelector("#up").onpointerdown = (event) => recordKey(event, "w");

document.querySelector("#up").onpointerup = (event) =>
  removeLatestRecord(event, "w");

// LEFT
document.querySelector("#left").onpointerdown = (event) =>
  recordKey(event, "a");

document.querySelector("#left").onpointerup = (event) =>
  removeLatestRecord(event, "a");

// DOWN
document.querySelector("#down").onpointerdown = (event) =>
  recordKey(event, "s");

document.querySelector("#down").onpointerup = (event) =>
  removeLatestRecord(event, "s");

// RIGHT
document.querySelector("#right").onpointerdown = (event) =>
  recordKey(event, "d");

document.querySelector("#right").onpointerup = (event) =>
  removeLatestRecord(event, "d");

// GLOBAL FUNCTIONS:
function playerCollisionDetection({ player, boundary }) {
  return (
    player.pos.x + player.width * 0.75 >= boundary.pos.x &&
    player.pos.x + player.width * 0.25 <= boundary.pos.x + boundary.width &&
    player.pos.y + player.height * 0.75 <= boundary.pos.y + boundary.height &&
    player.pos.y + player.height >= boundary.pos.y
  );
}

function handlePlayerControl() {
  PLAYER.sprite.isMoving = false;
  let isTouchingBoundary = false;
  if (KEYS.latest.length && KEYS.latest[KEYS.latest.length - 1] === "w") {
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = IS_NIGHT
      ? PLAYER.sprite.sprites.upNight
      : PLAYER.sprite.sprites.up;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
          boundary: {
            ...boundary,
            pos: {
              x: boundary.pos.x,
              y: boundary.pos.y + PLAYER.stats.speed.y,
            },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary)
      MOVABLES.forEach((m) => (m.pos.y += PLAYER.stats.speed.y));
  } else if (
    KEYS.latest.length &&
    KEYS.latest[KEYS.latest.length - 1] === "a"
  ) {
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = IS_NIGHT
      ? PLAYER.sprite.sprites.leftNight
      : PLAYER.sprite.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
          boundary: {
            ...boundary,
            pos: {
              x: boundary.pos.x + PLAYER.stats.speed.x,
              y: boundary.pos.y,
            },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary)
      MOVABLES.forEach((m) => (m.pos.x += PLAYER.stats.speed.x));
  } else if (
    KEYS.latest.length &&
    KEYS.latest[KEYS.latest.length - 1] === "s"
  ) {
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = IS_NIGHT
      ? PLAYER.sprite.sprites.downNight
      : PLAYER.sprite.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
          boundary: {
            ...boundary,
            pos: {
              x: boundary.pos.x,
              y: boundary.pos.y - PLAYER.stats.speed.y,
            },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary)
      MOVABLES.forEach((m) => (m.pos.y -= PLAYER.stats.speed.y));
  } else if (
    KEYS.latest.length &&
    KEYS.latest[KEYS.latest.length - 1] === "d"
  ) {
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = IS_NIGHT
      ? PLAYER.sprite.sprites.rightNight
      : PLAYER.sprite.sprites.right;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
          boundary: {
            ...boundary,
            pos: {
              x: boundary.pos.x - PLAYER.stats.speed.x,
              y: boundary.pos.y,
            },
          },
        })
      ) {
        isTouchingBoundary = true;
        break;
      }
    }

    if (!isTouchingBoundary)
      MOVABLES.forEach((m) => (m.pos.x -= PLAYER.stats.speed.x));
  }
}

function handleDayNight() {
  console.log("triggered!");
  if (IS_NIGHT) {
    // map:
    BACKGROUND.image = BACKGROUND.sprites.night;
    FOREGROUND.image = FOREGROUND.sprites.night;
    // player:
    switch (PLAYER.sprite.image) {
      case PLAYER.sprite.sprites.up:
        PLAYER.sprite.image = PLAYER.sprite.sprites.upNight;
        break;
      case PLAYER.sprite.sprites.left:
        PLAYER.sprite.image = PLAYER.sprite.sprites.leftNight;
        break;
      case PLAYER.sprite.sprites.down:
        PLAYER.sprite.image = PLAYER.sprite.sprites.downNight;
        break;
      case PLAYER.sprite.sprites.right:
        PLAYER.sprite.image = PLAYER.sprite.sprites.rightNight;
        break;
    }
  } else {
    // map:
    BACKGROUND.image = BACKGROUND.sprites.day;
    FOREGROUND.image = FOREGROUND.sprites.day;
    // player:
    switch (PLAYER.sprite.image) {
      case PLAYER.sprite.sprites.upNight:
        PLAYER.sprite.image = PLAYER.sprite.sprites.up;
        break;
      case PLAYER.sprite.sprites.leftNight:
        PLAYER.sprite.image = PLAYER.sprite.sprites.left;
        break;
      case PLAYER.sprite.sprites.downNight:
        PLAYER.sprite.image = PLAYER.sprite.sprites.down;
        break;
      case PLAYER.sprite.sprites.rightNight:
        PLAYER.sprite.image = PLAYER.sprite.sprites.right;
        break;
    }
  }
}
