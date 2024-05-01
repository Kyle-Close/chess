import { Board } from './components/board';

function App() {
  return (
    <div className='flex grow gap-8 justify-center'>
      <div className='flex grow h-96 max-w-96'>
        <Board />
      </div>
    </div>
  );
}

export default App;
