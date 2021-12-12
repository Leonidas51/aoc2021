import fs from 'fs';

type Graph = Record<string, string[]>;

const paths: string[][] = [];

const twelveOne = async () => {
  const data = fs.readFileSync('./data/12.txt', 'utf8').split('\n');
  const graph = buildGraph(data);

  buildPath('start', graph, []);

  console.log(paths.length);
}

const buildPath = (start: string, graph: Graph, path: string[]): void => {
  path.push(start);

  if (start === 'end') {
    paths.push(path);
    return;
  }

  for (const point of graph[start]) {
    if (path.indexOf(point) === -1 || isUpperCase(point)) {
      buildPath(point, graph, path.slice());
    }
  }

  return;
}

const buildGraph = (data: string[]) => {
  const result: Graph = {};

  for (const line of data) {
    const split = line.split('-');
    addConnection(split[0], split[1], result);
  }

  return result;
}

const addConnection = (a: string, b: string, graph: Graph) => {
  if (!graph.hasOwnProperty(a)) {
    graph[a] = [];
  }

  if (!graph.hasOwnProperty(b)) {
    graph[b] = [];
  }

  if (graph[a].indexOf(b) === -1) {
    graph[a].push(b);
  }

  if (graph[b].indexOf(a) === -1) {
    graph[b].push(a);
  }
}

const isUpperCase = (str: string) => {
  return str === str.toUpperCase();
}

twelveOne();