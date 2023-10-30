import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import Art from './pages/Art'
import Code from './pages/Code'
import Navbar from './components/Navbar'

import { WorkoutsContextProvider } from './context/WorkoutsContext'
import { ArtsContextProvider } from './context/ArtsContext'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/workouts"
              element={<WorkoutsContextProvider><Workouts /></WorkoutsContextProvider>}
            />
            <Route 
              path="/art"
              element={<ArtsContextProvider><Art /></ArtsContextProvider>}
            />
             <Route 
              path="/code"
              element={<Code />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

