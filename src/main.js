import k from './kaboom'

import Roguelike from './scenes/Roguelike'
import GameOver from './scenes/GameOver'

k.scene('roguelike', Roguelike)
k.scene('game-over', GameOver)

k.start('roguelike')
