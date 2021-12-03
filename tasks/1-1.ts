import fs from 'fs';

const one = async () => {
  const data = fs.readFileSync('./data/1.txt', 'utf8').split('\n');

  let last = Number(data[0]);
  let count = 0;
  data.forEach(val => {
    const numVal = Number(val);

    if (numVal > last) {
      count++;
    }

    last = numVal;
  });

  console.log(count);
}

one();