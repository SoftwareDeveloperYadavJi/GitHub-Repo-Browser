import { useState } from 'react'
import RepositorySearch from './components/RepositorySearch'




function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <RepositorySearch/>
   </>
  )
}

export default App
