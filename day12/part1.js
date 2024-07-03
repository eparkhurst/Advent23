const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split('\n');
  const ans = lines.reduce((total, line) => {
    total += countLine(line);
    return total;
  }, 0);
  console.log(ans);
};

const check = (code, groups) => {
  const hm = code.split('.').filter((char) => !!char);
  const nums = hm.map((set) => set.length);
  return JSON.stringify(nums) == groups;
};

const countLine = (line) => {
  const [code, groups] = line.split(' ');

  const recur = (front, back) => {
    if (back.length == 0) {
      return check(front, '[' + groups + ']') ? 1 : 0;
    }
    if (back[0] === '?') {
      return recur(front + '#', back.slice(1)) + recur(front + '.', back.slice(1));
    } else {
      return recur(front + back[0], back.slice(1));
    }
  };

  const total = recur('', code);
  return total;
};

main();

// console.log(check('.##..#....###.', [1, 1, 3]));
