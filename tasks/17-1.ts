import fs from 'fs';

const seventeenOne = async () => {
  const data = fs.readFileSync('./data/17.txt', 'utf8')
    .split(' ')
    .slice(2)
    .map(c => c.slice(2).split('..').map(n => parseInt(n)));

  const coords = {
    xMin: data[0][0],
    xMax: data[0][1],
    yMin: data[1][0],
    yMax: data[1][1],
  }

  // any positive y velocity will evenually return exactly to starting y=0 position
  // and continue falling at speed = initial_velocity + 1
  // so largest initial velocity is yMin - 1

  let highest = 0;
  for (let i = 1; i < Math.abs(coords.yMin); i++) {
    highest += i;
  }

  console.log(highest);
}

seventeenOne();