import EmployeeCreatePageComponent2 from './components/EmployeeCreatePageComponent2'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmployeeCreatePageComponent2 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
