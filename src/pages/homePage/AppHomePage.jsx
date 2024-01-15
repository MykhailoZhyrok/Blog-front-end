import React, {useState, useEffect} from 'react'
import { getPosts, removePost} from '../../features/post/postSlice'
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import cl from './post.module.css'
import { getMe } from '../../features/auth/authSlice';

export const AppHomePage = () => {
  const [userId, setUserId]=useState('')
  
  const dispatch = useDispatch();
  const {data}=useSelector(state=>state.auth);
  const {posts, tags}= useSelector(state=>state.posts);
  const isLoading = posts.status === 'loading';
  
  useEffect(()=>{
    dispatch(getPosts())
  }, []);
  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch])
  if(!posts.item.length){
    console.log(posts)
    return(
      <div>Post not Found</div>
    )
  }
  
  return (
    
    <div className={cl.homePage}>
     
      {!posts?<img src='../../../img_ref/loading.gif' alt='loading'/>:posts.item.map(post=>( <div className={cl.postItem}>
        <div className={cl.buttonBox} style={{marginLeft: "475px"}}>{data && data.userData&&post.user._id===data.userData._id?<button className={`${cl.buttonAtPost} ${cl.first}`} onClick={async (e) => {e.preventDefault()
         dispatch(removePost(post._id)).then(() => {
        dispatch(getPosts());
        })
         }}>Remove</button>:<div/>}
        {data && data.userData&&post.user._id===data.userData._id?<button className={`${cl.buttonAtPost} ${cl.second}`}><Link style={{textDecoration: 'none', color: "rgb(86, 80, 80)"}} to={`post/edit/${post._id}`}>Edit</Link></button>:<div/>}</div>
       <Link className={cl.textItem} to={`/post/${post._id}`}>
       {post.imageUrl?<div><img  className={cl.divImg} src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}/></div>:<div/>}
        <div className={cl.textPost}><h1 className={cl.postTitle}>{post.title}</h1>
       
        <p className={cl.postUser}>{post.user.fullName}.      Views:{post.viewsCount
}</p>
        <p className={cl.postTag}>{post.tags}</p>
        </div>
       </Link>
    </div>))}
      </div>
  )
}
