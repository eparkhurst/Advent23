const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

// Print the contents or use it as

const main = () => {
  const lines = fileContents.trim().split('\n');
  let start = getStart(lines);
  let last = start;
  let next = getNextPoint([-1, -1], start, lines);
  let count = 1;

  while (next[0] !== start[0] || next[1] !== start[1]) {
    count++;
    const nl = next;
    next = getNextPoint(last, next, lines);
    last = nl;
  }

  console.log('furthest distance', count / 2);
  // lines.forEach((line) => {
  //   console.log(line);
  // });
};

const getStart = (map) => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      const element = map[i][j];
      if (element === 'S') {
        return [j, i];
      }
    }
  }
};

const getNextPoint = (last, current, map) => {
  const [lx, ly] = last;
  const [cx, cy] = current;
  currentSymbol = map[cy][cx];
  if (['|', 'L', 'J', 'S'].includes(currentSymbol)) {
    const up = map[cy - 1]?.[cx];
    if (['|', '7', 'F', 'S'].includes(up)) {
      if (lx !== cx || ly !== cy - 1) {
        return [cx, cy - 1];
      }
    }
  }
  if (['-', 'L', 'F', 'S'].includes(currentSymbol)) {
    const right = map[cy]?.[cx + 1];
    if (['-', '7', 'J', 'S'].includes(right)) {
      if (lx !== cx + 1 || ly !== cy) {
        return [cx + 1, cy];
      }
    }
  }
  if (['-', '7', 'J', 'S'].includes(currentSymbol)) {
    const left = map[cy]?.[cx - 1];
    if (['-', 'F', 'L', 'S'].includes(left)) {
      if (lx !== cx - 1 || ly !== cy) {
        return [cx - 1, cy];
      }
    }
  }
  if (['|', 'F', '7', 'S'].includes(currentSymbol)) {
    const down = map[cy + 1]?.[cx];
    // console.log('down', down);
    // console.log('last', last);
    if (['|', 'J', 'L', 'S'].includes(down)) {
      if (lx !== cx || ly !== cy + 1) {
        return [cx, cy + 1];
      }
    }
  }
};

main();
