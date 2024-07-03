const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const smaps = fileContents.trim().split('\n\n');
  const maps = smaps.map((m) => {
    return m.split('\n');
  });

  const final = maps.reduce((tot, map) => {
    const y = findHorizontal(map);
    if (!y) {
      const flipped = flip(map);
      const x = findHorizontal(flipped);
      tot += x;
    } else {
      tot += y * 100;
    }
    return tot;
  }, 0);

  console.log(final);
};

const findHorizontal = (map) => {
  let last = map[0];
  for (let i = 1; i < map.length; i++) {
    if (map[i] == last) {
      if (testHorizontal(map, i)) return i;
    } else if (offByOne(map[i], last)) {
      if (testHorizontal(map, i)) return i;
    }
    last = map[i];
  }
  return false;
};

const flip = (map) => {
  const flipped = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (i == 0) flipped.push(map[i][j]);
      else {
        flipped[j] = flipped[j] + map[i][j];
      }
      const element = map[i][j];
    }
  }
  return flipped;
};

const testHorizontal = (map, y) => {
  let smudge = false;
  let top = y - 1;
  let b = y;
  while (top >= 0 && b < map.length) {
    if (map[top] !== map[b]) {
      if (offByOne(map[top], map[b])) {
        if (smudge) return false;
        smudge = true;
      } else {
        return false;
      }
    }
    top--;
    b++;
  }
  return smudge;
};

main();

function offByOne(line1, line2) {
  let index = false;
  for (let i = 0; i < line1.length; i++) {
    if (line1[i] !== line2[i]) {
      if (!index) {
        index = true;
      } else {
        return false;
      }
    }
  }
  return index;
}

// console.log(check('.##..#....###.', [1, 1, 3]));
// if (first > 0) return 1;
// const last = offByOne(map[map.length-1], map[map.length-2]);
// if(last >0) return map.length - 2
