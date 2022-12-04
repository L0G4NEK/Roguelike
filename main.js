import kaboom from 'kaboom';


const { add, pos, sprite, area } = kaboom({
    fullscreen: true,
    clearColor: [0, 0, 0, 1]
});

// Sprites

loadSprite("warrior", "assets/warrior.png", {
  sliceX: 21,
  sliceY: 8.5,
  anims: {
    idle: {
      from: 126,
      to: 127,
      speed: 1,
      loop: true,
    },
    run: {
      from: 128,
      to: 133,
      "speed": 10,
      "loop": true
    },
  },
})

loadSprite("warrior", "assets/warrior.png", {
  sliceX: 21,
  sliceY: 8.5,
  anims: {
    idle: {
      from: 126,
      to: 127,
      speed: 1,
      loop: true,
    },
    run: {
      from: 128,
      to: 133,
      "speed": 10,
      "loop": true
    },
  },
})

// Characters

const player = add([
  pos(200, 150),
  area(),
  scale(2),
  sprite("warrior", {anim: "idle"}),
  health(10)
])

const rat =  add([
  pos(200, 150),
  area(),
  scale(2),
  sprite("rat", {anim: "idle"}),
  health(10)
])

//Fight
player.onCollide("enemy", (enemy) => {
  player.hurt(1)
  enemy.hurt(1)
})

// Movement

const dirs = {
  "left": LEFT,
  "right": RIGHT,
  "up": UP,
  "down": DOWN,
}

onKeyDown("up", () => {
  player.move(0, -120)
})

onKeyDown("down", () => {
  player.move(0, 120)
})

onKeyDown("left", () => {
  player.move(-120, 0)
})

onKeyDown("right", () => {
  player.move(120, 0)
})

onKeyPress(["left", "right", "up", "down"], () => {
  player.play("run")
})

onKeyRelease(["left", "right", "up", "down"], () => {
  if (
      !isKeyDown("left")
      && !isKeyDown("right")
      && !isKeyDown("up")
      && !isKeyDown("down")
  ) {
    player.play("idle")
  }
})