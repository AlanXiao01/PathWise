import { useState } from 'react';

export function useAuth(initial = false) {
  const [authed, setAuthed] = useState(initial);
  return { authed, setAuthed };
}
