import { useState } from 'react';
import { getRandomIndex } from '../random';

const MIDDLE_CARD = 'CONF CALL 🌈 BINGO';
const CARDS = [
  '(animal noises in the background)',
  'is ___ on the call?',
  'we do have 5 minutes left',
  'Hello, hello?',
  'could you please get closer to the mic',
  'i was having connection issues',
  'sorry, I had problems logging in',
  'can you email that to everyone?',
  'can you repeat, please?',
  'sorry, something ___ with my calendar',
  '(child noises in the background)',
  'Could you share this slides afterwards',
  'sorry, I didn\'t found the conference id',
  'You will send the minutes?',
  'I need to jump in another call',
  'can everyone go on mute',
  'can we take this offline?',
  'do you see my screen?',
  'is everyone in the call?',
  'can somebody grant presenter rights?',
  'sorry, I was on mute',
  '(load painful echo/feedback)',
  'Next slide, please',
  'who just joined',
];


type CardWithBingo = { index: number, marked: boolean }[];


function useBingo(bingoSize: number, specialCardIndex: number, onScoreUpdate?: (oldScore: number, newScore: number) => void): [number, string[], boolean[], boolean[], () => void, (index: number) => void] {
  const totalCards = bingoSize * bingoSize;
  const bingoBoard = new Array(totalCards).fill(false).map((c, i) => i === specialCardIndex ? true : c);
  const [cardsMarked, setCardsMarked] = useState<boolean[]>([]);
  const [cardsBingo, setCardsBingo] = useState<boolean[]>([]);
  const [cardsNames, setCardsNames] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);

  function generateBoard(totalCards: number): string[] {
    let possibleCards = [...CARDS];
    let cards = [];
    for(let i=0; i<totalCards; i++) {
      let card = MIDDLE_CARD;
      if(i !== specialCardIndex) {
        const randomIndex = getRandomIndex(possibleCards);
        card = possibleCards.splice(randomIndex, 1)[0];
      }
      cards.push(card);
    }
    return cards;
  }

  function getBingos(cards: boolean[]): CardWithBingo[] {
    let possibleBingos: CardWithBingo[] = [];
    let diagonal1Cards = [];
    let diagonal2Cards = [];
    for (let i=0; i<bingoSize; i++) {
      let rowCards = [];
      let columnCards = [];
      for (let j=0; j<bingoSize; j++) {
        const rowIndex = i * bingoSize + j;
        const columnIndex = i + j * bingoSize;
        rowCards.push({ index: rowIndex, marked: cards[rowIndex] });
        columnCards.push({ index: columnIndex, marked: cards[columnIndex] });
      }
      possibleBingos.push(rowCards, columnCards);

      const diagonal1Index = i*(bingoSize+1);
      const diagonal2Index = (cards.length-1) - (i+1)*(bingoSize-1);
      diagonal1Cards.push({ index: diagonal1Index, marked: cards[diagonal1Index] });
      diagonal2Cards.push({ index: diagonal2Index, marked: cards[diagonal2Index] });
    }
    possibleBingos.push(diagonal1Cards, diagonal2Cards);

    return possibleBingos.filter(b => b.every(c => c.marked));
  }

  function generate() {
    setCardsNames(generateBoard(bingoBoard.length));
    setCardsMarked([...bingoBoard]);
    setCardsBingo([...bingoBoard]);
  }

  function mark(index: number) {
    let newMarkedCards = [...cardsMarked];
    newMarkedCards[index] = !newMarkedCards[index];
    setCardsMarked(newMarkedCards);

    const bingos = getBingos(newMarkedCards);
    let bingoCards = [...bingoBoard];
    bingos.flat(1).forEach(({ index }) => {
      bingoCards[index] = true;
    });
    setCardsBingo(bingoCards);
    if (onScoreUpdate) {
      onScoreUpdate(score, bingos.length);
    }
    setScore(bingos.length);
  }

  return [
    score,
    cardsNames,
    cardsMarked,
    cardsBingo,
    generate,
    mark
  ];
}

export default useBingo;
