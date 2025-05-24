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
import CreateCompany from './components/admin/CreateCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import AdminJobsInfo from './components/admin/AdminJobsInfo'
import PostJob from './components/admin/PostJob'
import JobSetup from './components/admin/JobSetup'
import TotalApplicants from './components/admin/TotalApplicants'

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
    path: '/admin/companies/create',
    element: <CreateCompany />
  },
  {
    path: '/admin/companies/:id',
    element: <CompanySetup />
  },
  {
    path: '/admin/jobs',
    element: <AdminJobs />
  },
  {
    path: '/admin/jobs/create',
    element: <PostJob />
  },
  {
    path: '/admin/jobs/:id',
    element: <JobSetup />
  },
  {
    path: '/admin/jobs/:id/applicants',
    element: <TotalApplicants />
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
