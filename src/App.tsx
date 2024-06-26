import { Board } from './components/board';

function App() {
  return (
    <div className='flex flex-grow min-h-full bg-neutral-700'>
      <div className='flex grow min-h-full items-center'>
        <Board />
      </div>
    </div>
  );
}

export default App;
