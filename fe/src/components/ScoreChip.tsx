import { useMemo } from "react";
import { getRandomIndex } from "../random";

const COLORS = [
  'stone', 'red', 'orange', 'amber', 'yellow', 'lime',
  'green', 'emerald', 'teal', 'cyan', 'sky', 'blue',
  'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
];

function ScoreChip({ label='Score', value=0 }: { label: string, value: number }) {
  const { color, borderColor, textColor } = useMemo(() => {
    const color_index = getRandomIndex(COLORS);
    return {
      color: `bg-${COLORS[color_index]}-400`,
      borderColor: `border-${COLORS[color_index]}-700`,
      textColor: `text-${COLORS[color_index]}-700`,
    };
  }, [COLORS]);
  return <div className={`lg:text-2xl font-bold lg:px-4 lg:py-2 px-2 py-1 ${color} border-solid rounded-full border-2 lg:border-4 ${borderColor} ${textColor}`}>{label} {value}</div>
}

export default ScoreChip;
