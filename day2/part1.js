const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');
const maxColors = {
  red: 12,
  green: 13,
  blue: 14,
};

const main = () => {
  const lines = fileContents.split('\n');
  const answer = lines.reduce((total, line) => {
    const lineArr = line.split(':');
    const gameLabel = lineArr[0];
    const gameNumbers = lineArr[1];
    const gameId = gameLabel.split(' ')[1];
    const games = gameNumbers.split(';');
    for (let i = 0; i < games.length; i++) {
      const sets = games[i].trim().split(',');
      for (let j = 0; j < sets.length; j++) {
        const set = sets[j];
        const [num, color] = set.trim().split(' ');
        if (Number(num) > maxColors[color]) {
          return total;
        }
      }
    }
    total += Number(gameId);
    return total;
  }, 0);

  console.log(lines);
  console.log(answer);
};

main();
