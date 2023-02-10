import { PlayerData } from "../hooks/players";
import ScoreChip from "./ScoreChip";

type ScoreProps = {
  label?: string,
  value: number,
  otherScores: PlayerData[]
};


function Score({ label='Score', value, otherScores }: ScoreProps) {

  return (<div className={`flex flex-row gap-1 w-fit m-2 pb-4 text-center landscape:max-h-[15vh] mx-auto `}>
    <ScoreChip label={label} value={value} />
    {otherScores.map(({ id, player, score }) => <ScoreChip key={id} label={player} value={score} />)}
  </div>);
}

export default Score;
