const fs = require('fs');
const path = require('path');

const fileContents = fs.readFileSync(path.resolve(__dirname, './data.txt'), 'utf-8');

let map;
const main = () => {
  map = fileContents
    .trim()
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)));

  const rows = map.length;
  const columns = map[0].length;
  const graph = {};
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const vertical = (graph[`vertical(${x},${y})`] = {});
      const horizontal = (graph[`horizontal(${x},${y})`] = {});
      for (let i = 4; i <= 10; i++) {
        if (y + i >= 0 && y + i < rows)
          vertical[`horizontal(${x},${y + i})`] = Array(i)
            .fill(0)
            .reduce((a, _, j) => a + map[y + j + 1][x], 0);

        if (y - i >= 0 && y - i < rows)
          vertical[`horizontal(${x},${y - i})`] = Array(i)
            .fill(0)
            .reduce((a, _, j) => a + map[y - j - 1][x], 0);
        if (x + i >= 0 && x + i < columns)
          horizontal[`vertical(${x + i},${y})`] = Array(i)
            .fill(0)
            .reduce((a, _, j) => a + map[y][x + j + 1], 0);
        if (x - i >= 0 && x - i < columns)
          horizontal[`vertical(${x - i},${y})`] = Array(i)
            .fill(0)
            .reduce((a, _, j) => a + map[y][x - j - 1], 0);
      }
    }
  }

  console.log('got the graph');
  const last = `${map[0].length - 1},${map.length - 1}`;
  const hlast = `horizontal(${last})`;
  const vlast = `vertical(${last})`;
  const distances = dijkstra(graph, 'horizontal(0,0)', hlast, vlast);
  const ans = Math.min(distances[hlast], distances[vlast]);
  console.log(ans);
};

function dijkstra(graph, start, dest1, dest2) {
  let distances = {};

  let visited = new Set();

  let nodes = Object.keys(graph);

  for (let node of nodes) {
    distances[node] = Infinity;
  }

  distances[start] = 0;

  let firstAns = false;
  while (nodes.length) {
    nodes.sort((a, b) => distances[a] - distances[b]);
    let closestNode = nodes.shift();

    if (distances[closestNode] === Infinity) break;

    visited.add(closestNode);
    for (let neighbor in graph[closestNode]) {
      if (!visited.has(neighbor)) {
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          // if (neighbor === dest1 || neighbor === dest2) {
          //   if (!firstAns) {
          //     firstAns = newDistance;
          //   } else {
          //     return Math.min(firstAns, newDistance);
          //   }
          // }
        }
      }
    }
  }
  return distances;
}

main();
// this solution does not work all of the time but did work for the final answer
