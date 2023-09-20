import {} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Create from './pages/Create';
import Header from './pages/Header';
import { Toaster } from 'react-hot-toast';
import BlogList from './pages/BlogList';
import BlogView from './pages/BlogView';
import BlogEdit from './pages/BlogEdit';
import Admin from './pages/Admin';

function App() {

  return (
    <>
    <Toaster 
      position='top-center'
    />
    <Router>
    <Header/>
    
    <div className="invisible">
        Blog support device with width greater than 170px
    </div>
      <Routes>
        <Route path='/' element={<BlogList/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/show/:id' element={<BlogView/>}/>
        <Route path='/edit/:id' element={<BlogEdit/>} />
        <Route path='/admin/faizan' element={<Admin/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App