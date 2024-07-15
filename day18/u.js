const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  lines = fileContents.trim().split('\n');
  let count = 0;
  const map = getMap(lines);
  const pretty = [];
  const mins = [];
  Object.keys(map)
    .sort((a, b) => Number(a) - Number(b))
    .forEach((y) => {
      const row = Object.keys(map[y]).sort((a, b) => Number(a) - Number(b));
      // console.log(row);
      const min = Number(row[0]);
      mins.push(min);
      const max = Number(row[row.length - 1]);
      const strRow = Array(max + 56).fill('.');
      // count += max - min + 1;
      let inside = true;
      for (let x = 0; x < row.length; x++) {
        const col = Number(row[x]);
        strRow[col + 55] = '#';
        if (x == 0) count++;
        else if (Number(row[x - 1]) !== Number(row[x]) - 1) {
          if (inside) {
            count += Number(row[x]) - Number(row[x - 1]);
          } else {
            count++;
          }
          inside = !inside;
        } else {
          count++;
        }
      }
      pretty.push(strRow);
    });

  pretty.map((r) => {
    console.log(r.join(''));
  });

  let c2 = 0;
  pretty.forEach((row) => {
    c2 += countRow(row);
  });
  console.log(count);
  console.log(c2);
};

function countRow(row) {
  let inside = false;
  let count = 0;
  for (let i = 0; i < row.length; i++) {
    if (row[i] === '#') {
      if (i == 0) {
        inside = true;
      } else if (row[i - 1] == '.') {
        inside = !inside;
      }
      count++;
    } else if (inside) {
      count++;
    }
  }
  return count;
}

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
