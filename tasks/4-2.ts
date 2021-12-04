import fs from 'fs';

type Tile = {
  val: number;
  marked: boolean;
};

type Row = Tile[];

type Card = {
  victor: boolean;
  rows: Row[];
};

const fourTwo = async () => {
  const parse = (data: string[]) => {
    const draw = data[0].split(',').map(el => Number(el));
    const cards: Card[] = [];
  
    for (let i = 2; i < data.length; i += 6) {
      const newCard: Card = { rows: [], victor: false };
  
      for (let j = i; j < i + 5; j++) { // append 5 rows starting at i
        const newRow: Tile[] = data[j]
          .split(' ')
          .filter(el => el !== '')
          .map(el => { return { val: Number(el), marked: false } });
        newCard.rows.push(newRow);
      }
  
      cards.push(newCard);
    }

    return {
      draw,
      cards,
    }
  }

  const compareAgainstCard = (cardRows: Row[], val: number) => {
    // x => column
    // y => row
    let markedX = null;
    let markedY = null;

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const tile = cardRows[y][x];

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

  const checkVictory = (cardRows: Row[], x: number, y: number) => {
    let columnVictory = true;
    let rowVictory = true;

    // check column
    for (let i = 0; i < 5; i++) {
      if (!cardRows[i][x].marked) {
        columnVictory = false;
      }
    }

    // check row
    for (let i = 0; i < 5; i++) {
      if (!cardRows[y][i].marked) {
        rowVictory = false;
      }
    }

    return columnVictory || rowVictory;
  }

  const countUnmarkedSum = (cardRows: Row[]) => {
    let sum = 0

    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        const tile = cardRows[y][x];

        if (!tile.marked) {
          sum += tile.val;
        }
      }
    }

    return sum;
  }

  const data = fs.readFileSync('./data/4-1.txt', 'utf8').split('\n');
  const { draw, cards } = parse(data);

  let victoryDraw = null;
  let victoryUnmarkedSum = null;

  // for loops for the slow parts
  for (let i = 0; i < draw.length; i++) {
    const num = draw[i];
    for (let j = 0; j < cards.length; j++) {
      const card = cards[j];
      
      if (card.victor) {
        continue;
      }

      const { markedX, markedY } = compareAgainstCard(card.rows, num);

      if (markedX !== null && markedY !== null) {
        if (checkVictory(card.rows, markedX, markedY)) {
          card.victor = true;
          victoryDraw = card.rows[markedY][markedX].val
          victoryUnmarkedSum = countUnmarkedSum(card.rows);
        }
      }
    }
  }
  
  console.log(`${victoryDraw} * ${victoryUnmarkedSum} = ${Number(victoryDraw) * Number(victoryUnmarkedSum)}`);
}

fourTwo();