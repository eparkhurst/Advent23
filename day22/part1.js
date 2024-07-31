const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');
const matrix = {};
let bricks = {};

const main = () => {
  lines = fileContents.trim().split('\n');

  buildMatrix(lines);

  dropBlocks();

  const count = checkBricks();

  console.log(count);
};

function checkBricks() {
  let count = 0;
  const keys = Object.keys(bricks);
  for (let j = 0; j < keys.length; j++) {
    const block = bricks[keys[j]];
    let vert = block.length > 1 ? block[0][2] !== block[1][2] : false;

    if (vert) {
      const last = block[block.length - 1];
      const [x, y, z] = last;
      if (!matrix[x]?.[y]?.[z + 1]) {
        count++;
        continue;
      }
    } else {
      let go = true;
      for (let i = 0; i < block.length; i++) {
        const [x, y, z] = block[i];
        if (matrix[x]?.[y]?.[z + 1]) {
          go = checkDouble(matrix[x]?.[y]?.[z + 1]);
          if (!go) break;
        }
      }
      if (go) count++;
    }
  }
  return count;
}

function checkDouble(label) {
  const checkBlock = bricks[label];
  let vert = checkBlock.length > 1 ? checkBlock[0][2] !== checkBlock[1][2] : true;
  if (vert) return false;
  const uset = new Set();
  checkBlock.forEach((pos) => {
    const [x, y, z] = pos;
    if (matrix[x][y][z - 1] && matrix[x][y][z - 1] !== label) {
      uset.add(matrix[x][y][z - 1]);
    }
  });
  return uset.size > 1;
}
// { brick: [ [x,y,z], [x2,y2,z2] ]}

function dropBlocks() {
  const rawBlocks = Object.values(bricks);
  rawBlocks.sort((a, b) => a[0][2] - b[0][2]);
  for (let j = 0; j < rawBlocks.length; j++) {
    const block = rawBlocks[j];
    let go = true;
    let vert = block.length > 1 ? block[0][2] !== block[1][2] : false;
    const [w, e, r] = block[0];
    const letter = matrix[w][e][r];
    while (go) {
      for (let i = 0; i < block.length; i++) {
        const [x, y, z] = block[i];

        if (matrix[x]?.[y]?.[z - 1] || z == 1) {
          go = false;
          break;
        }
        if (vert) {
          break;
        }
      }
      if (go) {
        for (let i = 0; i < block.length; i++) {
          const [x, y, z] = block[i];
          delete matrix[x][y][z];
          matrix[x][y][z - 1] = letter;
          bricks[letter][i] = [x, y, z - 1];
        }
      }
    }
  }
  console.log(bricks);
}

function buildMatrix(lines) {
  lines.forEach((line, ind) => {
    const name = getLabel(ind);
    const [start, end] = line.split('~');
    const [x, y, z] = start.split(',').map((n) => Number(n));
    const [ex, ey, ez] = end.split(',').map((n) => Number(n));

    block = [];
    addtoMatrix(x, y, z, name);
    if (ex !== x) {
      min = Math.min(ex, x);
      max = Math.max(ex, x);
      for (let i = min; i <= max; i++) {
        addtoMatrix(i, y, z, name);
        block.push([i, y, z]);
      }
    } else if (ey !== y) {
      min = Math.min(ey, y);
      max = Math.max(ey, y);
      for (let i = min; i <= max; i++) {
        addtoMatrix(x, i, z, name);
        block.push([x, i, z]);
      }
    } else if (ez !== z) {
      min = Math.min(ez, z);
      max = Math.max(ez, z);
      for (let i = min; i <= max; i++) {
        addtoMatrix(x, y, i, name);
        block.push([x, y, i]);
      }
    } else {
      addtoMatrix(x, y, z, name);
      block.push([x, y, z]);
    }
    if (block.length < 1) {
      console.log(line);
    }
    bricks[name] = block;
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

function getLabel(n) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  while (n >= 0) {
    result = alphabet[n % 26] + result;
    n = Math.floor(n / 26) - 1; // Shift and account for 0-indexing
  }

  return result;
}

main();
// 427 too high
// 426 too high
// 424 too high
// 391 is correct
// 386 wrong

// gave up
