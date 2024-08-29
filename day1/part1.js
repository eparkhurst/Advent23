const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');
const stringNums = '1234567890';

const main = () => {
  const lines = fileContents.split('\n');
  const total = lines.reduce((total, line) => {
    let firstNum, lastNum;
    line.split('').forEach((char) => {
      if (stringNums.includes(char)) {
        lastNum = char;
        if (firstNum == undefined) {
          firstNum = char;
        }
      }
    });
    const lineTotal = firstNum + lastNum;
    return (total += Number(lineTotal));
  }, 0);
  console.log(total);
};

main();
