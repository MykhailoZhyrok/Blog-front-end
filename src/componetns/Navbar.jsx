import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import cl from './navbar.module.css'
import {useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

export const Navbar = () => {
    let isAuth = useSelector(selectIsAuth);
    const {data}=useSelector(state=>state.auth);
    
    const dispatch = useDispatch();

    const handleLogout =()=>{
      dispatch(logout());
      window.localStorage.removeItem('token');
      toast('you are logout');
    }
    const activeStyle={
        color: 'white',
    }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{fontFamily: 'fantasy', fontSize:'30px' , padding: '0 20px'}}>M</span>
        {isAuth?<ul className={cl.ulNav}>
            <li><NavLink className={cl.linkNav} to={'/'} href='/' style={({isActive})=>isActive?activeStyle:undefined}>Main</NavLink></li>
            <li><NavLink className={cl.linkNav} to={'/create/posts'} href='' style={({isActive})=>isActive?activeStyle:undefined}>Add Post</NavLink></li>
            <li><NavLink className={cl.linkNav} to={'/post'} href='/me' style={({isActive})=>isActive?activeStyle:undefined}>My post</NavLink></li>

        </ul>:<div>Not Found</div>}
        <div >
        {isAuth?<button onClick={handleLogout} className={cl.buttonNav} >Log out</button>: <Link className={cl.buttonNav} to={'/login'}>Login</Link>}
        </div>
    </div>
  )
}
