import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Wordle from "./components/wordle/Wordle"

import data from '/data/db.json';


function App() {
  const [solution, setSolution] = useState(null)
  const [fiveLetterWords, setFiveLetterWords] = useState([])

  useEffect(() => {
    const solutions = data.solutions
    const randomWord = solutions[Math.floor(Math.random() * solutions.length)].word// Select random word
    setSolution(randomWord)
  }, [setSolution])

  useEffect(() => {
    setFiveLetterWords(data.fiveLetterWords)
    console.log(fiveLetterWords)
  }, [])

  return (
    <>
      <Header/>
      {solution && <Wordle solution={solution} fiveLetterWords={fiveLetterWords}/>}
    </>
  )
}

export default App
