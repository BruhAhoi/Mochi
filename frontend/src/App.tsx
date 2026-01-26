import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ChattAppPage from './pages/ChattAppPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useThemeStore } from './stores/useThemeStore';
import { useEffect } from 'react';
function App() {
  const {isDark, setTheme } = useThemeStore();
  useEffect(() => {
    setTheme(isDark)
  }, [isDark])
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ChattAppPage />} />
          </Route>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
