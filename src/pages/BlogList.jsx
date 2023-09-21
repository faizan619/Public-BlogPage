import {useState,useEffect} from 'react'
import fb from '../firebase';
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs');
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Trator from './Trator';

function BlogList() {

    const [blogs,setBlogs] = useState([]);

    useEffect(()=>{
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot =>{
            const data = querySnapshot.docs.map(doc =>({
                ...doc.data(),
                id: doc.id
            }));
            setBlogs(data);
        })
        return unsubscribe;
    },[])

    const DeleteBlog = (id)=>{
        toast.error("Only Admin can delete the Blog") 
    }

  return (
    <>
        <div className='viewBlog'>

            {
                blogs.map(blog =>{
                    return <div className='userBlog' key={blog.id}>
                        <p className='blogtitle'>{blog.Title}</p>
                        <p className='bloguser'>user : {blog.User}</p>
                        <p className='blogbody'>{blog.Body}</p>
                        <div className="btngrp">
                        <Link className='linkbtn' to={"/show/"+blog.id}><button>View</button></Link>
                        <Link className='linkbtn' to={"/edit/"+blog.id}><button>Edit</button></Link>
                        <button onClick={()=>{DeleteBlog(blog.id)}}>Delete</button>
                        </div>
                    </div>
                })
            }
        <Trator/>
        </div>
    </>
  )
}

export default BlogList