
// import './App.css'
import EmployeeCreatePageComponent from './components/EmployeeCreatePageComponent'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  

  return (
    <>
     <BrowserRouter>
       <Routes>
        <Route path = '/' element ={<EmployeeCreatePageComponent/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
