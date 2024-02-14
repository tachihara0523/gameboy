import { useState, useEffect } from 'react';
import './App.css'
import { Display } from './components/Display';

export type KeyEventTypes = {
  key: string;
  eventId: number;
}

function App() {
  const [keydownEvent, setKeydownEvent] = useState<KeyEventTypes | null>();
  const [keyupEvent, setKeyupEvent] = useState<KeyEventTypes | null>();
  const newKeyEvent = (key: string) => {
    return {
      key: key,
      eventId: Date.now()
    }
  }

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      setKeyupEvent(null);
      setKeydownEvent(newKeyEvent(event.key));
    }
    const handleKeyup = (event: KeyboardEvent) => {
      setKeydownEvent(null);
      setKeyupEvent(newKeyEvent(event.key));
    }
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    }
  }, [])
  
  return (
    <>
      <Display keydownEvent={keydownEvent} keyupEvent={keyupEvent} />
    </>
  )
}

export default App
