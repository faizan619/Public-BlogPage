import {useState,useEffect} from 'react'
import fb from '../firebase';
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs');
import { Link } from 'react-router-dom';

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
        Blogslist.doc(id).delete().then(()=>{
            alert("Document succesfully deleted");
        }).catch((err)=>{
            console.error("Error removing the blog")
        })
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
                        <button><Link className='linkbtn' to={"/show/"+blog.id}>View</Link></button>
                        <button><Link className='linkbtn' to={"/edit/"+blog.id}>Edit</Link></button>
                        <button onClick={()=>{DeleteBlog(blog.id)}}>Delete</button>
                        </div>
                    </div>
                })
            }
        </div>
    </>
  )
}

export default BlogList