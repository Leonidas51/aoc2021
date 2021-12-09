import fs from 'fs';

type Line = number[];

const nineOne = async () => {
  const isLowest = (val: number, x: number, y: number, map: Line[]) => {
    if (
      (map[y][x - 1] === undefined || map[y][x - 1] > val) && // left
      (map[y][x + 1] === undefined || map[y][x + 1] > val) && // right
      (map[y - 1] === undefined || map[y - 1][x] > val) && // top
      (map[y + 1] === undefined || map[y + 1][x]  > val) // bottom
    ) {
      return true;
    }

    return false;
  }

  const data = fs.readFileSync('./data/9.txt', 'utf8').split('\n');

  const lavaMap = data.map(line => line.split('').map(Number));

  let count = 0;

  for (let i = 0; i < lavaMap.length; i++) {
    const line = lavaMap[i];
    for (let j = 0; j < line.length; j++) {
      const val = line[j];

      if (isLowest(val, j, i, lavaMap)) {
        count++;
      }
    }
  }

  console.log(count);
}

nineOne();