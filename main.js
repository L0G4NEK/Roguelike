import kaboom from 'kaboom';


kaboom({
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
    dead: {
      from: 8,
      to: 11,
      "speed": 10,
    },
  },
})

loadSprite("rat", "assets/rat.png", {
  sliceX: 16,
  sliceY: 2,
  anims: {
    idle: {
      from: 0,
      to: 1,
      speed: 1,
      loop: true,
    },
    run: {
      from: 2,
      to: 7,
      "speed": 10,
      "loop": true
    },
    dead: {
      from: 12,
      to: 14,
      "speed": 10,
    }
  },
})


// Characters

const player = add([
  pos(200, 150),
  area(),
  scale(2),
  sprite("warrior", {anim: "idle"}),
  health(10),
])

const rat =  add([
    pos(getRandomPosition()),
    area(),
    solid(),
    scale(2),
    sprite("rat", {anim: "idle"}),
    state('move'),
    "enemy"
])

// Camera following player
/*player.onUpdate(() => {
  camPos(player.pos)
})*/

// GetRandom

function getRandomPosition(tileW = 16, tileH = 16) {

  const tx = Math.floor(width() / tileW)
  const ty = Math.floor(height() / tileH)

  const x = (Math.floor(rand(0, tx)) * tileW) + (tileW * 0.5)
  const y = (Math.floor(rand(0, ty)) * tileH) + (tileH * 0.5)

  return vec2(x, y)
}

// Spawn

function spawn(number, enemy) {
}

spawn(6, rat)



//Fight
//Need debuging

player.onCollide("enemy", (enemy) => {
  player.hurt(15)
})

player.onDeath(() => {
  player.play('dead')
  wait(1, () => destroy(player))
})

// Movement

  onKeyDown("up", () => {
    player.move(0, -120)
  })

  onKeyDown("down", () => {
    player.move(0, 120)
  })

  onKeyDown("left", () => {
    player.move(-120, 0)
    player.flipX(true)
  })

  onKeyDown("right", () => {
    player.move(120, 0)
    player.flipX(false)
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

//Rat AI
rat.onStateUpdate("move", () => {
  if (!player.exists()) return
  const dir = player.pos.sub(rat.pos).unit()
  rat.move(dir.scale(180))
})

// Have to manually call enterState() to trigger the onStateEnter("move") event we defined above.
rat.enterState("move")