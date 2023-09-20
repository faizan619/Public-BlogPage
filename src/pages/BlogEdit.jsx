import {useEffect,useState} from 'react'
import fb from '../firebase'
import { useParams } from 'react-router-dom'
const DB = fb.firestore();
const Blogslist = DB.collection('public-blogs')

function BlogEdit() {

    const {id} = useParams();
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        Blogslist.doc(id).get().then((snapshot)=>{
            const data = snapshot.data();
            setBody(data.Body);
            setTitle(data.Title);
            setIsLoading(false);
        })
    },[id])
    
    const submit = (e)=>{
        e.preventDefault();
        Blogslist.doc(id).update({
            Title:title,
            Body:body
        }).then((docRef)=>{
            alert("data successfully submit");
        }).catch((error)=>{
            console.error("error :",error)
        })
    }


  return (
    <>
        {
            isLoading? <p>Please Wait While Content is Loading...</p>:(
                <div className="container">
                    <form onSubmit={submit}>
                    <input type="text" placeholder='Title' onChange={(e)=>{setTitle(e.target.value)}} value={title} required />

                    <textarea name="content" type="text" placeholder='write your content'  cols="150" rows="10" onChange={(e)=>{setBody(e.target.value)}} value={body}></textarea>

                    <button type='submit'>Submit</button>
                    </form>
                </div>
            )
        }
    </>
  )
}

export default BlogEdit