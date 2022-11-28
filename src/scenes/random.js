/*import movement from '../components/movement'
import controls from '../components/controls'
import spawn from '../components/spawn'*/
import getRandomPosition from '../utils/getRandomPosition'

export default function Roguelike() {
    const {
        add,
        pos,
        origin,
        sprite,
        loadSpriteAtlas
    } = k;

    loadSpriteAtlas("../assets/warriorPD.png", {
        "hero": {
            x: 0,
            y: 0,
            width: 144,
            height: 28,
            sliceX: 21,
            sliceY:7,
            anims: {
                idle: { from: 0, to: 3 },
                run: { from: 4, to: 7 },
                hit: 8,
            },
        },
    })

    const player = add([
        sprite("hero"),
        pos(getRandomPosition()),
        origin('center'),
    ])

    player.play("idle")
}