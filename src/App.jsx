import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from "./welcome"
import Page from "./page"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Page />
  )
}

export default App
