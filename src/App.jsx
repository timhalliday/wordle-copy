import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'
import Wordle from "./components/wordle/Wordle"

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
    .then(response => response.json())
    .then(data => {
      const randomWord = data[Math.floor(Math.random() * data.length)]// Select random word
      setSolution(randomWord.word)
      })
  }, [setSolution])

  return (
    <>
      <Header/>
      {solution && <Wordle solution={solution}/>}
    </>
  )
}

export default App
