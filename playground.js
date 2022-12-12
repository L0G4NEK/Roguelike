const rat =  [
    pos(getRandomPosition()),
    area(),
    solid(),
    scale(2),
    sprite("rat", {anim: "run"}),
    state('move'),
    origin("center"),
    "enemy"
]
// Spawn

function spawn(number, enemy) {
    for (let i = 0; i < number; i++) {
        enemy.pos = getRandomPosition()
        console.log(enemy = [...enemy, pos(enemy.pos)])
        add(enemy)
        console.log(enemy.pos)
    }
}



const rat = add([
    pos(200, 150),
    area(),
    solid(),
    sprite("rat", {anim: "run"}),
    state('move'),
    "enemy"
])

/*  const rat =  [
    area(),
    solid(),
    sprite("rat", {anim: "run"}),
    state('move'),
    "enemy"
  ]*/
// Spawn
const rats = []

function spawn(number, enemy) {
    for (let i = 0; i < number; i++) {
        enemy.pos = getRandomPosition()
        enemy
        rats.push(enemy)
    }
}

spawn(6, rat)
console.log(rats)



//Rat AI

/*  for(let i = 0; i < rats.length; i++) {
    rats[i].onStateEnter("idle", async () => {
      await wait(0.5)
      rats[i].enterState("move")
    })
    rats[i].onStateUpdate("move", () => {
      if (!player.exists()) {
        return rat[i].play("idle")
      }
      const dir = player.pos.sub(rats[i].pos).unit()
      rats[i].move(dir.scale(50))
      if (dir.x > 0) {
        rats[i].flipX(false)
      } else {
        rats[i].flipX(true)
      }
    })
    rats[i].enterState("move")
  }*/


/*  on("ground", 'rat', async (rat) => {
    rat.onStateEnter("idle", async () => {
      await wait(0.5)
      rat.enterState("move")
    })
  })

  on("ground",'rat', async (rat) => {
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
  })*/