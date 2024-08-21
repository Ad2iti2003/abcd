import React, { Suspense } from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import {Chart , BarElement, CategoryScale,LinearScale,Tooltip,Legend} from 'chart.js'




import {lazy} from 'react'
import Loader from './Components/Loader';
const Dashboard = lazy(()=> import("./Pages/Dashboard"));
function App() {
  return (
    <Router>
        <Suspense fallback=<Loader/>>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            
        </Routes>
        </Suspense>
    </Router>
  )
}

export default App