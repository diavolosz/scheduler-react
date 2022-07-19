import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
    }
    if (!replace) {
      setHistory([...history, newMode]);
      setMode(newMode);
    }
  }

  const back = () => {
    let backedHisory = [...history]
    backedHisory.pop()
    setHistory(backedHisory)
    setMode(backedHisory[backedHisory.length - 1])
  }

  return { mode, transition, back }
}

