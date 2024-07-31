const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

const main = () => {
  lines = fileContents.trim().split('\n');
  console.log(lines);
};

main();
