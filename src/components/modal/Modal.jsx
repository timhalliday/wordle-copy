import React from "react";
import "./modal.css"

export default function Modal({isCorrect, turn, solution}) {

  return (
    <div className="wordle__modal">
      {isCorrect ?
        <div>
          <h1>You Win!</h1>
          <p className="solution">{solution}</p>
          <p>You found the solution in {turn} guesses! 💫</p>
        </div>
      :
       <div>
          <h1>You Lose</h1>
          <p className="solution">The correct answer was: <span className="solution__word">{solution}</span></p>
          <p>Better luck next time! 💪</p>
       </div>
      }
    </div>
  );
}
