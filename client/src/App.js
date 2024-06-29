import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { getMe } from './redux/features/auth/authSlice.js';

import MainPage from "./pages/MainPage";
import AllPostPage from "./pages/AllPostPage";
import PostPage from "./pages/PostPage";
import EditPostPage from "./pages/EditPostPage";
import AddPostPage from "./pages/AddPostPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return <Layout>
    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="posts" element={<AllPostPage/>}/>
        <Route path=":id" element={<PostPage/>}/>
        <Route path=":id/edit" element={<EditPostPage/>}/>
        <Route path="new" element={<AddPostPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
    </Routes>
    <ToastContainer position="bottom-right"/>
  </Layout  >
}

export default App;
