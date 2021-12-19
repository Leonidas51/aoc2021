import fs from 'fs';

interface Node {
  pureVal: number,
  cumulativeVal: number,
  x: number,
  y: number,
}

type CaveMap = Node[][];

const fifteenOne = async () => {
  const data: CaveMap = fs.readFileSync('./data/15.txt', 'utf8')
    .split('\n')
    .map(
      (line, y) => line
        .split('')
        .map(
          (num, x): Node => {
            return {
              pureVal: Number(num),
              cumulativeVal: Infinity,
              x: x,
              y: y,
            }
          }
    ));

  const first = data[0][0];
  first.cumulativeVal = 0;

  let nodeList: Node[] = [];

  for (const line of data) {
    nodeList = nodeList.concat(line);
  }

  while (nodeList.length > 0) {
    const node = nodeList.shift() as Node;
    const neighbors = getNeighbors(node, data);

    for (const neighbor of neighbors) {
      const sum = node.cumulativeVal + neighbor.pureVal;
      if (sum < neighbor.cumulativeVal) {
        neighbor.cumulativeVal = sum;
      }
    }
  }

  console.log(data[data.length - 1][data[0].length - 1]);
}

const getNeighbors = (node: Node, map: CaveMap) => {
  const result: Node[] = [];
  const {x, y} = node;
  
  result.push(
    map[y - 1]?.[x],
    map[y + 1]?.[x],
    map[y]?.[x - 1],
    map[y]?.[x + 1],
  )

  return result.filter(node => node !== undefined);
}

fifteenOne();