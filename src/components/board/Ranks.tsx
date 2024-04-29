export function Ranks() {
  let ranks: React.ReactNode[] = [];
  for (let i = 0; i < 8; i++) {
    ranks.push(
      <div className='flex justify-center items-center font-semibold text-amber-200'>
        {i + 1}
      </div>
    );
  }

  return <div className='grid grid-rows-8 mr-3'>{ranks}</div>;
}
