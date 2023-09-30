import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/header/Header'

import { generate, count } from "random-words";

function App() {
  const [solution, setSolution] = useState(generate({ minLength: 5, maxLength: 5 }));

  return (
    <>
      <Header/>
    </>
  )
}

export default App
