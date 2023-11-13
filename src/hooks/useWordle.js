import {useState} from 'react'
import { toast } from 'react-toastify';

const A_KEY_CODE = 65;
const Z_KEY_CODE = 90;
const BACKSPACE_KEY_CODE = 8;
const ENTER_KEY_CODE = 13

const useWordle = (solution, fiveLetterWords) => {
  const [turn, setTurn] = useState(0)
  const [currentGuess, setCurrentGuess] = useState("")
  const [guesses, setGuesses] = useState([...Array(6)]); // guesses as array
  const [history, setHistory] = useState([]); // guesses as strings
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {'a': 'green', 'b' : 'grey'}

  const checkGuessIsWord = () => {
    if(fiveLetterWords.includes(currentGuess.toLowerCase())) {
      return true
    } else {
      return false
    }
  }

  // format a guess into array of letter objects
  const formatGuess = () => {
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
    if (validateGuess() === false) {
      return
    }

    const formattedGuess = formatGuess()

    if(currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses ) => {
      let newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory(prevHistory => [...prevHistory, currentGuess])
    setTurn(prevTurn => prevTurn + 1)

    setUsedKeys((prevUsedKeys) => {
      let newUsedKeys = prevUsedKeys
      formattedGuess.forEach((letter) => {
        if(!newUsedKeys.hasOwnProperty(letter.key)) {
          newUsedKeys[letter.key] = letter.colour;
        }
      })
      return newUsedKeys
    })
    setCurrentGuess("")
  }

  const validateGuess = () => {
    if (!checkGuessIsWord()){
      toast("Not a valid word.")
      return false
    }

    if (turn > 5) {
      toast("Out of guesses!")
      return false
    }

    // Do not allow duplicate guesses
    if(history.includes(currentGuess)) {
      toast("You already guessed this word.")
      return false
    }

    // Word must be 5 letters long
    if(currentGuess.length  != 5) {
      toast("Guesses must be 5 letters long.")
      return false
    }

    return true
  }

  // handle keyup and track current guess
  // add the guess when user presses enter
  const handleKeyUp = ({key, keyCode}) => {
    if(keyCode >= A_KEY_CODE && keyCode <= Z_KEY_CODE && currentGuess.length < 5) {
      setCurrentGuess(prevValue => prevValue + key)
    } else if (keyCode === BACKSPACE_KEY_CODE) {
      setCurrentGuess(prevValue => prevValue.slice(0, -1))
    } else if (keyCode === ENTER_KEY_CODE) {
      addNewGuess()
    }
  }

  const handleKeyPress = ({target}) => {
    const letter = target.dataset.letter;

    if(letter === "ENTER") {
      addNewGuess()
      return
    } else if (letter === "⌫") {
      setCurrentGuess(prevValue => prevValue.slice(0, -1))
      return
    }

    if(currentGuess.length  < 5) {
      setCurrentGuess(prevGuess => prevGuess + letter);
    }
  }

  return {turn, currentGuess, guesses, history, isCorrect, usedKeys, handleKeyUp, handleKeyPress}
}

export default useWordle
