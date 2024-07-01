const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

// Print the contents or use it as

const main = () => {
  const sections = fileContents.split('\n\n');
  const [directions, rawMap] = sections;
  const map = rawMap.split('\n').reduce((m, line) => {
    [key, vals] = line.split(' = ');
    values = vals.replace('(', '').replace(')', '').split(', ');
    m[key] = values;
    return m;
  }, {});

  let location = 'AAA';
  let steps = 0;
  dir = 0;
  while (steps < 99999999999) {
    steps++;
    const nextDir = directions[dir];
    dir++;
    if (dir >= directions.length) dir = 0;
    let nextLoc;
    if (nextDir === 'R') {
      nextLoc = map[location][1];
    } else {
      nextLoc = map[location][0];
    }
    if (nextLoc === 'ZZZ') {
      console.log(steps);
      return steps;
    } else {
      location = nextLoc;
    }
  }
};

main();
