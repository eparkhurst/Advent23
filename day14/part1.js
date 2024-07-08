const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split('\n');
  const rockMap = lines.map((m) => m.split(''));
  const shifted = shiftNorth(rockMap);

  const final = shifted.reduce((tot, line, i) => {
    const val = shifted.length - i;
    const lineTotal = line.reduce((lt, char) => {
      if (char === 'O') lt += val;
      return lt;
    }, 0);
    return (tot += lineTotal);
  }, 0);

  console.log(final);
};

const shiftNorth = (map) => {
  const newMap = [];
  map.forEach((row, y) => {
    const newRow = [];

    row.forEach((char, x) => {
      if (y == 0) {
        newRow.push(char);
      } else if (char === 'O') {
        let done = false;
        for (let i = y - 1; i >= 0; i--) {
          if (newMap[i][x] !== '.') {
            if (i === y - 1) {
              newRow.push('O');
            } else {
              newMap[i + 1][x] = 'O';
              newRow.push('.');
            }
            done = true;
            break;
          }
        }
        if (!done) {
          newMap[0][x] = 'O';
          newRow.push('.');
        }
      } else {
        newRow.push(char);
      }
    });
    newMap.push(newRow);
  });

  return newMap;
};

main();
