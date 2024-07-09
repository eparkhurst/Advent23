const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split(',');
  const ans = lines.reduce((sum, line) => {
    sum += hashLine(line);
    return sum;
  }, 0);
  console.log(ans);
};

function hashLine(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    hash += code;
    hash = hash * 17;
    hash = hash % 256;
  }
  return hash;
}

main();
