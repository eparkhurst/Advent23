const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split('\n');
  const [cols, rows] = getEmpty(lines);
  const sum = countDistance(lines, cols, rows);
  console.log(sum);
};

const getEmpty = (original) => {
  const expanded = [];
  const columns = Array(original[0].length).fill(1);
  const emptyRows = [];
  original.forEach((line, row) => {
    for (let i = 0; i < line.length; i++) {
      if (line[i] == '#') {
        columns[i] = 0;
      }
    }
    if (!line.includes('#')) {
      emptyRows.push(row);
    }
  });
  const indices = columns.reduce((p, c, i) => {
    if (c) {
      p.push(i);
    }
    return p;
  }, []);
  return [indices, emptyRows];
};

const countDistance = (universe, cols, rows) => {
  const galaxies = [];
  for (let i = 0; i < universe.length; i++) {
    for (let j = 0; j < universe[i].length; j++) {
      const element = universe[i][j];
      if (element === '#') {
        galaxies.push([j, i]);
      }
    }
  }
  const aGals = galaxies.map((gal) => {
    return getLoc(gal, cols, rows);
  });
  return aGals.reduce((total, c, i, gals) => {
    for (let j = i + 1; j < gals.length; j++) {
      const otherGal = gals[j];
      const xDif = Math.abs(c[0] - otherGal[0]);
      const yDif = Math.abs(c[1] - otherGal[1]);
      total += yDif + xDif;
    }
    return total;
  }, 0);
};

const getLoc = (pos, cols, rows) => {
  const [x, y] = pos;
  const rToAdd = rows.filter((r) => r < y).length * 999999;
  const cToAdd = cols.filter((c) => c < x).length * 999999;
  return [x + cToAdd, y + rToAdd];
};
main();
