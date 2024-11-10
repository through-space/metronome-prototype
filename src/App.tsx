import { useState } from 'react'

import './App.css'
import {Metronome} from "./components/organisms/Metronome/Metronome.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Metronome</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Metronome/>
    </>
  )
}

export default App
