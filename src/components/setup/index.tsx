import { useState } from 'react';
import { useSetupGame } from '../../hooks/useSetupGame';

export function SetupGame() {
  const [fenString, setFenString] = useState('');
  const setup = useSetupGame();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFenString(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setup.setupFromFEN(fenString);
  };

  const handleSaveClick = () => {
    setup.buildFenFromGame();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>FEN string</label>
        <input value={fenString} onChange={handleChange} />
        <button type='submit'>Initialize Board</button>
      </form>
      <button onClick={handleSaveClick}>Save game FEN string</button>
    </div>
  );
}
