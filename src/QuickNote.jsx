import { useState } from 'react';

function QuickNote() {
  const [note, setNote] = useState('');

  return (
    <div>
      <h3>Nota rapida</h3>

      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Scrie ceva..."
      />

      <p>Ai scris: {note}</p>
    </div>
  );
}

export default QuickNote;