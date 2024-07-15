const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

let map;
const main = () => {
  map = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)));

  console.log(map);
};

main();
