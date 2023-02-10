import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import Card from './components/Card';
import Score from './components/Score';
import SpecialCard from './components/SpecialCard';
import useBingo from './hooks/bingo';
import useMultiplePlayers from './hooks/players';
import useScreenSize from './hooks/screen';

const BINGO_SIZE = 5;
const MIDDLE_CARD_INDEX = Math.floor(BINGO_SIZE*BINGO_SIZE/2);

function App() {
  const [ data, updateScore ] = useMultiplePlayers(0);

  const handleScoreUpdate = (oldScore: number, newScore: number) => {
    if (newScore > oldScore) {
      setCelebrationRunning(true);
    }
    if (newScore != oldScore) {
      updateScore(newScore);
    }
  };
  const handleConfettiComplete = () => {
    setCelebrationRunning(false);
  };

  const [ celebrationRunning, setCelebrationRunning ] = useState(false);
  const [ score, names, markedCards, bingoCards, generate, mark ] = useBingo(BINGO_SIZE, MIDDLE_CARD_INDEX, handleScoreUpdate);
  const { width, height } = useScreenSize();


  useEffect(() => {
    generate();
  }, []);

  return (
    <div className=''>
      {celebrationRunning && <ReactConfetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={1000}
        gravity={0.3}
        onConfettiComplete={handleConfettiComplete}
      />}
      <Score value={score} otherScores={data} />
      <div className="grid grid-cols-5 grid-flow-row gap-px xl:gap-1 xl:text-base xl:p-0 p-1 xl:rotate-3 landscape:max-w-[85vh] portrait:max-h-screen text-xxs mx-auto">
        {names.map((n, i) => i === MIDDLE_CARD_INDEX ?
          <SpecialCard key={n} name={n} /> :
          <Card key={n} name={n} bingo={bingoCards[i]} marked={markedCards[i]} index={i} onClick={mark} />)}
      </div>
    </div>
  )
}

export default App
