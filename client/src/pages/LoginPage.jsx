import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const isAuth = useSelector(checkIsAuth)
  const status = useSelector((state) => state.auth.status)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handlerLogin = () => {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
  }

  useEffect(() => {
    if(status) toast(status)
    if(isAuth) navigate('/')
  }, [isAuth, navigate, status])

  return (
      <form 
      className="w-1/4 h-60 mx-auto mt-44"
      onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-lg text-center text-white font-bold">Авторизация:</h1>
        <div className="mb-4">
          <label
            for="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
          />
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            onClick={handlerLogin}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Войти
          </button>
          <Link 
          to='/register'
          className="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-white"
          >
            Нет аккаунта?
          </Link>
        </div>
      </form>
  );
};

export default LoginPage;
