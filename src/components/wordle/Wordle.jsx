import React, {useEffect} from 'react'

import useWordle from '../../hooks/useWordle'
import Grid from "../../components/grid/Grid"
import "./wordle.css"
import Keypad from '../Keypad/Keypad'

export default function Wordle({solution}) {
  const { currentGuess, guesses, isCorrect, history, turn, usedKeys, handleKeyUp } = useWordle(solution)

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)

    if(isCorrect) {
      console.log("Correct! You win.")
      window.removeEventListener("keyup", handleKeyUp)
    }

    if(turn > 5) {
      console.log("Out of turns! You lose.")
      window.removeEventListener("keyup", handleKeyUp)
    }

    return () => window.removeEventListener("keyup", handleKeyUp)
  }, [handleKeyUp, isCorrect, turn])

  return (
    <section className="wordle">
      <div className="container wordle__container">
        <div style={{display: "none"}}>Solution = {solution}</div>
        <Grid
          currentGuess={currentGuess}
          guesses={guesses}
          turn={turn}
        />
        <Keypad
          usedKeys={usedKeys}
        />
      </div>
    </section>
  )
}
