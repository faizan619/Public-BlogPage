import {useState,useEffect} from 'react'
import {updateDoc, doc, increment, getDoc} from 'firebase/firestore'
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import fb from '../firebase';
import Trator from './Trator';
// const currentUser = auth().currentUser;

const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs');

function BlogList() {

    const [blogs,setBlogs] = useState([]);

    useEffect(()=>{
        const unsubscribe = Blogslist.limit(100).onSnapshot(querySnapshot =>{
            const data = querySnapshot.docs.map(doc =>({
                ...doc.data(),
                id: doc.id,
                likes:doc.data().likes,
                dislike:doc.data().dislikes
            }));
            setBlogs(data);
        })
        blogs.forEach(blog => {
            const displayValue = localStorage.getItem(`likebtn-${blog.id}`);
            if (displayValue) {
                document.getElementById(`likebtn-${blog.id}`).style.display = displayValue;
            }
        });
        return unsubscribe;
    },[blogs])

    const DeleteBlog = (id)=>{
        toast.error("Only Admin can delete the Blog") 
    }

    const handleLike = async (blogId)=>{
        const blogRef = doc(DB, 'public-blogs',blogId);
        await updateDoc(blogRef,{likes:increment(1)});
        document.getElementById(`likebtn-${blogId}`).style.display = "none";
        localStorage.setItem(`likebtn-${blogId}`, "none"); 
    }
    const handleDislike = async (blogId)=>{
        const blogRef = doc(DB, 'public-blogs', blogId);
        await updateDoc(blogRef,{dislikes:increment(1)});
        
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
                            <Link className='linkbtn' to={"/edit/"+blog.id}> <button>Edit</button></Link>
                            <button onClick={()=>{DeleteBlog(blog.id)}}>Delete</button>
                        </div>
                        <div className="likedislike">
                         <div className="likebtn">
                            <button id={`likebtn-${blog.id}`} onClick={()=> handleLike(blog.id)}>Like</button>  <span>{blog.likes} 👍</span>
                        </div>
                        <div>
                            <button className="dislikebtn" onClick={()=> handleDislike(blog.id)}>Dislike  <span>{blog.dislikes} 👎</span></button>
                        </div>
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