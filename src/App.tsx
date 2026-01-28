import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from './components/ui/Navbar'
import Index from './pages/Index'
import Services from './pages/Services'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import TestAuth from './pages/TestAuth'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
import { LanguageProvider } from '@/context/LanguageContext'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/admin/Login'
import Register from './pages/admin/Register'
import Dashboard from './pages/admin/Dashboard'
import ProjectsManager from './pages/admin/ProjectsManager'
import CommLink from './pages/admin/CommLink'
import FinanceManager from './pages/admin/FinanceManager'
import CertificatesManager from './pages/admin/CertificatesManager'
import Settings from './pages/admin/Settings'

const queryClient = new QueryClient()

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <Services />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route
          path="/test-auth"
          element={
            <PageTransition>
              <TestAuth />
            </PageTransition>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="leads" element={<CommLink />} />
              <Route path="finances" element={<FinanceManager />} />
              <Route path="certificates" element={<CertificatesManager />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        }
      />
      <Route path="*" element={<AnimatedRoutes />} />
    </Routes>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
