const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8');

let wDict = {};
const approved = [];

const main = () => {
  const [workflows, parts] = fileContents.trim().split('\n\n');
  workflows.split('\n').forEach((w) => {
    const [label, rest] = w.split('{');
    const rules = rest.replace('}', '').split(',');
    wDict[label] = rules;
  });

  const oParts = formatParts(parts);
  oParts.forEach((p) => {
    assignPart(p, 'in');
  });

  console.log(approved);

  const ans = countParts();
  console.log(ans);
};

function formatParts(partsBlock) {
  return partsBlock.split('\n').map((p) => {
    const obj = {};
    const arr = p.replace('}', '').replace('{', '').split(',');
    arr.forEach((pr) => {
      const [label, val] = pr.split('=');
      obj[label] = Number(val);
    });
    return obj;
  });
}

function countParts() {
  return approved.reduce((tot, p) => {
    const pTot = Object.values(p).reduce((t, v) => {
      t += v;
      return t;
    }, 0);
    tot += pTot;
    return tot;
  }, 0);
}

function assignPart(part, wf) {
  if (wf == 'A') {
    approved.push(part);
    return;
  } else if (wf == 'R') {
    return;
  }

  const rules = wDict[wf];
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (!rule.includes(':')) {
      return assignPart(part, rule);
    }

    const [r, next] = rule.split(':');
    if (r.includes('<')) {
      const [label, val] = r.split('<');
      if (part[label] < Number(val)) {
        return assignPart(part, next);
      }
    }
    if (r.includes('>')) {
      const [label, val] = r.split('>');
      if (part[label] > Number(val)) {
        return assignPart(part, next);
      }
    }
  }
}
main();
