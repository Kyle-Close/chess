import { useState } from 'react';
import { useSetupGame } from '../../hooks/useSetupGame';
import { RedoMoveButton } from './RedoMoveButton';
import { UndoMoveButton } from './UndoMoveButton';
import { OfferDraw } from './OfferDrawButton';
import { ResignButton } from './ResignButton';
import { ResetButton } from './ResetButton';

export function SetupGame() {
  const [fenString, setFenString] = useState('');
  const setup = useSetupGame();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFenString(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setup.setupFromFEN(fenString);
  };

  return (
    <div className='flex gap-8 max-w-96 mt-6 grow'>
      <form className='flex flex-col gap-2 grow' onSubmit={handleSubmit}>
        <textarea
          className='p-2'
          cols={4}
          value={fenString}
          onChange={handleChange}
          placeholder='FEN string'
        />
        <button className='border-2 py-2 px-4 bg-green-600' type='submit'>
          Initialize Board
        </button>
      </form>
      <div>
        <UndoMoveButton />
        <RedoMoveButton />
      </div>
      <OfferDraw />
      <ResignButton />
      <ResetButton />
    </div>
  );
}
