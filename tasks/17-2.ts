import fs from 'fs';

interface Coords {
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
}

interface VelocityModel {
  val: number,
  atStepMin: number,
  atStepMax: number,
}

const seventeenOne = async () => {
  const data = fs.readFileSync('./data/17.txt', 'utf8')
    .split(' ')
    .slice(2)
    .map(c => c.slice(2).split('..').map(n => parseInt(n)));

  const coords: Coords = {
    xMin: data[0][0],
    xMax: data[0][1],
    yMin: data[1][0],
    yMax: data[1][1],
  }

  const xArray: VelocityModel[] = [];
  const yArray: VelocityModel[] = [];

  for (let i = 1; i <= coords.xMax; i++) {
    if (isXReach(i, coords)) {
      xArray.push(buildXModel(i, coords));
    }
  }

  for (let i = coords.yMin; i < Math.abs(coords.yMin); i++) {
    if (isYReach(i, coords)) {
      yArray.push(buildYModel(i, coords));
    }
  }

  let count = 0;

  for (const xVel of xArray) {
    for (const yVel of yArray) {
      if (rangesIntersect(xVel.atStepMin, xVel.atStepMax, yVel.atStepMin, yVel.atStepMax)) {
        count++;
      }
    }
  }

  console.log(count);
}

const isXReach = (x: number, coords: Coords) => {
  let stepPosition = 0;
  for (let i = x; i > 0; i--) {
    stepPosition += i;

    if (stepPosition >= coords.xMin && stepPosition <= coords.xMax) {
      return true;
    }
  }

  return false;
}

const buildXModel = (x: number, coords: Coords): VelocityModel => {
  let step = 0;
  let position = 0;
  const inRangeSteps: number[] = [];

  for (let i = x; i > 0; i--) {
    step++;
    position += i;

    if (position <= coords.xMax && position >= coords.xMin) {
      inRangeSteps.push(step);
    }
  }

  const atStepMin = Math.min.apply(null, inRangeSteps);
  const atStepMax = Math.max.apply(null, inRangeSteps);

  return {
    val: x,
    atStepMin,
    atStepMax: atStepMax === step ? Infinity : atStepMax,
  }
}

const isYReach = (y: number, coords: Coords) => {
  let stepPosition = 0;

  while (stepPosition > coords.yMin) {
    stepPosition += y;
    y--;

    if (stepPosition <= coords.yMax) {
      return true;
    }
  }

  return false;
}

const buildYModel = (y: number, coords: Coords): VelocityModel => {
  let step = 0;
  let position = 0;
  let velocity = y;
  const inRangeSteps: number[] = [];

  while (position > coords.yMin) {
    step++;
    position += velocity;
    velocity--;

    if (position <= coords.yMax && position >= coords.yMin) {
      inRangeSteps.push(step);
    }
  }

  return {
    val: y,
    atStepMin: Math.min.apply(null, inRangeSteps),
    atStepMax: Math.max.apply(null, inRangeSteps),
  };
}

const rangesIntersect = (x1: number, x2: number, y1: number, y2: number) => {
  if ((x2 >= y1 && x2 <= y2) || (y2 >= x1 && y2 <= x2)) {
    return true;
  }

  return false;
}

seventeenOne();