import fs from 'fs';

const tenOne = async () => {
  const data = fs.readFileSync('./data/10.txt', 'utf8').split('\n');

  const completionScores = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const stack = [];
    let isValid = true;
    lineLoop: for (let j = 0; j < line.length; j++) {
      const char = line[j];

      switch(char) {
        case '{':
        case '(':
        case '[':
        case '<':
          stack.push(char);
          break;
        case '}':
          if (!tryRemove('{', stack)) {
            isValid = false;
            break lineLoop;
          }
          break;
        case ')':
          if (!tryRemove('(', stack)) {
            isValid = false;
            break lineLoop;
          }
          break;
        case ']':
          if (!tryRemove('[', stack)) {
            isValid = false;
            break lineLoop;
          }
          break;
        case '>':
          if (!tryRemove('<', stack)) {
            isValid = false;
            break lineLoop;
          }
          break;
      }
    }

    if (isValid && stack.length) {
      completionScores.push(countPoints(stack));
    }
  }

  console.log(completionScores.sort((a, b) => a - b)[Math.floor(completionScores.length / 2)]);
}

const tryRemove = (char: string, stack: string[]) => {
  if (stack[stack.length - 1] === char) {
    stack.pop();
    return true;
  }

  return false;
}

const countPoints = (stack: string[]) => {
  const scores: Record<string, number> = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4
  };

  return stack.reduceRight((prev, curr) => {
    return (prev * 5) + scores[curr];
  }, 0);
}

tenOne();