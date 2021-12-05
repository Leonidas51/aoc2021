import fs from 'fs';

type Line = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

// this is an example of what you should NOT do
// skip to 5-2 if you value your sanity
const fiveOne = async () => {
  const data = fs.readFileSync('./data/5.txt', 'utf8').split('\n');

  const parse = (data: string[]): Line[] => {
    return data.map(el => {
      const split = el.split(' -> ');
      const startArr = split[0].split(',').map(Number);
      const endArr = split[1].split(',').map(Number);

      return {
        x1: Math.min(startArr[0], endArr[0]),
        x2: Math.max(startArr[0], endArr[0]),
        y1: Math.min(startArr[1], endArr[1]),
        y2: Math.max(startArr[1], endArr[1]),
      }
    })
      .filter(el => isVertical(el) || isHorizontal(el)) // For now, only consider horizontal and vertical lines
  }

  const isVertical = (line: Line) => {
    return line.x1 === line.x2;
  }

  const isHorizontal = (line: Line) => {
    return line.y1 === line.y2;
  }

  const findIntersectionPerpendicular = (vertical: Line, horizontal: Line, set: Set<string>) => {
    if (vertical.x1 >= horizontal.x1 && vertical.x1 <= horizontal.x2
      && horizontal.y1 >= vertical.y1 && horizontal.y1 <= vertical.y2) {
      set.add(`${vertical.x1},${horizontal.y1}`);
    } 
  }

  const findIntersections = (l1: Line, l2: Line, set: Set<string>) => {
    if (isVertical(l1) && isVertical(l2)) {
      if (l1.x1 === l2.x1) {
        let l1Pointer = l1.y1;
        let l2Pointer = l2.y1;

        // begin at l1 start, see if it's in range of l2
        while (l1Pointer >= l2.y1 && l1Pointer <= l2.y2 && l1Pointer <= l1.y2) {
          set.add(`${l1.x1},${l1Pointer}`);
          l1Pointer++;
        }

        // same for l2
        while (l2Pointer >= l1.y1 && l2Pointer <= l1.y2 && l2Pointer <= l2.y2) {
          set.add(`${l1.x1},${l2Pointer}`);
          l2Pointer++;
        }
      }
    } else if (isHorizontal(l1) && isHorizontal(l2)) {
      if (l1.y1 === l2.y1) {
        let l1Pointer = l1.x1;
        let l2Pointer = l2.x1;
  
        while (l1Pointer >= l2.x1 && l1Pointer <= l2.x2 && l1Pointer <= l1.x2) {
          set.add(`${l1Pointer},${l1.y1}`);
          l1Pointer++;
        }
  
        while (l2Pointer >= l1.x1 && l2Pointer <= l1.x2 && l2Pointer <= l2.x2) {
          set.add(`${l2Pointer},${l1.y1}`);
          l2Pointer++;
        }
      }
    } else {
      if (isVertical(l1) && isHorizontal(l2)) {
        findIntersectionPerpendicular(l1, l2, set);
      } else if (isHorizontal(l1) && isVertical(l2)) {
        findIntersectionPerpendicular(l2, l1, set);
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

fiveOne();