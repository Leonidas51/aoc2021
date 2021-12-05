import fs from 'fs';

type Line = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

const fiveTwo = async () => {
  const data = fs.readFileSync('./data/5.txt', 'utf8').split('\n');

  const parse = (data: string[]): Line[] => {
    return data.map(el => {
      const split = el.split(' -> ');
      const startArr = split[0].split(',').map(Number);
      const endArr = split[1].split(',').map(Number);

      return {
        x1: startArr[0],
        y1: startArr[1],
        x2: endArr[0],
        y2: endArr[1],
      }
    })
  }

  const isVertical = (line: Line) => {
    return line.x1 === line.x2;
  }

  const isHorizontal = (line: Line) => {
    return line.y1 === line.y2;
  }

  const buildCoordsArr = (line: Line) => {
    const arr = [];

    if (isHorizontal(line)) {
      const min = Math.min(line.x1, line.x2);
      const max = Math.max(line.x1, line.x2);

      for (let i = min; i <= max; i++) {
        arr.push(`${i},${line.y1}`);
      }
    } else if (isVertical(line)) {
      const min = Math.min(line.y1, line.y2);
      const max = Math.max(line.y1, line.y2);

      for (let i = min; i <= max; i++) {
        arr.push(`${line.x1},${i}`);
      }
    } else {
      const xIncrement = line.x1 - line.x2 > 0 ? -1 : 1;
      const yIncrement = line.y1 - line.y2 > 0 ? -1 : 1;

      let xPointer = line.x1;
      let yPointer = line.y1;

      while (xPointer !== line.x2 && yPointer !== line.y2) {
        arr.push(`${xPointer},${yPointer}`);

        xPointer += xIncrement;
        yPointer += yIncrement;
      }

      arr.push(`${xPointer},${yPointer}`);
    }

    return arr;
  }

  const findIntersections = (l1: Line, l2: Line, set: Set<string>) => {
    const l1coords = buildCoordsArr(l1);
    const l2coords = buildCoordsArr(l2);

    for (const coord of l1coords) {
      if (l2coords.indexOf(coord) !== -1) {
        set.add(coord);
      }
    }
  }

  const lines = parse(data);
  const intersections: Set<string> = new Set();

  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      findIntersections(lines[i], lines[j], intersections);
    }
  }

  console.log(intersections.size);
}

fiveTwo();