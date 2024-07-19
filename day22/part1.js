const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const matrix = {};
let blocks = [];
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

const main = () => {
  lines = fileContents.trim().split('\n');

  buildMatrix(lines);
  blocks.sort((a, b) => a[0][2] - b[0][2]);

  console.log(blocks);
};

function buildMatrix(lines) {
  lines.forEach((line, b) => {
    const a = alphabet[b];
    const [start, end] = line.split('~');
    const [x, y, z] = start.split(',').map((n) => Number(n));
    const [ex, ey, ez] = end.split(',').map((n) => Number(n));

    block = [];
    addtoMatrix(x, y, z, a);
    if (ex !== x) {
      min = Math.min(ex, x);
      max = Math.max(ex, x);
      for (let i = min; i <= max; i++) {
        addtoMatrix(i, y, z, a);
        block.push([i, y, z]);
      }
    }
    if (ey !== y) {
      min = Math.min(ey, y);
      max = Math.max(ey, y);
      for (let i = min; i <= max; i++) {
        addtoMatrix(x, i, z, a);
        block.push([x, i, z]);
      }
    }
    if (ez !== z) {
      min = Math.min(ez, z);
      max = Math.max(ez, z);
      for (let i = min; i <= max; i++) {
        addtoMatrix(x, y, i, a);
        block.push([x, y, i]);
      }
    }
    blocks.push(block);
  });
}

function addtoMatrix(x, y, z, label) {
  if (matrix[x]) {
    if (matrix[x][y]) {
      matrix[x][y][z] = label;
    } else {
      matrix[x][y] = {
        [z]: label,
      };
    }
  } else {
    matrix[x] = {
      [y]: {
        [z]: label,
      },
    };
  }
}

main();
const b = {
  0: {
    0: { 2: 'B', 4: 'D' },
    1: { 4: 'D', 6: 'F' },
    2: { 3: 'C' },
  },
  1: {
    0: { 1: 'A', 2: 'B' },
    1: { 1: 'A', 6: 'F', 8: 'G' },
    2: { 3: 'C' },
  },
  2: { 0: { 5: 'E' }, 1: { 5: 'E' } },
};
