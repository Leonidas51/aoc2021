import fs from 'fs';

const sixTwo = async () => {
  const data = fs.readFileSync('./data/6.txt', 'utf8').split(',');

  const fish: Record<string, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  }

  data.forEach(el => {
    fish[el]++;
  })

  for (let i = 0; i < 256; i++) {
    let birthsCount = 0;

    for (const key in fish) {
      if (key === '0') {
        birthsCount = fish[key];
      } else {
        fish[String(Number(key) - 1)] = fish[key];
      }
    }

    fish['8'] = birthsCount;
    fish['6'] += birthsCount;
  }

  let count = 0;

  for (const key in fish) {
    count += fish[key];
  }

  console.log(count);
}

sixTwo();