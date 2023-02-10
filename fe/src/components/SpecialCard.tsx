type SpecialCardProps = {
  name: string,
}

function SpecialCard({ name }: SpecialCardProps) {
  return (<div className={`flex w-100 p-0 pr-1 xl:p-2 xl:border-2 xl:tracking-normal content-center justify-center border aspect-square border-black border-dashed break-words tracking-tight bg-green-200 items-center text-center`}>{name}</div>)
}

export default SpecialCard;
