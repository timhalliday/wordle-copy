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
        <div>Solution = {solution}</div>
        <div>Current Guess: {currentGuess}</div>
      </div>
    </section>
  )
}
