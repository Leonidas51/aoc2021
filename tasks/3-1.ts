import fs from 'fs';

const threeOne = async () => {
  const data = fs.readFileSync('./data/3-1.txt', 'utf8').split('\n');

  const counter = new Array(data[0].length).fill(null).map(el => {
    return {"0": 0, "1": 1} as Record<string, number>;
  })

  data.forEach(val => {
    val.split("").forEach((bit, i) => {
      counter[i][bit]++;
    });
  });

  const epsilon = counter.map(el => el["0"] > el["1"] ? "0" : "1");
  const gamma = epsilon.map(el => el === "0" ? "1" : "0");

  const epsilonDec = parseInt(epsilon.join(""), 2);
  const gammaDec = parseInt(gamma.join(""), 2);

  console.log(epsilonDec * gammaDec);
}

threeOne();