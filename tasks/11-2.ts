import fs from 'fs';

interface Octopus {
  val: number;
  flashed: boolean;
}

interface OctOnGrid {
  oct: Octopus;
  x: number;
  y: number;
}

type Data = Octopus[][]

let flashes = 0;

const elevenTwo = async () => {
  const data: Data = fs.readFileSync('./data/11.txt', 'utf8')
    .split('\n')
    .map(el => el.split('').map(el => {
      return {
        val: Number(el),
        flashed: false,
      }
    }));

  let stepCounter = 0;

  while(true) { // yolo
    flashes = 0;
    stepCounter++;

    for (const line of data) {
      for (const octopus of line) {
        octopus.val++;
        octopus.flashed = false;
      }
    }

    for (let y = 0; y < data.length; y++) {
      const line = data[y];
      for (let x = 0; x < line.length; x++) {
        const octopus = data[y][x];
        if (octopus.val > 9 && !octopus.flashed) {
          flash(octopus, x, y, data);
        }
      }
    }

    if (flashes === 100) {
      break;
    }
  }

  console.log(stepCounter);
}

const flash = (oct: Octopus, x: number, y: number, data: Data) => {
  oct.flashed = true;
  oct.val = 0;
  flashes++;

  const neighbors = getNeighborsWithPos(x, y, data);

  for (const octOnGrid of neighbors) {
    if (!octOnGrid.oct.flashed) {
      octOnGrid.oct.val++;
      
      if (octOnGrid.oct.val > 9) {
        flash(octOnGrid.oct, octOnGrid.x, octOnGrid.y, data);
      }
    }
  }
}

const getNeighborsWithPos = (x: number, y: number, data: Data): OctOnGrid[] => {
  const result = [];

  result.push(
    { oct: data?.[y - 1]?.[x - 1], x: x - 1, y: y - 1 },
    { oct: data?.[y - 1]?.[x], x: x, y: y - 1 },
    { oct: data?.[y - 1]?.[x + 1], x: x + 1, y: y - 1 },
    { oct: data[y]?.[x - 1], x: x - 1, y: y },
    { oct: data[y]?.[x + 1], x: x + 1, y: y },
    { oct: data?.[y + 1]?.[x - 1], x: x - 1, y: y + 1 },
    { oct: data?.[y + 1]?.[x], x: x, y: y + 1 },
    { oct: data?.[y + 1]?.[x + 1], x: x + 1, y: y + 1 }
  )

  return result.filter(data => data.oct);
}

elevenTwo();