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

  let locations = Object.keys(map).filter((key) => key[2] == 'A');
  console.log(locations);
  let steps = 0;
  dir = 0;
  const finishes = [];
  const times = {};
  while (steps < 100000) {
    steps++;
    const nextDir = directions[dir];
    dir++;
    if (dir >= directions.length) dir = 0;

    let zends = 0;
    locations = locations.map((loc, i) => {
      let nextLoc;
      if (nextDir === 'R') {
        nextLoc = map[loc][1];
      } else {
        nextLoc = map[loc][0];
      }
      if (nextLoc[2] == 'Z') {
        if (!finishes[i]) {
          if (!times[i]) {
            times[i] = {
              start: finishes[i],
              duration: steps - finishes[i],
            };
          }
          finishes[i] = steps;
        }
        zends++;
      }
      return nextLoc;
    });
    if (zends === locations.length) {
      console.log(steps);
      return steps;
    }
  }

  console.log('Total Steps', lcmArray(finishes)); // had to use least common multiple
};

main();

function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Function to compute the Least Common Multiple (LCM) of two numbers
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// Function to compute the LCM of an array of numbers
function lcmArray(arr) {
  return arr.reduce((acc, num) => lcm(acc, num), 1);
}
