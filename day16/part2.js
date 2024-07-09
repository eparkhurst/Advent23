const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const dirs = {
  up: (x, y) => [x, y - 1],
  down: (x, y) => [x, y + 1],
  left: (x, y) => [x - 1, y],
  right: (x, y) => [x + 1, y],
};

const main = () => {
  const map = fileContents.trim().split('\n');

  // let bLeft = runMap(0, 2, 'right', map);
  let bLeft = 0;
  for (let i = 0; i < map.length; i++) {
    const leftTot = runMap(0, i, 'right', map);
    const rightTot = runMap(map[0].length - 1, i, 'left', map);
    if (leftTot > bLeft) bLeft = leftTot;
    if (rightTot > bLeft) bLeft = rightTot;
  }
  let upDown = 0;
  for (let i = 0; i < map[0].length; i++) {
    const leftTot = runMap(i, 0, 'down', map);
    const rightTot = runMap(i, map.length, 'up', map);
    if (leftTot > upDown) upDown = leftTot;
    if (rightTot > upDown) upDown = rightTot;
  }

  console.log(bLeft > upDown ? bLeft : upDown);
};

function runMap(x, y, dir, map) {
  const memo = {};
  let newMap = map.reduce((nm, l) => {
    const nl = l.split('').map((c) => '.');
    nm.push(nl);
    return nm;
  }, []);
  traverse(x, y, dir);

  function traverse(x, y, dir) {
    const key = `${x}-${y}${dir}`;
    if (memo[key]) return;
    else memo[key] = true;
    if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) return;
    newMap[y][x] = '#';
    const char = map[y][x];
    if (char === '/') {
      switch (dir) {
        case 'up':
          dir = 'right';
          break;
        case 'down':
          dir = 'left';
          break;
        case 'left':
          dir = 'down';
          break;
        case 'right':
          dir = 'up';
          break;
      }
    } else if (char === '\\') {
      switch (dir) {
        case 'up':
          dir = 'left';
          break;
        case 'down':
          dir = 'right';
          break;
        case 'left':
          dir = 'up';
          break;
        case 'right':
          dir = 'down';
          break;
      }
    } else if (char === '-') {
      if (dir == 'up' || dir == 'down') {
        const [ox, oy] = dirs.right(x, y);
        traverse(ox, oy, 'right');
        dir = 'left';
      }
    } else if (char === '|') {
      if (dir == 'right' || dir == 'left') {
        const [ox, oy] = dirs.down(x, y);
        traverse(ox, oy, 'down');
        dir = 'up';
      }
    }
    const [nx, ny] = dirs[dir](x, y);
    return traverse(nx, ny, dir);
  }

  const ans = newMap.reduce((t, l) => {
    t += l.reduce((lt, c) => {
      if (c == '#') lt++;
      return lt;
    }, 0);
    return t;
  }, 0);
  return ans;
}

main();

//8143 too low
