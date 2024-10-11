import './App.css'
import Quiz from './Quiz'
import { jsQuizz } from './constants'


function App() {

  return (
    <div className="app">
      <Quiz questions= {jsQuizz.questions}/>
    </div>
  )
}

export default App
