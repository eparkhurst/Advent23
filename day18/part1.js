const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  lines = fileContents.trim().split('\n');
  let count = 0;
  const map = getMap(lines);
  const sorted = Object.keys(map).sort((a, b) => Number(a) - Number(b));
  const yMin = Number(sorted[0]);
  const yMax = Number(sorted[sorted.length - 1]);
  let xMax = 0;
  let xMin = 0;
  Object.keys(map).forEach((r) => {
    const rsorted = Object.keys(map[r]).sort((a, b) => Number(a) - Number(b));
    if (Number(rsorted[0]) < xMin) xMin = Number(rsorted[0]);
    if (Number(rsorted[rsorted.length - 1]) > xMax) xMax = Number(rsorted[rsorted.length - 1]);
  });

  const rows = Array(yMax - yMin + 1).fill([]);
  const pretty = rows.map((r) => {
    return Array(xMax - xMin + 1).fill('.');
  });

  const xDif = xMin < 0 ? xMin * -1 : xMin;
  let perimeter = 0;
  sorted.forEach((y, i) => {
    const row = Object.keys(map[y]).sort((a, b) => Number(a) - Number(b));
    for (let x = 0; x < row.length; x++) {
      const col = Number(row[x]);
      pretty[i][col + xDif] = '#';
      perimeter++;
    }
  });
  let starty;
  for (let i = 0; i < pretty.length; i++) {
    const r = pretty[i];
    if (!starty && r[0] == '#' && r[1] == '.') {
      starty = i;
      break;
    }
  }
  // pretty.map((r, i) => {
  //   console.log(r.join(''));
  // });
  console.log(pretty[starty].join(''));
  const rl = xMax - xMin + 1;
  console.log(xMax, xMin, rl);
  const cl = yMax - yMin + 1;
  console.log(yMax, yMin, cl);
  let visited = {};
  for (let i = 0; i < rl; i++) {
    visited['' + i] = {};
  }

  const directions = [
    [-1, 0], // Up
    [1, 0], // Down
    [0, -1], // Left
    [0, 1], // Right
  ];

  floodFill(2, starty);
  // Helper function to perform flood fill iteratively
  function floodFill(x, y) {
    let queue = [[x, y]];

    while (queue.length > 0) {
      let [cx, cy] = queue.shift();
      if (cx < 0 || cx >= rl || cy < 0 || cy >= cl) continue;
      if (pretty[cy][cx] === '#' || visited[cx][cy]) continue;

      visited[cx][cy] = true;
      count++;

      for (let [dx, dy] of directions) {
        let nx = cx + dx;
        let ny = cy + dy;
        if (nx >= 0 && nx < rl && ny >= 0 && ny < cl && !visited[nx][ny] && pretty[ny][nx] === '.') {
          queue.push([nx, ny]);
        }
      }
    }
  }

  console.log(count, perimeter);
  console.log(count + perimeter);
};

function getMap(lines) {
  const map = {};

  let x = 0;
  let y = 0;
  const plan = lines.map((line) => {
    const [l, r] = line.split('(');
    const [dir, dist] = l.trim().split(' ');
    return [dir, Number(dist)];
  });
  plan.forEach((line) => {
    const [dir, dist] = line;
    if (dir == 'R') {
      const max = dist + x + 1;
      for (let i = x; i < max; i++) {
        x = i;
        addToMap(x, y, map);
      }
    }
    if (dir == 'L') {
      const min = x - dist;
      for (let i = x; i >= min; i--) {
        x = i;
        addToMap(x, y, map);
      }
    }
    if (dir == 'U') {
      const min = y - dist;
      for (let i = y; i >= min; i--) {
        y = i;
        addToMap(x, y, map);
      }
    }
    if (dir == 'D') {
      const max = dist + y + 1;
      for (let i = y; i < max; i++) {
        y = i;
        addToMap(x, y, map);
      }
    }
  });
  return map;
}

function addToMap(x, y, map) {
  if (!map[y]) {
    map[y] = {};
  }
  map[y][x] = '#';
}
main();

const p = '..............#...#..#####';
// console.log(countRow(p));

//10608 too low
// 11195 too low
// 46803 too low
// 57030 wrong

//correct? = 50603
