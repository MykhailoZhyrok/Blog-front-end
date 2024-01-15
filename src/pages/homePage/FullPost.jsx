import React, { useEffect, useState } from 'react'
import cl from './fullPost.module.css'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Link, useParams } from 'react-router-dom';
import axios from '../../utils/axios'
import { useDispatch } from 'react-redux';
import { createComments, fetchComments } from '../../features/comment/commentSlice';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { selectIsAuth } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
export default function FullPost() {
  const [comment, setComment]=useState('')
  const [post, setPost] = useState('')
  const params = useParams();
const dispatch = useDispatch()
const navigate = useNavigate();
let isAuth = useSelector(selectIsAuth);
const {comments}=useSelector(state=>state.comments);

  const fetchPost = async() =>{
    try{
      const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data)
    
  }catch(err){
    console.log(err)
  }
  }

  const createComment = async(e)=>{
    try{
      if(isAuth){
      
      e.preventDefault()
      const commnetData = {
        id: params.id,
        comment:comment
      }
      dispatch(createComments(commnetData)).then(()=>{
      setComment('');
      getComments();
      })
    }else{
      navigate('/login');
    }
    }catch(err){
      console.log(err)
    }
  }

  const getComments = async()=>{
    try{
      dispatch(fetchComments(params.id))
      console.log(comments)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(() => {
    fetchPost();
    
  }, []);
  useEffect(() => {

    getComments();
  }, [dispatch]); 

 
  
 
  return (
    <div className={cl.postItem}>
        {post.imageUrl?<div><img className={cl.divImg} src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}/></div>:<div/>}
        <h1 className={cl.postTitle}>{post.title}</h1>
        {post?<div className={cl.postText}>{parse(post.text)}</div>:<div/>}
        {post.user?<p className={cl.postUser}>{post.user.fullName}</p>:<div/>}
        <p className={cl.postTag}>{post.tags}</p>
        <button>Remove</button>
        <br/><br/>
        <span><Link to={'/'}>Back</Link></span>
        <form>
          <input value={comment}  onChange={e=>setComment(e.target.value)} placeholder='comment'/>
          <button onClick={createComment}>Send Comment</button>
        </form>
        {comments.length?comments.map((comment)=>(
        <div style={{backgroundColor: '#c4c4c4'}} key={comment._id}>
      <h2 className={cl.postText}>{comment.comment}</h2>
      <p className={cl.postUser}>{comment.user.fullName}</p>
  </div>)):<div>Comments not</div>}
        
    </div>
  )
}
