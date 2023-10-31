import React from 'react'

export default function Row({guess}) {

  if(guess){
    return(
      <div className='grid__row past'>
        {guess.map((letter, idx) => (
          <div key={idx} className={letter.colour + ' grid__cell'}>{letter.key}</div>
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
