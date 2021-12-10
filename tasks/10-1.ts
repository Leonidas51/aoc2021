import fs from 'fs';

const tenOne = async () => {
  const data = fs.readFileSync('./data/10.txt', 'utf8').split('\n');

  const errors = [];

  for (let i = 0; i < data.length; i++) {
    const line = data[i];
    const stack = [];
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
            errors.push(char);
            break lineLoop;
          }
          break;
        case ')':
          if (!tryRemove('(', stack)) {
            errors.push(char);
            break lineLoop;
          }
          break;
        case ']':
          if (!tryRemove('[', stack)) {
            errors.push(char);
            break lineLoop;
          }
          break;
        case '>':
          if (!tryRemove('<', stack)) {
            errors.push(char);
            break lineLoop;
          }
          break;
      }
    }
  }

  console.log(countPoints(errors));
}

const tryRemove = (char: string, stack: string[]) => {
  if (stack[stack.length - 1] === char) {
    stack.pop();
    return true;
  }

  return false;
}

const countPoints = (errors: string[]) => {
  const scores: Record<string, number> = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };

  let result = 0;

  for (const char of errors) {
    result += scores[char];
  }

  return result;
}

tenOne();