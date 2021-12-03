import fs from 'fs';

const oneTwo = async () => {
  const data = fs.readFileSync('./data/1-2.txt', 'utf8').split('\n');

  let count = 0;
  data.forEach((val, i) => {
    if (Number(data[i]) + Number(data[i + 1]) + Number(data[i + 2]) < Number(data[i + 1]) + Number(data[i + 2]) + Number(data[i + 3])) {
      count++;
    }
  })

  console.log(count);
}

oneTwo();