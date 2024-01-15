import React, {useState, useEffect} from 'react'
import { getPosts, removePost} from '../../features/post/postSlice'
import {useDispatch, useSelector} from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import cl from './post.module.css'
import { selectIsAuth, getMe} from '../../features/auth/authSlice';

export const MyPosts = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {data}=useSelector(state=>state.auth);
  const {posts, tags}= useSelector(state=>state.posts);
  let isAuth = useSelector(selectIsAuth);
  const isLoading = posts.status === 'loading';
  useEffect(()=>{
    dispatch(getPosts())
  }, [dispatch]);

  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch])
  if(!posts.item.length){
    console.log(posts)
    return(
      <div>Post not Found</div>
    )
  }

  if(!isAuth){
    return <Navigate to="/"/>
  }
  return (
    <div>
      {!posts&&data&&!data.userData._id?<img src='../../../img_ref/loading.gif' alt='loading'/>:posts.item.filter(post=>post.user._id===data.userData._id).map(post=>( <div className={cl.postItem}>
        <div className={cl.buttonBox} style={{marginLeft: "475px"}}>  <button className={`${cl.buttonAtPost} ${cl.first}`} onClick={async () => {
        dispatch(removePost(post._id)).then(() => {
        dispatch(getPosts());
        });
        }}>Remove</button>
        <button className={`${cl.buttonAtPost} ${cl.second}`}><Link style={{textDecoration: 'none', color: "rgb(86, 80, 80)"}} to={`/post/edit/${post._id}`}>Edit</Link></button></div>
        <Link className={cl.textItem} to={`/post/${post._id}`}>
        {post.imageUrl?<div><img className={cl.divImg} src={`${process.env.REACT_APP_API_URL}${post.imageUrl}`}/></div>:<div/>}
        <h1 className={cl.postTitle}>{post.title}</h1>
        <p className={cl.postUser}>{post.user.fullName}</p>
        <p className={cl.postTag}>{post.tags}</p>
        <p className={cl.postTag}>Views:{post.viewsCount}</p>
       </Link>
    </div>))}
       </div>
  )
}
