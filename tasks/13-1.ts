import fs from 'fs';

const thirteenOne = async () => {
  const data = fs.readFileSync('./data/13.txt', 'utf8').split('\n');
  const splitPoint = data.indexOf('');
  let points = data.slice(0, splitPoint);
  const folds = data.slice(splitPoint + 1).map(fold => fold.slice(11));

  for (const fold of folds.slice(0, 1)) {
    const pointsSet: Set<string> = new Set();

    for (const point of points) {
      const coord = fold[0] === 'x' ? 0 : 1;
      const foldValue = Number(fold.split('=')[1]);
      const split = point.split(',').map(Number);

      if (split[coord] > foldValue) {
        split[coord] = foldValue - (split[coord] - foldValue);
      }

      pointsSet.add(split.join(','));
    }

    points = Array.from(pointsSet);
  }

  console.log(points.length);
}

thirteenOne();