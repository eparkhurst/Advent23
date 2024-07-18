const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const system = {};

let low = 0; // button push
let high = 0;

const main = () => {
  lines = fileContents.trim().split('\n');
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
  const snap = JSON.stringify(system);

  let count = 0;
  while (count < 1000) {
    count++;
    runSytem();
    if (JSON.stringify(system) === snap) {
      break;
    }
  }
  console.log(count);
  const multiple = Math.floor(1000 / count);
  const remainder = 1000 % count;
  high = high * multiple;
  low = low * multiple;
  if (remainder) {
    console.log('remainder', remainder);
    for (let i = 0; i < remainder; i++) {
      runSytem();
    }
  }
  console.log(high * low);
};

function runSytem() {
  const queue = [];
  low++;
  system['broadcaster'].dest.forEach((label) => {
    queue.push([label, false]);
  });

  while (queue.length) {
    const next = queue.shift();
    const [label, pulse, from] = next;
    if (pulse) {
      high++;
    } else {
      low++;
    }

    if (!system[label]) {
      // console.log(label, pulse, from);
      continue;
    }
    if (system[label].type === '%') {
      if (!pulse) {
        system[label].state = !system[label].state;
        system[label].dest.forEach((d) => {
          queue.push([d, system[label].state, label]);
        });
      }
    } else if (system[label].type === '&') {
      system[label].state[from] = pulse;
      let on = true;
      const vals = Object.values(system[label].state);
      for (let i = 0; i < vals.length; i++) {
        const pulse = vals[i];
        if (!pulse) {
          on = false;
          break;
        }
      }
      if (on) {
        system[label].dest.forEach((d) => {
          queue.push([d, false, label]);
        });
      } else {
        system[label].dest.forEach((d) => {
          queue.push([d, true, label]);
        });
      }
    } else {
      console.log('how', system[label].type);
    }
  }
}

main();
// 718131582 too low
