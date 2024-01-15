import {Layout} from './componetns/Layout.jsx';
import {Routes, Route} from 'react-router-dom';
import { AppHomePage } from './pages/homePage/AppHomePage.jsx';
import { AppPosts } from './pages/AppPosts.jsx';
import { AppCreatePost } from './pages/createPost/AppCreatePost.jsx';
import { AppRegister } from './pages/Regist/AppRegister.jsx';
import { AppLogin } from './pages/Login/AppLogin.jsx';
import {ToastContainer} from 'react-toastify';
import { MyPosts } from './pages/homePage/MyPosts.jsx';
import 'react-toastify/dist/ReactToastify.css'
import FullPost from './pages/homePage/FullPost.jsx';
import { AppEditPost } from './pages/homePage/AppEditPost.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMe} from './features/auth/authSlice.js';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch])
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<AppHomePage/>}/>
        <Route path='/post' element={<MyPosts/>}/>
        <Route path='/posts' element={<AppPosts/>}/>
        <Route path='/post/:id' element={<FullPost/>}/>
        <Route path='/create/posts' element={<AppCreatePost/>}/>
        <Route path='/post/edit/:id' element={<AppEditPost/>}/>
        <Route path='/register' element={<AppRegister/>}/>
        <Route path='/login' element={<AppLogin/>}/>
        
      </Routes>
      <ToastContainer position='bottom-right'/>
    </Layout>
  );
}

export default App;
