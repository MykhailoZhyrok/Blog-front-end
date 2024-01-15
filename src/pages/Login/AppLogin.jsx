import {React, useState, useEffect} from 'react'
import styles from "./Login.module.css";
import {Link, Navigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe, login, selectIsAuth } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';

export const AppLogin = () => {
  const [password, setPassword]=useState('12345');
  const [email, setEmail]=useState('test@gmail.com');
  const {status}=useSelector(state=>state.auth);
  const {data}=useSelector(state=>state.auth);
  const dispatch = useDispatch();
  let isAuth = useSelector(selectIsAuth);
 


  useEffect(()=>{if(data){
    toast(data.message)
    console.log(data)
  }}, [data])

  const handleSubmit =()=>{
    dispatch(login({email, password}));
    setEmail('');
    setPassword('');

  }

  if(isAuth){
    return <Navigate to="/"/>
  }
  return (
    
        <div className={styles.root}>
          <div className={styles.title}>
            Вход в аккаунт
          </div>
          <input
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className={styles.field}
            placeholder="E-Mail"
            error
            helperText="Неверно указана почта"

          />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className={styles.field} placeholder="Password" />
          <div><button className={styles.buttonLogin} onClick={handleSubmit} >
            Login
          </button>
          </div>
          
          <Link style={{textDecoration:'none', color:'gray'}} to={'/register'}>
            Registration
          </Link>
        </div>
     
  )
}
