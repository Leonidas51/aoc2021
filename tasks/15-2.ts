import fs from 'fs';

interface Node {
  pureVal: number,
  cumulativeVal: number,
  x: number,
  y: number,
}

type CaveMap = Node[][];

const fifteenTwo = async () => {
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

  // expand down
  const startYlength = data.length;
  for (let i = startYlength; i < startYlength * 5; i++) {
    data.push(data[i - startYlength].map(node => {
      return {
        pureVal: node.pureVal === 9 ? 1 : node.pureVal + 1,
        cumulativeVal: Infinity,
        x: node.x,
        y: i,
      };
    }));
  }

  // expand right
  const startXLength = data[0].length;
  for (let i = 0; i < data.length; i++) {
    for (let j = 1; j < 5; j++) {
      const right = data[i].slice(-startXLength);
      data[i] = data[i].concat(right.map(node => {
        return {
          pureVal: node.pureVal === 9 ? 1 : node.pureVal + 1,
          cumulativeVal: Infinity,
          x: node.x + startXLength,
          y: node.y,
        };
      }));
    }
  }

  const first = data[0][0];
  first.cumulativeVal = 0;

  let nodeList: Node[] = [];

  for (const line of data) {
    nodeList = nodeList.concat(line);
  }

  while (nodeList.length > 0) {
    const node = nodeList.splice(getMinCumulative(nodeList), 1)[0];
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

const getMinCumulative = (nodeList: Node[]) => {
  let min = Infinity;
  let minIndex = 0;

  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].cumulativeVal < min) {
      min = nodeList[i].cumulativeVal;
      minIndex = i;
    }
  }

  return minIndex;
}

fifteenTwo();