import React from "react";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify";

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyle = {
    color: "white",
  };

  const handlerLogout = async () => {
    await dispatch(logout())
    window.localStorage.removeItem('token')
    toast("Вы вышли из системы")

  }

  return (
    <div className="flex py-4 justify-between items-center">
      <span className="flex text-sx justify-center items-center w-6 h-6 bg-gray-500 text-white rounded-sm">
        E
      </span>

      {
        isAuth && (
          <ul className="flex gap-8 justify-between items-center">
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/"
            className="text-sx text-gray-400 font-bold hover:text-white"
          >
            Главная
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            to="/posts"
            className="text-sx text-gray-500 font-bold hover:text-white"
          >
            Мои посты
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? activeStyle : undefined)} 
            to="/new"
            className="text-sx text-gray-500 font-bold hover:text-white"
          >
            Добавить пост
          </NavLink>
        </li>
      </ul>
        )
      }

      <div className="flex justify-center items-center bg-gray-500 text-xs text-white rounded-sm px-4 py-2">
       {
        isAuth ? (
          <button onClick={handlerLogout}>Выйти</button>
        ) : (
          <Link to="/login">Войти</Link>
        )
       }
      </div>

    </div>
  );
};

export default Navbar;
