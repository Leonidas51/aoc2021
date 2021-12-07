import fs from 'fs';

const sevenOne = async () => {
  const data = fs.readFileSync('./data/7.txt', 'utf8')
    .split(',')
    .map(Number)
    .sort((a, b) => {
      return a - b;
    });

  const median = data[Math.floor(data.length / 2)];

  let fuel = 0
  data.forEach(val => {
    fuel += Math.abs(val - median);
  })

  console.log(fuel);
}

sevenOne();