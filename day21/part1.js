const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

let map;
let total = 0;

const main = () => {
  let start;
  map = fileContents
    .trim()
    .split('\n')
    .map((l, y) => {
      if (l.includes('S')) {
        start = [l.indexOf('S'), y];
      }
      return l.split('');
    });

  const final = recur(start[1], start[0], 64);
  console.log(final);
  console.log(total);
};

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

const recur = memoize((x, y, n) => {
  if (map[y][x] === '#') {
    return 0;
  }
  if (n == 0) {
    total++;
    return 1;
  }
  const dirs = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ];
  let count = 0;
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i];
    if (dir[0] < 0 || dir[1] < 0 || dir[1] >= map.length || dir[0] >= map[0].length) continue;
    count += recur(dir[0], dir[1], n - 1);
  }
  return count;
});

main();
