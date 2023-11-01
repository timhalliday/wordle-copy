import React from 'react'

export default function Row({guess, currentGuess}) {

  if(guess){
    return(
      <div className='grid__row past'>
        {guess.map((letter, idx) => (
          <div key={idx} className={letter.colour + ' grid__cell'}>{letter.key}</div>
        ))}
      </div>
    )
  }

  if(currentGuess) {
    const letters = currentGuess.split("");

    return(
      <div className='grid__row current'>
        {letters.map((letter, idx) => (
          <div className="grid__cell filled" key={idx}>{letter}</div>
        ))}
        {[...Array(5-letters.length)].map((_, idx) => (
          <div className="grid__cell filled" key={idx}></div>
        ))}
      </div>
    )
  }

  return (
    <div className='grid__row'>
      <div className='grid__cell'></div>
      <div className='grid__cell'></div>
      <div className='grid__cell'></div>
      <div className='grid__cell'></div>
      <div className='grid__cell'></div>
    </div>
  )
}
