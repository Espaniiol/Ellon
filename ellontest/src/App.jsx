import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

function App() {
  
  return (
    <div>
      <div>
      <Outlet/>
      <Navbar/>
      <h1>Ellon Test</h1>

      
      </div>
    </div>
  
   
  )
}

export default App;
