import React, {useState, useEffect} from "react";

import "./keypad.css"

export default function Keypad({usedKeys}) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/letters")
    .then(response => response.json())
    .then(data => {
      setLetters(data)
      })
  }, [setLetters])

  return (
    <div className="keypad">
      {letters && letters.map((row, idx) => {
         // Get this row letter divs
        const letters = row.map((letter) => {
          return <div className={usedKeys[letter.key] ? usedKeys[letter.key] + " key" : "key"} key={letter.key}>{letter.key}</div>
        })

        // Insert letters into row
        return (
          <div key={idx} className="keypad__row">
            {letters}
          </div>
        )
      })}
    </div>
  )
}
