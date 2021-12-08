import fs from 'fs';

type Digits = Record<string, number>;

const eightTwo = async () => {
  const keyByValue = (object: any, value: any) => {
    return Object.keys(object).find(key => object[key] === value);
  }

  const includesStr = (full: string, part: string) => {
    for (const sym of part) {
      if (full.indexOf(sym) === -1) {
        return false;
      }
    }

    return true;
  }

  const tryDetermineDigit = (str: string, digits: Digits): number | null => {
    const try1 = keyByValue(digits, 1);

    switch(str.length) {
      case 2:
        return 1;
      case 3:
        return 7;
      case 4:
        return 4;
      case 5: // 2, 3, 5 
        if (try1) {
          if (includesStr(str, try1)) {
            return 3;
          } else { // 2, 5
            const try6 = keyByValue(digits, 6);

            if (try6) {
              if (includesStr(try6, str)) {
                return 5;
              }
              
              return 2;
            }
          }
        }

        return null;
      case 6: // 6, 9, 0
        if (try1) {
          if (!includesStr(str, try1)) {
            return 6;
          } else { // 9, 0
            const try3 = keyByValue(digits, 3);

            if (try3) {
              if (includesStr(str, try3)) {
                return 9;
              }

              return 0;
            }
          }
        }

        return null;
      case 7:
        return 8;
    }

    return null;
  }

  const data = fs.readFileSync('./data/8.txt', 'utf8').split('\n');

  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const split = data[i].split(' | ');
    const signals = split[0].split(' ').map(el => el.split('').sort().join(''));
    const output = split[1].split(' ').map(el => el.split('').sort().join(''));
    const digits: Digits = {};

    while (signals.length) {
      for (let j = 0; j < signals.length; j++) {
        const s = signals[j];
  
        const digitTry = tryDetermineDigit(s, digits);
        if (typeof digitTry === 'number') {
          digits[s] = digitTry;
          signals.splice(j, 1);
        }
      }
    }

    let code = [];

    for (let k = 0; k < output.length; k++) {
      const o = output[k];
      code.push(digits[o]);
    }

    sum += Number(code.join(''));
  }

  console.log(sum);
}

eightTwo();