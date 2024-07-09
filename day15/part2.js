const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

const main = () => {
  const lines = fileContents.trim().split(',');
  const boxes = [];
  for (let i = 0; i < 256; i++) {
    boxes.push([]);
  }
  lines.forEach((line) => {
    if (line.includes('=')) {
      const [label, focal] = line.split('=');
      const hash = hashLine(label);
      const index = boxes[hash].findIndex((l) => {
        return l[0] === label;
      });
      if (index > -1) {
        boxes[hash][index] = [label, focal];
      } else {
        boxes[hash].push([label, focal]);
      }
    } else {
      const [label] = line.split('-');
      const hash = hashLine(label);
      boxes[hash] = boxes[hash].filter((l) => {
        return l[0] != label;
      });
    }
  });
  const ans = boxes.reduce((tot, box, i) => {
    const lensPower = box.reduce((p, l, j) => {
      let n = (1 + i) * (1 + j) * l[1];

      return p + n;
    }, 0);
    return tot + lensPower;
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
