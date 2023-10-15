import React, {useEffect} from 'react'
import useWordle from '../../hooks/useWordle'
import "./wordle.css"

export default function Wordle({solution}) {
  const { currentGuess, history, handleKeyUp } = useWordle(solution)

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)

    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [handleKeyUp])

  return (
    <section className="wordle">
      <div className="container wordle__container">
        <span>Current Guess: {currentGuess}</span>
      </div>
    </section>
  )
}
