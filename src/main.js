import kaboom from 'kaboom';


kaboom({
  global: true,
  height:370,
  width:624,
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
loadSprite("stab", "src/assets/stab.png", {
  sliceX: 5,
  sliceY: 2,
  anims: {
    attack: {
      from: 4,
      to: 6,
      speed: 10,
    },
  }
})

loadSprite("slash", "src/assets/slash.png", {
  sliceX: 10,
  anims: {
    attack: {
      from: 0,
      to: 9,
      speed: 60,
    },
  }
})

loadSprite('wall', 'src/assets/wall.png')
loadSprite('floor', 'src/assets/floor.png')
loadSprite('bg', 'src/assets/bg.png')
loadSprite('trap', 'src/assets/trap.png')
loadSprite('fullHeart', 'src/assets/fullHeart.png')
loadSprite('emptyHeart', 'src/assets/emptyHeart.png')

//Add level
scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  //Speed
  let PLAYER_SPEED = 120;
  let RAT_SPEED = 100;
  const BULLET_SPEED = 200;

  // Characters

  const player = add([
    pos(width() / 2, height() - 32),
    area(),
    solid(),
    scale(0.9),
    sprite("warrior", {anim: "idle"}),
    health(3),
    {
      dead: false,
    }
  ])
    add([
      pos(15, -20),
      sprite("fullHeart"),
      layer('ui'),
      'heart1',
      {
        lost: false
      }
    ])
    add([
      pos(45, -20),
      sprite("fullHeart"),
      layer('ui'),
      'heart2',
      {
        lost: false
      }
    ])
    add([
      pos(75, -20),
      sprite("fullHeart"),
      layer('ui'),
      'heart3',
      {
        lost: false
      }
    ])

  //Map

  const maps = [[
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "xS                                    x",
    "x xx  xxxxxxxxxxxxxxxxxxxxxxxxxxx  xx x",
    "x xx                     R      xT xx x",
    "x xx        R                   x  xx x",
    "x  x              R       xxxxxxx Tx  x",
    "x xx                      x        xx x",
    "x xx                      x   xxxxxxx x",
    "x xx      R         S     x#TT###TTxx x",
    "x xx                      x####T#TTxx x",
    "x  x                      xTTTTT#TTx  x",
    "x xx      R               xTT####TTxx x",
    "x xx              R       xTT#TTTTTxx x",
    "x xx                      xTT####TTxx x",
    "x xx                  R   xxxxxx   xx x",
    "x  x                           x   x  x",
    "x xx       S          R        x   xx x",
    "x xx          R             xxxx   xx x",
    "x xx                               xx x",
    "x xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx x",
    "x                                     x",
    "x                                     x",
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
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
      sprite("shaman", {anim: "idle"}),
      "enemy",
      'shaman',
      { timer: 0 }
    ],
    "T": () => [
      area(),
      sprite("trap"),
      layer('bg'),
      'trap',
      {isUsed: false}
    ],
    "#": () => [
      sprite("trap"),
      layer('bg'),
      'fakeTrap',
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

  player.onCollide("enemy", () => {
    player.hurt(1)
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

  //Attack

  onMousePress("left", () => {
    let attack = add([
      pos(player.pos.x + 8, player.pos.y + 8),
      area(),
      scale(0.7),
      sprite("slash", {anim: "attack"}),
      origin("center"),
      'attack'
    ])
    wait(.3, () => {
      destroy(attack)
    })
    attack.onCollide('enemy', (enemy) => {
      destroy(enemy)
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

      add([
          pos(shaman.pos.x + 8, shaman.pos.y + 8),
          move(dir, BULLET_SPEED),
          rect(3, 3),
          area(),
          cleanup(),
          color(BLUE),
          "bullet",
      ])
      shaman.timer = 1.5
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
    destroy(bullet)
  })

  //Traps
  player.onCollide('trap', (trap) => {
    if (!trap.used) {
      player.hurt(1)
      trap.used = true
    }
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