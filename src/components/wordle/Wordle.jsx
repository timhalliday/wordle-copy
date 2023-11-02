import React, {useEffect, useState} from 'react'

import useWordle from '../../hooks/useWordle'
import Grid from "../../components/grid/Grid"
import "./wordle.css"
import Keypad from '../Keypad/Keypad'
import Modal from '../modal/Modal'

export default function Wordle({solution}) {
  const { currentGuess, guesses, isCorrect, history, turn, usedKeys, handleKeyUp } = useWordle(solution)
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp)

    if(isCorrect) {
      window.removeEventListener("keyup", handleKeyUp)
      setTimeout(() => setShowModal(true), 1500)
      setShowModal(true)
    }

    if(turn > 5) {
      window.removeEventListener("keyup", handleKeyUp)
      setTimeout(() => setShowModal(true), 1500)
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
        {showModal &&
          <Modal
            isCorrect={isCorrect}
            turn={turn}
            solution={solution}
          />
        }
      </div>
    </section>
  )
}
