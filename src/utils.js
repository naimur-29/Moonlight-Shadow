// EVENT LISTENERS:
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
  if (KEYS.w.pressed && KEYS.latest.key === "w") {
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = PLAYER.sprite.sprites.up;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
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
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = PLAYER.sprite.sprites.left;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
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
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = PLAYER.sprite.sprites.down;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
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
    PLAYER.sprite.isMoving = true;
    PLAYER.sprite.image = PLAYER.sprite.sprites.right;

    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];

      // collision detection:
      if (
        playerCollisionDetection({
          player: PLAYER.sprite,
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
}
