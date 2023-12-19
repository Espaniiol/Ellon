import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/Navbar';

function App() {

  return (
  <div>
    <div>
      <div>
      <Outlet/>
      <Navbar/>
      <h1>Ellon Test</h1>
      </div>
    </div>
  </div>
   
  )
}

export default App;
