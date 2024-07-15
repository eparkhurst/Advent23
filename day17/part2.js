const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const map = fileContents.trim().split('\n');

  console.log(map);
};

main();
