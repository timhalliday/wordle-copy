import React, {useEffect} from 'react'
import useWordle from '../../hooks/useWordle'
import "./wordle.css"

export default function Wordle({solution}) {
  const { currentGuess, history, handleKeyUp } = useWordle(solution)

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)

    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [handleKeyUp])
  
  const historyWords = history.map(item => <li>{item}</li>)

  return (
    <section className="wordle">
      <div className="container wordle__container">
        <span>Current Guess: {currentGuess}</span>
        {historyWords}
      </div>
    </section>
  )
}
