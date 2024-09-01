import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import '../css/App.css'

function App() {
  const [count, setCount] = useState(0)

  const pdfUrl =
    'https://raw.githubusercontent.com/Piyush6394/Piyush6394/main/Piyush-singh-Resume.pdf'

  return (
    <>
      <div>
        
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <a href={pdfUrl} download="Piyush-singh-Resume.pdf">
          <button className="download-button">Download Resume</button>
        </a>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
