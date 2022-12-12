import kaboom from 'kaboom';


kaboom({
  global: true,
  height:370,
  width:720,
  scale: 2,
  debug: true,
  clearColor: [0, 0, 1, 1]
});

// Sprites


loadSprite("warrior", "src/assets/warrior.png", {
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

loadSprite("rat", "src/assets/rat.png", {
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
      from: 6,
      to: 10,
      "speed": 8,
      "loop": true
    },
    dead: {
      from: 12,
      to: 14,
      "speed": 10,
    }
  },
})

loadSprite("shaman", "src/assets/shaman.png", {
  sliceX: 21,
  anims: {
    idle: {
      from: 0,
      to: 1,
      speed: 1,
      loop: true,
    },
    run: {
      from: 6,
      to: 10,
      "speed": 8,
      "loop": true
    },
    dead: {
      from: 12,
      to: 14,
      "speed": 10,
    }
  },
})

loadSprite('wall', 'src/assets/wall.png')
loadSprite('floor', 'src/assets/floor.png')
loadSprite('bg', 'src/assets/bg.png')

//Add level
scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  //Speed
  let PLAYER_SPEED = 120;
  let RAT_SPEED = 100;
  const BULLET_SPEED = 400;

  // Characters

  const player = add([
    pos(width() / 2, height() - 32),
    area(),
    solid(),
    sprite("warrior", {anim: "idle"}),
    health(3),
    {
      dead: false,
    }
  ])


  const maps = [[
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xS                                         Sx",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                                      x  x",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                  R                   xx x",
    "x x                                      xx x",
    "x x                              R       x  x",
    "x x            R                         xx x",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                         R            xx x",
    "x x                                      x  x",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                                      xx x",
    "x x                                      x  x",
    "x xxxxxxxxxxxxxxxxxxx xxxxxxxxxxxxxxxxxxxxx x",
    "x                                           x",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  ]]
  const levelCfg = {
    width: 16,
    height: 16,
    "x": () => [
      sprite("wall"),
      area(),
      solid(),
      'wall'
    ],
    "R": () => [
      area(),
      solid(),
      sprite("rat", {anim: "run"}),
      state('move'),
      "enemy",
      'rat',
    ],
    "S": () => [
      area(),
      solid(),
      sprite("shaman", {anim: "idle"}),
      "enemy",
      'shaman',
      { timer: 0 }
    ],
  }
  add([sprite('bg'), layer('bg'), "ground"])

  addLevel(maps[0], levelCfg)


  // GetRandom

  function getRandomPosition(tileW = 16, tileH = 16) {

    const tx = Math.floor(width() / tileW)
    const ty = Math.floor(height() / tileH)

    const x = (Math.floor(rand(0, tx)) * tileW) + (tileW * 0.5)
    const y = (Math.floor(rand(0, ty)) * tileH) + (tileH * 0.5)

    return vec2(x, y)
  }

  //Fight
  //Need debuging

  player.onCollide("enemy", (enemy) => {
    player.hurt(1)
    enemy.enterState("idle")
  })

  player.onDeath(() => {
    player.play('dead')
    player.dead = true
    wait(1, () => destroy(player))
    go("gameover");
  })

  // Movement

  onKeyDown("up", () => {
    if (!player.dead) {
      player.move(0, -PLAYER_SPEED)
    }
  })

  onKeyDown("down", () => {
    if (!player.dead) {
      player.move(0, PLAYER_SPEED)
    }
  })

  onKeyDown("left", () => {
    if (!player.dead) {
      player.move(-PLAYER_SPEED, 0)
      player.flipX(true)
    }
  })

  onKeyDown("right", () => {
    if (!player.dead) {
      player.move(PLAYER_SPEED, 0)
      player.flipX(false)
    }
  })

  onKeyPress(["left", "right", "up", "down"], () => {
    if (!player.dead) {
      player.play("run")
    }
  })

  onKeyRelease(["left", "right", "up", "down"], () => {
    if (
        !isKeyDown("left")
        && !isKeyDown("right")
        && !isKeyDown("up")
        && !isKeyDown("down")
        && !player.dead
    ) {
      player.play("idle")
    }
  })

  onKeyPress(["space"], () => {
    PLAYER_SPEED = 480
    wait(.1, () =>{
      PLAYER_SPEED = 120
    })
  })

  //Rat AI

    onUpdate('rat', (rat) => {
      if (player.exists()) {
        const dir = player.pos.sub(rat.pos).unit()
        rat.move(dir.scale(RAT_SPEED))
        if (dir.x > 0) {
          rat.flipX(false)
        } else {
          rat.flipX(true)
        }
      }
  })

//  Shaman AI

  onUpdate('shaman', (shaman) => {

    shaman.timer -= dt()
    if (player.exists() && shaman.timer <= 0) {
      const dir = player.pos.sub(shaman.pos).unit()
      console.log(shaman.pos.x + 8, shaman.pos.y + 8)

      add([
          pos(shaman.pos.x + 8, shaman.pos.y + 8),
          move(dir, BULLET_SPEED),
          rect(3, 3),
          area(),
          cleanup(),
          color(BLUE),
          "bullet",
      ])
      shaman.timer = rand(5)
    }
  })

//  Bullet
  onUpdate('bullet', (bullet) => {
    bullet.onCollide('wall', () => {
      destroy(bullet)
    })
  })
  player.onCollide('bullet', (bullet) => {
    player.hurt(1)
    bullet.destroy()
  })
})


scene("gameover", () => {

  add([
    text("Press space to start", { size: 24 }),
    pos(vec2(160, 120)),
    origin("center"),
    color(255, 255, 255),
  ]);

  onKeyRelease("space", () => {
    go("game", { level: 0, score: 0 });
  })
});

go('game', { level: 0, score: 0 })