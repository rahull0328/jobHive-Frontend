import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import Browse from './components/browse/Browse'
import Profile from './components/profile/Profile'

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
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
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
