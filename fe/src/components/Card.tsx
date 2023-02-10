type CardProps = {
  marked: boolean,
  bingo: boolean,
  name: string,
  index: number,
  onClick: (index: number) => void;
};

function Card({ marked, bingo, name, index, onClick }: CardProps) {
  let cls = '';
  if (bingo) {
    cls = 'bg-green-400'
  } else if(marked) {
    cls = 'bg-slate-400'
  }

  const handleClick = () => {
    onClick(index);
  }
  return (<button className={`p-0 pr-1 xl:p-1 xl:border-2 xl:tracking-normal hover:border-solid border aspect-square border-black border-dashed break-words ${cls} tracking-tight transition-colors duration-700`} onClick={handleClick}>{name}</button>)
}

export default Card;
