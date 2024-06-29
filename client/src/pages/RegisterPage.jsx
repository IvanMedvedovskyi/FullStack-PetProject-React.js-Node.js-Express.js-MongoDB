import React, { useEffect } from 'react'
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice'
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const isAuth = useSelector(checkIsAuth)
  const status = useSelector((state) => state.auth.status)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await dispatch(registerUser({ username, password }))
      toast(status)
    } catch (error) {
      console.log(error)
    }
    setUsername('')
    setPassword('')
  }

  useEffect(() => {
    if(status) toast(status)
      if(isAuth) navigate("/")
  }, [isAuth, navigate, status])

  return (
    <form 
    className="w-1/4 h-60 mx-auto mt-44"
    onSubmit={(e) => e.preventDefault()}
    >
      <h1 className="text-lg text-center text-white font-bold">Регистрация:</h1>
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
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Username"
        />
      </div>
      <div class="mb-6">
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
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Подтвердить
        </button>
        <Link to='/login'
          className="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-white"
        >
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  )
}

export default RegisterPage
