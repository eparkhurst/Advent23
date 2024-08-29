const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');
const stringNums = '1234567890';
const wordNums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const main = () => {
  const lines = fileContents.split('\n');
  const total = lines.reduce((total, line) => {
    let firstNum, lastNum;
    let prevLetters = '';
    line.split('').forEach((char) => {
      if (stringNums.includes(char)) {
        lastNum = char;
        if (firstNum === undefined) {
          firstNum = char;
        }
        prevLetters = '';
      } else {
        prevLetters += char;
        if (prevLetters.length > 2) {
          for (let i = 0; i < wordNums.length; i++) {
            const word = wordNums[i];
            if (prevLetters.includes(word)) {
              lastNum = i + 1 + '';
              if (firstNum === undefined) {
                firstNum = i + 1 + '';
              }
              prevLetters = prevLetters[prevLetters.length - 1];
            }
          }
        }
      }
    });
    const lineTotal = firstNum + lastNum;
    return (total += Number(lineTotal));
  }, 0);
  console.log(total);
};

main();
