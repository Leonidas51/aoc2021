import fs from 'fs';

const sevenTwo = async () => {
  const countFuel = (steps: number) => {
    let result = 0;
    for (let i = 1; i <= steps; i++) {
      result += i
    }

    return result;
  }

  const data = fs.readFileSync('./data/7.txt', 'utf8')
    .split(',')
    .map(Number)
    .sort((a, b) => {
      return a - b;
    });

  // idk why this works
  const avg = Math.floor(data.reduce((prev, cur) => prev + cur, 0) / data.length);

  let fuel = 0
  data.forEach(val => {
    fuel += countFuel(Math.abs(val - avg));
  })

  console.log(fuel);
}

sevenTwo();