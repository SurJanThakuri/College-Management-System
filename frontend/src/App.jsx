import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from "./store/authSlice"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      dispatch(login({ accessToken }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
