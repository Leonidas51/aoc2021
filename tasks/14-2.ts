import fs from 'fs';

const fourteenTwo = async () => {
  const data = fs.readFileSync('./data/14.txt', 'utf8').split('\n');

  const start = data[0].split('');
  const rules: Record<string, string> = {};

  for (const rule of data.slice(2)) {
    const split = rule.split(' -> ');
    rules[split[0]] = split[1];
  }

  const quantities: Record<string, number> = {};
  for (const char of start) {
    incrementQuantity(quantities, char);
  }

  const startPairs: Record<string, number> = {};
  for (let i = 0; i < start.length - 1; i++) {
    const pair = `${start[i]}${start[i + 1]}`;

    if (!startPairs[pair]) {
      startPairs[pair] = 0;
    }

    startPairs[pair]++;
  }

  let pairs = startPairs;
  for (let i = 0; i < 40; i++) {
    const newPairs: Record<string, number> = {};

    for (const pair of Object.keys(pairs)) {
      const [a, b] = pair.split('');
      const count = pairs[pair];
      const insert = rules[pair];

      incrementQuantity(quantities, rules[pair], count);
      incrementQuantity(newPairs, `${a}${insert}`, count);
      incrementQuantity(newPairs, `${insert}${b}`, count);
    }

    pairs = newPairs;
  }

  const mostCommon = Math.max.apply(null, Object.keys(quantities).map(key => quantities[key]));
  const leastCommon = Math.min.apply(null, Object.keys(quantities).map(key => quantities[key]));

  console.log(mostCommon - leastCommon);
}

const incrementQuantity = (quantities: Record<string, number>, key: string, increment: number = 1) => {
  if (!quantities[key]) {
    quantities[key] = 0;
  }

  quantities[key] += increment;
}

fourteenTwo();