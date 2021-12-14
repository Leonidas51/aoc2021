import fs from 'fs';

const fourteenOne = async () => {
  const data = fs.readFileSync('./data/14.txt', 'utf8').split('\n');

  const poly = data[0].split('');
  const rules: Record<string, string> = {};

  for (const rule of data.slice(2)) {
    const split = rule.split(' -> ');
    rules[split[0]] = split[1];
  }

  for (let i = 0; i < 10; i++) {
    const insertions: (string | number)[][] = [];

    for (let j = 0; j < poly.length; j++) {
      if (poly[j + 1] && rules.hasOwnProperty(poly[j] + poly[j + 1])) {
        insertions.push([ rules[poly[j] + poly[j + 1]], j + 1 ]);
      }
    }

    let indexDifference = 0;
    for (const insert of insertions) {
      poly.splice(Number(insert[1]) + indexDifference, 0, String(insert[0]));
      indexDifference++;
    }
  }

  console.log(calcResult(poly));
}

const calcResult = (poly: string[]) => {
  const quantities: Record<string, number> = {};

  for (const char of poly) {
    if (!quantities[char]) {
      quantities[char] = 0;
    }

    quantities[char]++;
  }

  const mostCommon = Math.max.apply(null, Object.keys(quantities).map(key => quantities[key])); 
  const leastCommon = Math.min.apply(null, Object.keys(quantities).map(key => quantities[key])); 

  return mostCommon - leastCommon;
}

fourteenOne();