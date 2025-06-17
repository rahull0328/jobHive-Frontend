import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
<<<<<<< HEAD
import Login from './components/auth/login'
import Register from './components/auth/register'
=======
import Login from './components/auth/Login'
import Register from './components/auth/Register'
>>>>>>> 688e23c (final commit)
import Home from './components/Home'
import Jobs from './components/jobs/Jobs'
import Browse from './components/browse/Browse'
import Profile from './components/profile/Profile'
import JobDescription from './components/jobs/JobDescription'
import Companies from './components/admin/Companies'
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
<<<<<<< HEAD
import AdminJobsInfo from './components/admin/AdminJobsInfo'
=======
>>>>>>> 688e23c (final commit)
import PostJob from './components/admin/PostJob'
import JobSetup from './components/admin/JobSetup'
import TotalApplicants from './components/admin/TotalApplicants'
import ProtectedRoutes from './components/admin/ProtectedRoutes'

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
    element: <ProtectedRoutes><JobDescription /></ProtectedRoutes>
  },
  {
    path: '/browse',
    element: <ProtectedRoutes><Browse /></ProtectedRoutes>
  },
  {
    path: '/profile',
    element: <ProtectedRoutes><Profile /></ProtectedRoutes>
  },

  //admin routes
  {
    path: '/admin/companies',
    element: <ProtectedRoutes requiredRole="recruiter"><Companies /></ProtectedRoutes>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoutes requiredRole="recruiter"><CreateCompany /></ProtectedRoutes>
  },
  {
    path: '/admin/companies/:id',
    element: <ProtectedRoutes requiredRole="recruiter"><CompanySetup /></ProtectedRoutes>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoutes requiredRole="recruiter"><AdminJobs /></ProtectedRoutes>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoutes requiredRole="recruiter"><PostJob /></ProtectedRoutes>
  },
  {
    path: '/admin/jobs/:id',
    element: <ProtectedRoutes requiredRole="recruiter"><JobSetup /></ProtectedRoutes>
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <ProtectedRoutes requiredRole="recruiter"><TotalApplicants /></ProtectedRoutes>
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
