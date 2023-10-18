import {useState} from 'react'

const A_KEY_CODE = 65;
const Z_KEY_CODE = 90;
const BACKSPACE_KEY_CODE = 8;
const ENTER_KEY_CODE = 13

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState([]); // guesses as array
  const [history, setHistory] = useState([]); // guesses as strings
  const [isCorrect, setIsCorrect] = useState(false);

  // format a guess into array of letter objects
  const formatGuess = () => {
    console.log("Format guess - ", currentGuess)
    let solutionArray = [...solution]
    let formattedGuess = [...currentGuess].map((letter, index) => {
      let colour = "grey"

      if (solutionArray[index] === letter) {
        colour = "green"
        solutionArray[index] = null
      } else if (solutionArray.includes(letter)) {
        colour = "yellow"
        solutionArray[solutionArray.indexOf(letter)] = null
      }
      return {key: letter, colour: colour}
    })

    return formattedGuess
  }

  // record a guess
  // update isCorrect state
  // +1 to turn counter
  const addNewGuess = () => {
    setTurn(prevTurn => prevTurn + 1)
    setHistory(prevHistory => [...prevHistory, currentGuess])

    if(currentGuess === solution) {
      setIsCorrect(true)
    }
  }

  // handle keyup and track current guess
  // add the guess when user presses enter
  const handleKeyUp = ({key, keyCode}) => {
    if(keyCode >= A_KEY_CODE && keyCode <= Z_KEY_CODE && currentGuess.length < 5) {
      setCurrentGuess(prevValue => prevValue + key)
    } else if (keyCode === BACKSPACE_KEY_CODE) {
      setCurrentGuess(prevValue => prevValue.slice(0, -1))
    } else if (keyCode === ENTER_KEY_CODE) {
      // Only add guess if turn is less than 5
      if (turn > 5) {
        console.log("All guesses are used")
        return
      }

      // Do not allow duplicate guesses
      if(history.includes(currentGuess)) {
        console.log("You already guessed this word")
        return
      }

      // Word must be 5 letters long
      if(currentGuess.length  != 5) {
        console.log("Guesses must be 5 letters long")
        return
      }

      const formattedGuess = formatGuess()
      console.log(formattedGuess)
      setCurrentGuess("")
    }
  }

  return {turn, currentGuess, guesses, isCorrect, handleKeyUp}
}

export default useWordle
