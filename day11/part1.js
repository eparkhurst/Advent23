const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split('\n');
  const expanded = expand(lines);
  const sum = countDistance(expanded);
  console.log(sum);
};

const expand = (original) => {
  const expanded = [];
  const columns = Array(original[0].length).fill(1);
  original.forEach((line) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == '#') {
        columns[i] = 0;
      }
    }
    if (!line.includes('#')) {
      expanded.push(Array(line.length).fill('.').join(''));
    }
    expanded.push(line);
  });
  const indices = columns.reduce((p, c, i) => {
    if (c) {
      p.push(i);
    }
    return p;
  }, []);
  return expanded.map((line) => {
    return line.split('').reduce((p, c, i) => {
      if (indices.includes(i)) {
        p += '.';
      }
      p += c;
      return p;
    }, '');
  });
};

const countDistance = (universe) => {
  const galaxies = [];
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      const element = universe[i][j];
      if (element === '#') {
        galaxies.push([j, i]);
      }
    }
  }
  return galaxies.reduce((total, c, i, gals) => {
    for (let j = i + 1; j < gals.length; j++) {
      const otherGal = gals[j];
      const xDif = Math.abs(c[0] - otherGal[0]);
      const yDif = Math.abs(c[1] - otherGal[1]);
      total += yDif + xDif;
    }
    return total;
  }, 0);
};

main();
