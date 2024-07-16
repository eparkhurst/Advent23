const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

let map;
const main = () => {
  map = fileContents.trim().split('\n');

  map.forEach((line) => {
    const hex = line.split('#')[1].replace(')', '');
    const dir = hex[5];
    const dist = parseInt(hex.slice(0, 5), 16);
    console.log(dir, dist);
  });

  console.log(map);
};

main();
