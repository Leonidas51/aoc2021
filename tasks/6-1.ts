import fs from 'fs';

const sixOne = async () => {
  const fish = fs.readFileSync('./data/6.txt', 'utf8').split(',').map(Number);

  for (let i = 0; i < 80; i++) {
    for (let j = 0; j < fish.length; j++) {
      if (fish[j] === 0) {
        fish[j] = 6;
        fish.push(9);
      } else {
        fish[j]--;
      }
    }
  }

  console.log(fish.length);
}

sixOne();