const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const symbols = '!@#$%/|^&*()+-=';

const main = () => {
  let total = 0;
  const lines = fileContents.split('\n');
  matrix = lines.map((line) => line.split(''));
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const char = matrix[i][j];
      if (symbols.includes(char)) {
        const adjTotal = findAdjacentNumbers(j, i, matrix);
        if (adjTotal) {
          total += adjTotal;
        }
      }
    }
  }
  console.log(total);
};

const findAdjacentNumbers = (x, y, matrix) => {
  let total = 0;
  const dirs = [
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
  ];
  dirs.forEach((dir) => {
    const [aX, aY] = dir;
    if (!isNaN(matrix[aY][aX])) {
      const num = getFullNumber(aX, aY, matrix);
      total += Number(num);
    }
  });
  return total;
};

const getFullNumber = (x, y, matrix) => {
  const row = matrix[y];
  let num = row[x];
  let l = x - 1;
  let r = x + 1;
  while (typeof l == 'number' || typeof r == 'number') {
    if (typeof l == 'number' && !isNaN(row[l])) {
      num = row[l] + num;
      matrix[y][l] = '.';
      l--;
    } else {
      l = 'false'; // I don't like this
    }
    if (typeof r == 'number' && !isNaN(row[r])) {
      num = num + row[r];
      matrix[y][r] = '.';
      r++;
    } else {
      r = 'false';
    }
  }
  return num;
};

main();
// console.log(isNaN('false'));
