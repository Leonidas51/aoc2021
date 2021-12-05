import fs from 'fs';

const twoTwo = async () => {
  const data = fs.readFileSync('./data/2.txt', 'utf8').split('\n');

  let aim = 0;
  let distance = 0;
  let depth = 0;

  data.forEach(val => {
    const split = val.split(" ");

    switch(split[0]) {
      case 'forward':
        distance += Number(split[1]);
        depth += (aim * Number(split[1]));
        break;
      case 'up':
        aim -= Number(split[1]);
        break;
      case 'down':
        aim += Number(split[1]);
        break;
    }
  });

  console.log(distance * depth);
}

twoTwo();