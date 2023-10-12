import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import NavBar from './components/NavBar'
import Empresas from './components/Empresas';
import FilterProvider from "./context/FilterProvider";

function App() {
  
  return (
    <FilterProvider>
      <div className='container'>
        <NavBar/>
        <Empresas/>
      </div>
    </FilterProvider>
  )
}


export default App
