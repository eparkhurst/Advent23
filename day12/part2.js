const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

function memoize(func) {
  const stored = new Map();
  return (...args) => {
    const k = JSON.stringify(args);
    if (stored.has(k)) {
      return stored.get(k);
    }
    const result = func(...args);
    stored.set(k, result);
    return result;
  };
}

const main = () => {
  const startTime = performance.now();
  const lines = fileContents.trim().split('\n');
  const ans = lines.reduce((total, line) => {
    total += countLine(line);
    return total;
  }, 0);
  console.log(performance.now() - startTime);
  console.log('final', ans);
};

const countLine = (line) => {
  // const [code, ngroups] = line.split(' ');
  const [oCode, strgroups] = line.split(' ');
  const bCode = [...Array(5).fill(oCode)];
  const code = bCode.join('?');
  const bgroup = [...Array(5).fill(strgroups)];
  const ngroups = bgroup.join(',');
  const groups = ngroups.split(',').map((c) => Number(c));

  const total = recur(code, groups);
  return total;
};

const recur = memoize((line, groups) => {
  if (line.length === 0) {
    if (groups.length === 0) {
      return 1;
    } else {
      return 0;
    }
  }
  if (groups.length === 0) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '#') return 0;
    }
    return 1;
  }

  if (line.length < groups.reduce((p, c) => p + c, 0) + groups.length - 1) {
    // The line is not long enough for all runs
    return 0;
  }

  if (line[0] == '.') {
    return recur(line.slice(1), groups);
  }
  if (line[0] == '#') {
    const [group, ...restGroups] = groups;
    for (let i = 0; i < group; i++) {
      if (line[i] == '.') {
        return 0;
      }
    }
    if (line[group] === '#') {
      return 0;
    }
    // tricky, tricky the +1 is to force a . next
    return recur(line.slice(group + 1), restGroups);
  }
  // if ?
  return recur('#' + line.slice(1), groups) + recur('.' + line.slice(1), groups);
});

main();
