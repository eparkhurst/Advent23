const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

function memoize(func) {
  const stored = new Map();
  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k);
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

let count = 0;
let map;
const main = () => {
  map = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)));

  const ans = recur(0, 0, []);
  console.log(ans);
  console.log(count);
};

const recur = (x, y, ppath) => {
  count++;
  const key = `${x},${y}`;

  if (ppath.includes(key)) {
    return 99999;
  }

  if (x < 0 || y < 0 || y >= map.length || x >= map[0].length) return 99999;
  if (y === map.length - 1 && x === map[0].length - 1) {
    return map[y][x];
  }

  const last3 = ppath.slice(Math.max(ppath.length - 3, 0));
  const strLast = last3[last3.length - 1];
  let lastx, lasty;
  if (strLast) {
    [lastx, lasty] = strLast.split(',');
  } else {
    lastx = -1;
    lasty = -1;
  }
  const dirs = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  if (last3.length > 3) {
    // if (last3[0][0] === last3[1][0] && last3[1][0] === last3[2][0] && last3[0][0] === x) {
    //   dirs.splice(0, 2);
    // }
    // if (last3[0][1] === last3[1][1] && last3[0][1] === last3[2][1] && last3[0][1] === y) {
    //   dirs.splice(2);
    // }
  }
  const val = map[y][x];
  ppath.push(key);
  let min = 99999;
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    if (dir[0] === Number(lastx) && dir[1] === Number(lasty)) continue;
    if (dir[0] < 0 || dir[1] < 0 || dir[1] >= map.length || dir[0] >= map[0].length) continue;
    const tot = recur(dir[0], dir[1], [...ppath]);
    if (tot < min) {
      min = tot;
    }
  }

  return val + min;
};

main();
