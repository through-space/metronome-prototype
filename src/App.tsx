import { useState } from 'react'
import './App.css'
import { Metronome } from "@components/organisms/Metronome/Metronome";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Metronome6</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Metronome/>
    </>
  )
}

export default App
