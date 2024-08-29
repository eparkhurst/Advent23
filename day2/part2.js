const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const defaultColors = {
  red: 0,
  green: 0,
  blue: 0,
};

const main = () => {
  let maxColors = { ...defaultColors };
  const lines = fileContents.split('\n');
  const answer = lines.reduce((total, line) => {
    const lineArr = line.split(':');
    const gameNumbers = lineArr[1];
    const games = gameNumbers.split(';');

    for (let i = 0; i < games.length; i++) {
      const sets = games[i].trim().split(',');
      for (let j = 0; j < sets.length; j++) {
        const set = sets[j];
        const [num, color] = set.trim().split(' ');
        if (Number(num) > maxColors[color]) {
          maxColors[color] = Number(num);
        }
      }
    }
    const gameTotal = Object.values(maxColors).reduce((tot, value) => {
      return tot * Number(value);
    }, 1);
    total += gameTotal;
    maxColors = { ...defaultColors };
    return total;
  }, 0);

  console.log(answer);
};

main();
