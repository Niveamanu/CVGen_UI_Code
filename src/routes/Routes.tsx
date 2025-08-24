// import CreateCV from '@/pages/CreateCV'
// import CVBuilder from '@/pages/CVBuilder'
// import Dashboard from '@/pages/Dashboard'
// import Login from '@/pages/Login'
import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import SkeletonPage from '../components/Skeleton/SkeletonPage'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AuthenticateRoute from './AuthenticateRoute'

const Login = React.lazy(() => import('../pages/Login'))
const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const CreateCV = React.lazy(() => import('../pages/CreateCV'))
const CVBuilder = React.lazy(() => import('../pages/CVBuilder'))

export default function NavRoutes() {
  return (
   <Suspense fallback={<SkeletonPage />}>
       <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <AuthenticateRoute>
                <Dashboard />
              </AuthenticateRoute>
            } />
            <Route path="/create-cv" element={
              <AuthenticateRoute>
                <CreateCV />
              </AuthenticateRoute>
            } />
            <Route path="/cv-builder" element={
              <AuthenticateRoute>
                <CVBuilder />
              </AuthenticateRoute>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AnimatePresence>
      </Router>
    </Suspense>
  )
}
