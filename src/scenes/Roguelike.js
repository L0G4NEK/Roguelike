import k from '../kaboom'

export default function Roguelike() {
    const {
        rect,
        solid,
        color,
        addLevel,
        // layers
    } = k

    // layers(['bg', 'obj', 'ui'], 'obj')

    // Random Walk Algorithm
    function createArray(num, dimensions) {
        let array = [];
        for (let i = 0; i < dimensions; i++) {
            array.push([]);
            for (let j = 0; j < dimensions; j++) {
                array[i].push(num);
            }
        }
        return array;
    }

    function createMap() {
        let dimensions = 20;
        let maxTunnels = 20;
        let maxLength = 6;
        let map = createArray(1, dimensions);
        let currentRow = Math.floor(Math.random() * dimensions)
        let currentColumn = Math.floor(Math.random() * dimensions);
        let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        let lastDirection = [];
        let randomDirection;

        while (maxTunnels && dimensions && maxLength) {

            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
            } while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

            let randomLength = Math.ceil(Math.random() * maxLength),
                tunnelLength = 0;

            while (tunnelLength < randomLength) {

                if (((currentRow === 0) && (randomDirection[0] === -1)) ||
                    ((currentColumn === 0) && (randomDirection[1] === -1)) ||
                    ((currentRow === dimensions - 1) && (randomDirection[0] === 1)) ||
                    ((currentColumn === dimensions - 1) && (randomDirection[1] === 1))) {
                    break;
                } else {
                    map[currentRow][currentColumn] = 0;
                    currentRow += randomDirection[0];
                    currentColumn += randomDirection[1];
                    tunnelLength++;
                }
            }

            if (tunnelLength) {
                lastDirection = randomDirection;
                maxTunnels--;
            }
        }
        return map;
    }

    function renderMap(array) {
        let s = []
        for (let i = 0; i < array.length; i++) {
            s.push(array[i].toString().replaceAll(',', '').replaceAll('0', ' '))
        }
        return s
    }

    const levelCfg = {
        width: 16,
        height: 16,
        '0': [rect(16, 16), solid(), color(0, 1, 0, 1)],
        '1': [rect(16, 16), solid(), color(0, 0, 1, 1)]
    }

    addLevel(renderMap(createMap()), levelCfg)
}