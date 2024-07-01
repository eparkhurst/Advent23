const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

// Print the contents or use it as

const main = () => {
  const lines = fileContents.trim().split('\n');
  readings = lines.map((line) => {
    return line.split(' ').map((n) => Number(n));
  });
  const total = readings.reduce((p, c) => {
    const num = getNextNumber(c);
    return p + num;
  }, 0);

  console.log(total);
};

const getNextNumber = (arr) => {
  let go = true;
  const lastNums = [arr.slice(-1)[0]];
  let currentArr = arr;
  while (go) {
    currentArr = getDirivatives(currentArr);
    const lastNum = currentArr.slice(-1)[0];
    if (lastNum === 0 && currentArr[0] === 0) {
      go = false;
    }
    lastNums.push(lastNum);
  }
  return lastNums.reduce((p, c) => {
    return p + c;
  }, 0);
};

const getDirivatives = (arr) => {
  return arr.reduce((p, c, i, arr) => {
    if (i === 0) return p;
    const diff = c - arr[i - 1];
    p.push(diff);
    return p;
  }, []);
};

main();

//2101499003 too high
