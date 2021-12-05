import fs from 'fs';

const twoOne = async () => {
  const data = fs.readFileSync('./data/2.txt', 'utf8').split('\n');

  let distance = 0;
  let depth = 0;
  
  data.forEach((val, i) => {
    const split = val.split(" ");

    switch(split[0]) {
      case 'forward':
        distance += Number(split[1]);
        break;
      case 'up':
        depth -= Number(split[1]);
        break;
      case 'down':
        depth += Number(split[1]);
        break;
    }
  })

  console.log(distance * depth);
}

twoOne();