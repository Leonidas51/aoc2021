import fs from 'fs';

type Digits = Record<string, number>;

const eightOne = async () => {
  const data = fs.readFileSync('./data/8.txt', 'utf8').split('\n');

  let count1478 = 0

  for (let i = 0; i < data.length; i++) {
    const split = data[i].split(' | ');
    const signals = split[0].split(' ').map(el => el.split('').sort().join(''));
    const output = split[1].split(' ').map(el => el.split('').sort().join(''));
    const digits: Digits = {};

    for (let j = 0; j < signals.length; j++) {
      const s = signals[j];
      if (s.length === 2) {
        digits[s] = 1;
      }

      if (s.length === 3) {
        digits[s] = 7;
      }

      if (s.length === 4) {
        digits[s] = 4;
      }

      if (s.length === 7) {
        digits[s] = 8;
      }
    }

    for (let k = 0; k < output.length; k++) {
      const o = output[k];

      if (digits.hasOwnProperty(o)) {
        count1478++;
      }
    }
  }

  console.log(count1478);
}

eightOne();