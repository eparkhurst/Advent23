const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split('\n');
  const rockMap = lines.map((m) => m.split(''));

  const snaps = [];
  let firstI;
  let repLength;
  for (let i = 0; i < 1000; i++) {
    shiftNorth(rockMap);
    shifWest(rockMap);
    shiftSouth(rockMap);
    shiftEast(rockMap);

    const snap = JSON.stringify(rockMap);
    if (snaps.includes(snap)) {
      firstI = snaps.indexOf(snap);
      repLength = i - firstI;
      console.log('The pattern starts at', firstI, 'and repeats', repLength, 'times');
      break;
    }
    snaps.push(snap);
  }
  const rem = (1000000000 - firstI - 1) % repLength;
  const ansIndex = rem + firstI;
  const answer = getLoad(JSON.parse(snaps[ansIndex]));
  console.log(answer);
};

const getLoad = (rockMap) => {
  const final = rockMap.reduce((tot, line, i) => {
    const val = rockMap.length - i;
    const lineTotal = line.reduce((lt, char) => {
      if (char === 'O') lt += val;
      return lt;
    }, 0);
    return (tot += lineTotal);
  }, 0);
  return final;
};

const shiftNorth = (map) => {
  map.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char == 'O') {
        for (let i = y - 1; i >= 0; i--) {
          const nChar = map[i][x];
          if (nChar == '.') {
            map[i][x] = 'O';
            map[i + 1][x] = '.';
          } else {
            break;
          }
        }
      }
    });
  });

  return map;
};

const shifWest = (map) => {
  map.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char == 'O') {
        for (let i = x - 1; i >= 0; i--) {
          const nChar = map[y][i];
          if (nChar == '.') {
            map[y][i] = 'O';
            map[y][i + 1] = '.';
          } else {
            break;
          }
        }
      }
    });
  });

  return map;
};

const shiftSouth = (map) => {
  for (let y = map.length - 1; y >= 0; y--) {
    const row = map[y];

    row.forEach((char, x) => {
      if (char == 'O') {
        for (let i = y + 1; i < map.length; i++) {
          const nChar = map[i][x];
          if (nChar == '.') {
            map[i][x] = 'O';
            map[i - 1][x] = '.';
          } else {
            break;
          }
        }
      }
    });
  }

  return map;
};

const shiftEast = (map) => {
  map.forEach((row, y) => {
    for (let x = row.length - 1; x >= 0; x--) {
      const char = row[x];
      if (char == 'O') {
        for (let i = x + 1; i < row.length; i++) {
          const nChar = map[y][i];
          if (nChar == '.') {
            map[y][i] = 'O';
            map[y][i - 1] = '.';
          } else {
            break;
          }
        }
      }
    }
  });

  return map;
};

main();

//85157 too low
