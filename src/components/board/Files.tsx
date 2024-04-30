export function Files() {
  const fileMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const files: React.ReactNode[] = [];
  for (let i = 0; i < 8; i++) {
    files.push(
      <div key={i} className='flex justify-center items-center'>
        {fileMap[i]}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-8 absolute -bottom-8 w-full font-semibold text-amber-400'>
      {files}
    </div>
  );
}
