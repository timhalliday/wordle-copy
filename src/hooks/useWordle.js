import {useState} from 'react'

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState([]); // guesses as array
  const [history, setHistory] = useState([]); // guesses as strings
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into array of letter objects
  const formatGuess = (guess) => {
    var output = []

    for(i=0; i<guess.length; i++) {
      let colour = '';
      if (guess[i] === solution[i]) {
        colour = 'green'
      } else if (solution.includes(guess[i])){
        colour = 'yellow'
      } else {
        colour = 'grey'
      }

      output.push({
        letter: guess[i],
        colour: colour
      })
    }
    return output;
  }

  // record a guess
  // update isCorrect state
  // +1 to turn counter
  const addNewGuess = () => {
    setTurn(prevTurn => prevTurn + 1)
    setHistory(prevHistory => [...prevHistory, currentGuess])

    if(currentGuess === solution) {
      setIsCorrect(false)
    }
  }

  // handle keyup and track current guess
  // add the guess when user presses enter
  const handleKeyUp = ({key, keyCode}) => {
    if(keyCode >= 65 && keyCode <= 90 && currentGuess.length < 5) {
      setCurrentGuess(prevValue => prevValue + key)
    } else if (keyCode === 8) {
      setCurrentGuess(prevValue => prevValue.slice(0, -1))
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useWordle
