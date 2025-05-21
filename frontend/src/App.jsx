import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import Browse from './components/browse/Browse'
import Profile from './components/profile/Profile'
import JobDescription from './components/jobs/JobDescription'
import Companies from './components/admin/Companies'

const appRouter = createBrowserRouter([
  //student routes
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
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <Profile />
  },

  //admin routes
  {
    path: '/admin/companies',
    element: <Companies />
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
