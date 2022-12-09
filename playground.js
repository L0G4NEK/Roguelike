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