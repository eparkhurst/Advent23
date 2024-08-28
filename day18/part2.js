const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');
const dirEnum = {
  0: 'R',
  1: 'D',
  2: 'L',
  3: 'U',
};

// shoelace (x1*y2 - x2*y1) + (x2*y3 - x3*y2)... /2

let map;
const main = () => {
  map = fileContents.trim().split('\n');

  const bluePrint = [];
  map.forEach((line) => {
    const hex = line.split('#')[1].replace(')', '');
    const dir = parseInt(hex[5]);
    const direction = dirEnum[dir];
    const dist = parseInt(hex.slice(0, 5), 16);
    bluePrint.push({ dir: direction, dist });
  });

  const area = getArea(bluePrint);
  console.log(area);
};

const getArea = (bluePrint) => {
  let area = 0;
  let previousX = 0;
  let previousY = 0;

  for (const line of bluePrint) {
    const { dir, dist } = line;

    let nextX = previousX;
    let nextY = previousY;
    switch (dir) {
      case 'U':
        nextY = previousY - dist;
        break;
      case 'D':
        nextY = previousY + dist;
        break;
      case 'L':
        nextX = previousX - dist;
        break;
      case 'R':
        nextX = previousX + dist;
        break;

      default:
        console.log('should not happen');
        break;
    }
    const segment = previousX * nextY - previousY * nextX + dist;
    area += segment;
    previousX = nextX;
    previousY = nextY;
  }
  return area / 2 + 1;
};

//952408144115

main();
