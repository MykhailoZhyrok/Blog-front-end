import React, {useState, useEffect} from 'react'
import cl from './Registr.module.css';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export const AppRegister = () => {

  const [fullName, setFullName]=useState('');
  const [password, setPassword]=useState('');
  const [email, setEmail]=useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const {status}=useSelector(state=>state.auth)

  useEffect(()=>{if(status){
    toast(status)
  }}, [status])

  const dispatch = useDispatch();

  const handleSubmit=()=>{
    
      try{
        dispatch(register({email, password, fullName, avatarUrl}));
        setFullName('');
        setPassword('');
        setEmail('');
      }catch(err){

        console.log(err)
      }
  }

  return (
    <div className={cl.root}>
    <div className={cl.title}>
      Registration 
    </div>
    <input
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className={cl.field}
      placeholder="E-Mail"
      error
      helperText="Неверно указана почта"

    />
    <input value={fullName} onChange={(e)=>setFullName(e.target.value)} className={cl.field} placeholder="Full Name" />
    <input value={password} onChange={(e)=>setPassword(e.target.value)} className={cl.field} placeholder="Password" />
    <div><button className={cl.buttonRegistr} onClick={handleSubmit} >
      Registration
    </button>
    
   </div>
   <Link style={{textDecoration:'none', color:'gray'}} to={'/login'}>
      Login
    </Link>
  </div>
  )
}
