import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/Home'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
])

function App() {

  return (
    <>
      <RouterProvider
        router={appRouter}
      />
    </>
  )
}

export default App
