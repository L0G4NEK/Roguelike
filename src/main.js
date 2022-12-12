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
  sliceX: 16,
  sliceY: 1,
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

  const maps = [[
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xS                                         Sx",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                  R                     x x",
    "x x                                       x x",
    "x x                              R         x x",
    "x x            R                           x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                         R              x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x x                                       x x",
    "x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx x",
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
    ],
    "R": () => [
      area(),
      solid(),
      sprite("rat", {anim: "run"}),
      state('move'),
      "enemy",
      'rat'
    ],
  }
  add([sprite('bg'), layer('bg')])

  addLevel(maps[0], levelCfg)


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

  const rat = add([
    pos(200, 150),
    area(),
    solid(),
    sprite("rat", {anim: "run"}),
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
      player.move(0, -120)
    }
  })

  onKeyDown("down", () => {
    if (!player.dead) {
      player.move(0, 120)
    }
  })

  onKeyDown("left", () => {
    if (!player.dead) {
      player.move(-120, 0)
      player.flipX(true)
    }
  })

  onKeyDown("right", () => {
    if (!player.dead) {
      player.move(120, 0)
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
  })

  //Rat AI
  rat.onStateEnter("idle", async () => {
    await wait(0.5)
    rat.enterState("move")
  })
  rat.onStateUpdate("move", () => {
    if (!player.exists()) {
      return rat.play("idle")
    }
    const dir = player.pos.sub(rat.pos).unit()
    rat.move(dir.scale(50))
    if (dir.x > 0) {
      rat.flipX(false)
    } else {
      rat.flipX(true)
    }
  })
  rat.enterState("move")

  onUpdate('rat', (rat) => {
    rat.onStateEnter("idle", async () => {
      await wait(0.5)
      rat.enterState("move")
    })
  })

  onUpdate('rat', (rat) => {
    rat.onStateUpdate("move", () => {
      if (!player.exists()) {
        return rat.play("idle")
      }
      const dir = player.pos.sub(rat.pos).unit()
      rat.move(dir.scale(1))
      if (dir.x > 0) {
        rat.flipX(false)
      } else {
        rat.flipX(true)
      }
    })
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