import React, {useEffect} from 'react'

import useWordle from '../../hooks/useWordle'
import Grid from "../../components/grid/Grid"
import "./wordle.css"

export default function Wordle({solution}) {
  const { currentGuess, guesses, isCorrect, history, turn, handleKeyUp } = useWordle(solution)

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)

    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [handleKeyUp])

  useEffect(() => {
    console.log(history, guesses, turn, isCorrect)
  }, [history, guesses, turn, isCorrect])

  return (
    <section className="wordle">
      <div className="container wordle__container">
        <div>Solution = {solution}</div>
        <div>Current Guess: {currentGuess}</div>
        <Grid
          currentGuess={currentGuess}
          guesses={guesses}
          turn={turn}
        />
      </div>
    </section>
  )
}
