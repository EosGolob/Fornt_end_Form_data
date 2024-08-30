
// import './App.css'
import EmployeeCreatePageComponent from './components/EmployeeCreatePageComponent'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import NotificationComponent from './components/NotificationComponent';
function App() {
  

  return (
    <>
     <BrowserRouter>
     {/* <NotificationComponent/> */}
       <Routes>
        <Route path = '/' element ={<EmployeeCreatePageComponent/>}/>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
