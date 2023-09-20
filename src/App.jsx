import {} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Create from './pages/Create';
import Header from './pages/Header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <Toaster 
      position='top-center'
    />
    <Router>
    <Header/>
      <Routes>
        <Route path='/create' element={<Create/>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App