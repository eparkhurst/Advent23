// Define a graph using an adjacency list
const graph = {
  A: { B: 1, C: 4 }, // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
  B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

function dijkstra(graph, start) {
  let distances = {};

  let visited = new Set();

  let nodes = Object.keys(graph);

  for (let node of nodes) {
    distances[node] = Infinity;
  }

  distances[start] = 0;

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
        }
      }
    }
  }

  return distances;
}

console.log(dijkstra(graph, 'A')); // Outputs: { A: 0, B: 1, C: 3, D: 4 }
