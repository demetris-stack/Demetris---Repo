import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Menu from './pages/Menu'
import AnalyticsPage from './pages/analytics/AnalyticsPage'
import DemoLibraryPage from './pages/demo-library/DemoLibraryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/analytics" element={<AnalyticsPage />} />
        <Route path="/menu/demo-library" element={<DemoLibraryPage />} />
      </Routes>
    </BrowserRouter>
  )
}
