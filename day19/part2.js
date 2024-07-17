const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

let wDict = {};
let approved = [];
let rejected = [];

const main = () => {
  const [workflows, parts] = fileContents.trim().split('\n\n');
  workflows.split('\n').forEach((w) => {
    const [label, rest] = w.split('{');
    const rules = rest.replace('}', '').split(',');
    wDict[label] = rules;
  });
  const ranges = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  };
  walkTree('in', ranges);

  let final = 0;
  approved.forEach((r) => {
    const num = getCount(r);
    final += num;
  });
  console.log(final);
};

function getCount(ranges) {
  return Object.values(ranges).reduce((p, c) => {
    const catTot = c[1] - c[0] + 1;
    p = p * catTot;
    return p;
  }, 1);
}

function walkTree(wf, ranges) {
  if (wf == 'A') {
    approved.push({ ...ranges });
    return;
  } else if (wf == 'R') {
    rejected.push(ranges);
    return;
  }

  const rules = wDict[wf];
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule.includes(':')) {
      return walkTree(rule, ranges);
    }

    const [r, next] = rule.split(':');
    if (r.includes('<')) {
      // x < 500
      const [label, val] = r.split('<');
      const nextRanges = JSON.parse(JSON.stringify(ranges));
      if (Number(val) - 1 < nextRanges[label][1]) {
        nextRanges[label][1] = Number(val) - 1;
      }
      if (nextRanges[label][1] > nextRanges[label][0]) {
        walkTree(next, nextRanges);
      }
      if (Number(val) < ranges[label][1]) {
        ranges[label][0] = Number(val);
      } else {
        return;
      }
    }
    if (r.includes('>')) {
      // m > 356
      const [label, val] = r.split('>');
      const nextRanges = JSON.parse(JSON.stringify(ranges));
      if (Number(val) + 1 > nextRanges[label][0]) {
        nextRanges[label][0] = Number(val) + 1;
      }
      if (nextRanges[label][1] > nextRanges[label][0]) {
        walkTree(next, nextRanges);
      }
      if (Number(val) > ranges[label][0]) {
        ranges[label][1] = Number(val);
      } else {
        return;
      }
    }
  }
}

main();
