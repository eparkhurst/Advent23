const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const system = {};

const main = () => {
  lines = fileContents.trim().split('\n');
  generateSystem(lines);

  const bins = [];
  system.broadcaster.dest.map((l) => {
    const bin = getBin(l);
    const n = parseInt(bin.split('').reverse().join(''), 2);
    bins.push(n);
  });
  console.log(bins);
  console.log(findLCM(bins));
};

function getBin(label) {
  let bin = '';
  next = label;
  while (next) {
    const node = system[next];
    if (node.dest.length == 2) {
      bin += '1';
      if (system[node.dest[0]].type === '&') {
        next = node.dest[1];
      } else {
        next = node.dest[0];
      }
    } else {
      if (system[node.dest[0]].type === '&') {
        return (bin += '1');
      } else {
        bin += '0';
      }
      next = node.dest[0];
    }
  }
}

function generateSystem(lines) {
  lines.forEach((l) => {
    const [name, dest] = l.split(' -> ');
    if (name === 'broadcaster') {
      system['broadcaster'] = {
        type: 'broadcaster',
        dest: dest.split(', '),
      };
    } else {
      const type = name[0];
      const label = name.substring(1);
      let cState = {};
      if (type == '&') {
        lines.forEach((il) => {
          const [n, d] = il.split(' -> ');
          const iLabel = n.substring(1);
          const arr = d.split(', ');
          if (arr.includes(label)) {
            cState[iLabel] = false;
          }
        });
      }

      system[label] = {
        state: type == '%' ? false : cState,
        type,
        dest: dest.split(', '),
      };
    }
  });
}

function findLCM(arr) {
  function gcd(a, b) {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  }

  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
  return arr.reduce((accumulator, currentValue) => lcm(accumulator, currentValue));
}

main();
