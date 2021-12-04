import fs from 'fs';

type Tile = {
  val: number;
  marked: boolean;
};

type Row = Tile[];

type Card = Row[];

const fourOne = async () => {
  const parse = (data: string[]) => {
    const draw = data[0].split(',').map(el => Number(el));
    const cards: Card[] = [];
  
    for (let i = 2; i < data.length; i += 6) {
      const newCard: Card = [];
  
      for (let j = i; j < i + 5; j++) { // append 5 rows starting at i
        const newRow: Tile[] = data[j]
          .split(' ')
          .filter(el => el !== '')
          .map(el => { return { val: Number(el), marked: false } });
        newCard.push(newRow);
      }
  
      cards.push(newCard);
    }

    return {
      draw,
      cards,
    }
  }

  const compareAgainstCard = (card: Card, val: number) => {
    // x => column
    // y => row
    let markedX = null;
    let markedY = null;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const tile = card[y][x];

        if (tile.val === val) {
          tile.marked = true;
          markedX = x;
          markedY = y;
        }
      }
    }

    return {
      markedX,
      markedY,
    }
  }

  const checkVictory = (card: Card, x: number, y: number) => {
    let columnVictory = true;
    let rowVictory = true;

    // check column
    for (let i = 0; i < 5; i++) {
      if (!card[i][x].marked) {
        columnVictory = false;
      }
    }

    // check row
    for (let i = 0; i < 5; i++) {
      if (!card[y][i].marked) {
        rowVictory = false;
      }
    }

    return columnVictory || rowVictory;
  }

  const countUnmarkedSum = (card: Card) => {
    let sum = 0

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const tile = card[y][x];

        if (!tile.marked) {
          sum += tile.val;
        }
      }
    }

    return sum;
  }

  const data = fs.readFileSync('./data/4-1.txt', 'utf8').split('\n');
  const { draw, cards } = parse(data);

  let victory = false;
  let victoryDraw = null;
  let victoryUnmarkedSum = null;
  // for loops for the slow parts
  for (let i = 0; i < draw.length; i++) {
    if (victory) {
      break;
    }

    const num = draw[i];
    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      const { markedX, markedY } = compareAgainstCard(card, num);

      if (markedX !== null && markedY !== null) {
        if (checkVictory(card, markedX, markedY)) {
          console.log('sweet victory: ', j, card[markedY][markedX].val);

          victory = true;
          victoryDraw = card[markedY][markedX].val
          victoryUnmarkedSum = countUnmarkedSum(card);

          console.log(`${victoryDraw} * ${victoryUnmarkedSum} = ${victoryDraw * victoryUnmarkedSum}`);

          break;
        }
      }
    }
  }
}

fourOne();