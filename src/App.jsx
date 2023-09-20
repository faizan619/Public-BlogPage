import {} from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Create from './pages/Create';
import Header from './pages/Header';
import { Toaster } from 'react-hot-toast';
import BlogList from './pages/BlogList';
import BlogView from './pages/BlogView';
import BlogEdit from './pages/BlogEdit';

function App() {
  return (
    <>
    <Toaster 
      position='top-center'
    />
    <Router>
    <Header/>
      <Routes>
        <Route path='/' element={<BlogList/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/show/:id' element={<BlogView/>}/>
        <Route path='/edit/:id' element={<BlogEdit/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App