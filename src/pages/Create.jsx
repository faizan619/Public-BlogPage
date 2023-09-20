import {useState} from 'react';
import fb from '../firebase';
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs');
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Create() {

    const [title,setTitle] = useState("");
    const [user,setUser] = useState("");
    const [body,setBody] = useState("");

    const navigate  = useNavigate();

    const submit = (ele)=>{
        toast.loading("posting")
        ele.preventDefault()
        Blogslist.add({
            User:user,
            Title:title,
            Body:body,
        }).then((docRef)=>{
            toast.remove();
            toast.success("Successfully Post")
            setTitle("");
            setBody("");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }).catch((error)=>{
            console.error("error :",error)
            toast.error("Problem loading your Post")
        })
    }

  return (
    <>
    <div className="createform">
        <form onSubmit={(event)=>submit(event)}>
            <input type="text" placeholder='Your Name' value={user} onChange={(e)=>{setUser(e.target.value)}} required autoFocus autoComplete='off' autoCorrect='off' />
            <input type="text" placeholder='Enter Blog Title' value={title} onChange={(e)=>setTitle(e.target.value)} required  autoComplete='off' autoCorrect='off'/>
            <textarea type="text" cols="150" rows="10" value={body}  placeholder='Enter Blog Content' onChange={(e)=>setBody(e.target.value)} required  autoComplete='off' autoCorrect='off' />
            <button type='submit'>POST</button>
        </form>
    </div>
    </>
  )
}

export default Create