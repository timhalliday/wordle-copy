import React from 'react'
import Row from '../row/Row'

import "./grid.css"

export default function Grid({currentGuess, guesses, turn}) {


  return (
    <div className="grid">
      {guesses.map((guess, idx) => {
        if(turn === idx) {
          return <Row currentGuess={currentGuess} key={idx} />
        }
        return <Row guess={guess} key={idx} />
      })}
    </div>
  )
}
