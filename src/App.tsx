import {BrowserRouter, Routes, Route} from 'react-router-dom'

import MainPage from './components/MainPage/MainPage';
import Details from './components/Details/Details';


const App = () => {

  return (
    
     <BrowserRouter> 
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/drink/:id' element={<Details/>}/>
        </Routes>  
      </BrowserRouter>
  
  
  )
}

export default App;


   

