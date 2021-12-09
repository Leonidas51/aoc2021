import fs from 'fs';

type Line = Point[];

type Point = {
  x: number;
  y: number;
  val: number;
};

const nineTwo = async () => {
  const data = fs.readFileSync('./data/9.txt', 'utf8').split('\n');

  const lavaMap = data.map((line, y) => line.split('').map((el, x) => { return {x: x, y: y, val: Number(el)} }));

  const threeBiggestBasins: number[] = [];

  for (let i = 0; i < lavaMap.length; i++) {
    const line = lavaMap[i];
    for (let j = 0; j < line.length; j++) {
      const point = line[j];

      if (isLowest(point, lavaMap)) {
        const basin: Point[] = [];
        fillBasin(point, basin, lavaMap);
        compareBasinToBiggest(basin, threeBiggestBasins);
      }
    }
  }

  const result = threeBiggestBasins.reduce((prev, curr) => prev * curr, 1);

  console.log(result);
}

const getNeighbors = (point: Point, map: Line[]) => {
  const result: Point[] = [];

  if (map[point.y][point.x - 1] !== undefined) {
    result.push(map[point.y][point.x - 1]);
  }

  if (map[point.y][point.x + 1] !== undefined) {
    result.push(map[point.y][point.x + 1]);
  }

  if (map[point.y - 1] !== undefined && map[point.y - 1][point.x] !== undefined) {
    result.push(map[point.y - 1][point.x]);
  }

  if (map[point.y + 1] !== undefined && map[point.y + 1][point.x] !== undefined) {
    result.push(map[point.y + 1][point.x]);
  }

  return result;
}

const isLowest = (point: Point, map: Line[]) => {
  const neighbors = getNeighbors(point, map);

  for (const n of neighbors) {
    if (n.val < point.val) {
      return false;
    }
  }

  return true;
}

const fillBasin = (point: Point, basin: Point[], map: Line[]) => {
  basin.push(point);

  const neighbors = getNeighbors(point, map);

  for (const neighbor of neighbors) {
    if (neighbor.val !== 9 && !basin.find(el => el === neighbor)) {
      fillBasin(neighbor, basin, map);
    }
  }
}

const compareBasinToBiggest = (basin: Point[], leaders: number[]) => {
  if (leaders.length < 3) {
    leaders.push(basin.length);
  } else {
    const smallest = Math.min.apply(null, leaders);

    if (basin.length > smallest) {
      leaders.splice(leaders.indexOf(smallest), 1, basin.length);
    }
  }
}

nineTwo();