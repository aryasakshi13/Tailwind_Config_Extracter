import { useState } from 'react'
import './index.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1 className="text-blue-400">Hello from my side</h1>
      </div>
    </>
  )
}

export default App
