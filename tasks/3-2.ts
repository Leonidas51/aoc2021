import fs from 'fs';

const threeTwo = async () => {
  const data = fs.readFileSync('./data/3.txt', 'utf8').split('\n');

  const getMostCommonByIndex = (data: string[], index: number): "0" | "1" => {
    const counter: Record<string, number> = {"0": 0, "1": 0};

    data.forEach(val => {
      counter[val.split("")[index]]++;
    });
    console.log(counter["0"], counter["1"]);
    return counter["0"] > counter["1"] ? "0" : "1";
  }

  const getLeastCommonByIndex = (data: string[], index: number): "0" | "1" => {
    const counter: Record<string, number> = {"0": 0, "1": 0};

    data.forEach(val => {
      counter[val.split("")[index]]++;
    });

    return counter["1"] >= counter["0"] ? "0" : "1";
  }

  let pointer = 0;
  let filteredOxy = data.slice();
  let filteredCO2 = data.slice();
  
  while(filteredOxy.length > 1) {
    const mostCommon = getMostCommonByIndex(filteredOxy, pointer);
    filteredOxy = filteredOxy.filter((val, i) => {
      return val.split("")[pointer] === mostCommon;
    })

    pointer++;
  }

  pointer = 0;

  while(filteredCO2.length > 1) {
    const leastCommon = getLeastCommonByIndex(filteredCO2, pointer);
    filteredCO2 = filteredCO2.filter((val, i) => {
      return val.split("")[pointer] === leastCommon;
    })

    pointer++;
  }

  const oxyDec = parseInt(filteredOxy[0], 2);
  const co2Dec = parseInt(filteredCO2[0], 2);

  console.log(oxyDec * co2Dec);
}

threeTwo();