import fs from 'fs';

interface Packet {
  version: number,
  typeId: number,
  parent: OperatorPacket | null,
  children: PacketsCollection,
}

interface OperatorPacket extends Packet {
  contentStartIndex: number,
  lenId: string,
  childrenLength?: number,
  cumulativeChildrenLength?: number,
  childrenCount?: number,
  cumulativeChildrenCount?: number,
}

interface LiteralPacket extends Packet {
  literalValue: number,
  length: number,
}

type PacketsCollection = (OperatorPacket | LiteralPacket)[];

const sixteenTwo = async () => {
  const data = fs.readFileSync('./data/16.txt', 'utf8').split('');
  const bin = data.reduce((prev, curr) => {
    const dec = parseInt(curr, 16);
    let bin = dec.toString(2);
    while (bin.length < 4) {
      bin = '0' + bin;
    }
    return prev + bin;
  }, '');

  let total: PacketsCollection = [];

  parseData(bin, null, total);

  console.log(calcPacketValue(total[0]));
}

const calcPacketValue = (packet: any): number => {
  switch(packet.typeId) {
    case 0:
      return packet.children.reduce((prev: number, curr: any) => prev + calcPacketValue(curr), 0);
    case 1:
      return packet.children.reduce((prev: number, curr: any) => prev * calcPacketValue(curr), 1);
    case 2:
      return Math.min.apply(null, packet.children.map((child: any) => calcPacketValue(child)));
    case 3:
      return Math.max.apply(null, packet.children.map((child: any) => calcPacketValue(child)));
    case 4:
      return packet.literalValue;
    case 5:
      return calcPacketValue(packet.children[0]) > calcPacketValue(packet.children[1]) ? 1 : 0;
    case 6:
      return calcPacketValue(packet.children[0]) < calcPacketValue(packet.children[1]) ? 1 : 0;
    case 7:
      return calcPacketValue(packet.children[0]) === calcPacketValue(packet.children[1]) ? 1 : 0;
    default:
      console.log('peepee poopoo');
      return 0;
  }
}

// i'm not refactoring this
const parseData = (data: string, parentOperator: OperatorPacket | null, totalPackets: PacketsCollection): void | OperatorPacket | LiteralPacket => {
  if (isPacketLiteral(data)) {
    const packet = buildLiteralPacket(data, 0, parentOperator);
    totalPackets.push(packet);

    if (parentOperator) {
      parentOperator.children.push(packet);

      if (parentOperator.cumulativeChildrenLength !== undefined) {
        parentOperator.cumulativeChildrenLength -= packet.length;
        if (parentOperator.cumulativeChildrenLength <= 0) {
          return;
        }
      }
  
      if (parentOperator.cumulativeChildrenCount !== undefined) {
        parentOperator.cumulativeChildrenCount--;
        if (parentOperator.cumulativeChildrenCount === 0) {
          return;
        }
      }

      parseData(data.slice(packet.length), parentOperator, totalPackets);
    }
  } else {
    const packet = buildOperatorPacket(data, 0, parentOperator);
    totalPackets.push(packet);
    
    const subs = data.slice(packet.contentStartIndex);
    parseData(subs, packet, totalPackets);

    if (parentOperator) {
      parentOperator.children.push(packet);
      if (parentOperator.cumulativeChildrenCount !== undefined) {
        parentOperator.cumulativeChildrenCount--;
        if (parentOperator.cumulativeChildrenCount === 0) {
          return;
        }
      }

      if (parentOperator.cumulativeChildrenLength !== undefined) {
        parentOperator.cumulativeChildrenLength -= getPacketLength(packet);
        if (parentOperator.cumulativeChildrenLength <= 0) {
          return;
        }
      }

      parseData(data.slice(getPacketLength(packet)), parentOperator, totalPackets);
    }
  }
}

const buildOperatorPacket = (data: string, start: number, parent: OperatorPacket | null): OperatorPacket => {
  const lenId = data[start + 6];
  const childrenLength = lenId === '0' ? parseInt(data.slice(start + 7, start + 22), 2) : undefined;
  const childrenCount = lenId === '1' ? parseInt(data.slice(start + 7, start + 18), 2) : undefined;

  return {
    contentStartIndex: lenId === '0' ? start + 22 : start + 18,
    version: parseInt(data.slice(start, start + 3), 2),
    typeId: parseInt(data.slice(start + 3, start + 6), 2),
    lenId: lenId,
    parent: parent,
    children: [],
    childrenLength: childrenLength,
    cumulativeChildrenLength: childrenLength,
    childrenCount: childrenCount,
    cumulativeChildrenCount: childrenCount,
  }
}

const buildLiteralPacket = (data: string, start: number, parent: OperatorPacket | null): LiteralPacket => {
  const version = parseInt(data.slice(start, start + 3), 2);
  const typeId = parseInt(data.slice(start + 3, start + 6), 2);

  let keepReading = true;
  let pointer = start + 6;
  let literalData = '';

  while (keepReading) {
    if (data[pointer] === '0') {
      keepReading = false;
    }

    literalData += data.slice(pointer + 1, pointer + 5);
    pointer += 5;
  }

  let length = pointer;

  if (parseInt(literalData, 2) < 0) {
    console.log('negative');
  }

  return {
    version: version,
    typeId: typeId,
    parent: parent,
    literalValue: parseInt(literalData, 2),
    length: length,
    children: [],
  }
}

const isPacketLiteral = (data: string, start = 0) => {
  return data.slice(start + 3, start + 6) === '100';
} 

const getPacketLength = (packet: any) => {
  let len = 0;

  function helper(packet: any) {
    if (!packet.children.length && packet.length) { // it's a literal
      len += packet.length;
    } else { // it's an operator
      len += packet.contentStartIndex;
      for (const child of packet.children) {
        helper(child);
      }
    }
  }
  
  helper(packet);
  return len;
}

sixteenTwo();