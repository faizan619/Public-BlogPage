import {useState} from 'react'
import fb from '../firebase'
import { useParams } from 'react-router-dom'
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs')

function BlogView() {

    const {id} = useParams();
    const [blogs,setBlogs] = useState([]);
    Blogslist.doc(id).get().then((snapshot)=>{
        const data = snapshot.data();
        setBlogs(data);
    })

  return (
    <>
        <div className='perblog'>   
            <p className='perbloguser'>{blogs.User}</p>
            <div className="blogcontent">
            <h1 className='perblogtitle'>{blogs.Title}</h1>
            <p className='perblogbody'>{blogs.Body}</p>
            </div>
        </div>
    </>
  )
}

export default BlogView