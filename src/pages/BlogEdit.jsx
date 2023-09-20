import {useEffect,useState} from 'react'
import fb from '../firebase'
import { useParams } from 'react-router-dom'
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs')
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function BlogEdit() {

    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [user,setUser] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        Blogslist.doc(id).get().then((snapshot)=>{
            const data = snapshot.data();
            setUser(data.User)
            setBody(data.Body);
            setTitle(data.Title);
            setIsLoading(false);
        })
    },[id])
    
    const submit = (e)=>{
        e.preventDefault();
        Blogslist.doc(id).update({
            User:user,
            Title:title,
            Body:body
        }).then((docRef)=>{
            toast.success("data successfully edited");
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }).catch((error)=>{
            console.error("error :",error)
            toast.error('cannot edit the blog');
        })
    }


  return ( 
    <>
        {
            isLoading? <p>Please Wait While Content is Loading...</p>:(
                <div className="createform">
            <h1 className='editheading'>{`Edit Form of ${user.split(" ")[0]}`}</h1><br/>

                    <form onSubmit={submit}>
            <input type="text" placeholder='Your Name' value={user} onChange={(e)=>{setUser(e.target.value)}} required autoFocus autoComplete='off' autoCorrect='off' />
            <input type="text" placeholder='Enter Blog Title' value={title} onChange={(e)=>setTitle(e.target.value)} required  autoComplete='off' autoCorrect='off'/>

            <textarea type="text" cols="150" rows="10" value={body}  placeholder='Enter Blog Content' onChange={(e)=>setBody(e.target.value)} required  autoComplete='off' autoCorrect='off' />
            <button type='submit'>Update</button>
        </form>
                </div>
            )
        }
    </>
  )
}

export default BlogEdit