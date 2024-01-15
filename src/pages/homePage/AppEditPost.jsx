import React, {useState, useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import { selectIsAuth } from '../../features/auth/authSlice';
import { getPosts } from '../../features/post/postSlice';
import cl from './Create.module.css'
import axios from '../../utils/axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 



export const AppEditPost = () => {
  const params = useParams();
  let id = params.id
  let isAuth = useSelector(selectIsAuth);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('')
  const inputFileRef = React.useRef(null)
  const dispatch = useDispatch();
  useEffect(()=>{
    if(id){
      axios.get(`/posts/${id}`).then(({data})=>{
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(','));
        setImageUrl(data.imageUrl)
      })
    }
  }, [])
  useEffect(()=>{
    dispatch(getPosts())
  }, [ ]);
  const handleChangeFile = async(event)=>{
    try{
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      console.log(formData)
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.error(err.response); // Log the entire response
      alert('Error uploading file');
    }
  }

  const navigate = useNavigate()
  const fileInputRef = useRef();
  const handleRef = (e)=>{
    e.preventDefault()
    fileInputRef.current.click();
  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    try{
      const postData = {
        title: title,
        text: text,
        tags: tags,
        imageUrl: imageUrl
      }
      const { data } = await axios.patch(`/posts/${id}`, postData);
      setTitle('');
      setText('');
      setTags('');
      setImageUrl('')
      
      navigate('/')
      dispatch(getPosts());

    }catch(err){

    }
  }
  if(!isAuth){
    return <Navigate to="/"/>
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], 
    ],
  };
  const formats = [
    'bold', 'italic', 'underline', 'strike',
    
  ];

  return (
    
      <form  className={cl.postForm} onSubmit={handleSubmit}>
      <button className={cl.fileButton} onClick={handleRef}>Change file</button>
      <input ref={fileInputRef} onChange={handleChangeFile} type='file' style={{ display: 'none' }}/>
      <div >
        {imageUrl && <img className={cl.divImg} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt='image'></img>}
      </div>
      <input className={cl.inputPost} value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder='title'/>
      <ReactQuill placeholder={'text'} className={cl.textAreaPost} value={text} onChange={(value)=>{setText(value)}} modules={modules}
      formats={formats}/>
      <input className={cl.inputPost} value={tags} onChange={(e)=>{setTags(e.target.value)}} placeholder='tags'/>
      <button className={cl.buttonPost} type='submit'>Submit</button>
    </form>
    
  )
}
