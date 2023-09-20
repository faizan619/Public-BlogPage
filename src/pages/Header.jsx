import {} from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className="header">
        <Link className='headertitle' to={"/"}><h2>Blogs</h2></Link>
        <Link to={"/create"}><button>Create a Blog</button></Link>
    </div>
  )
}

export default Header