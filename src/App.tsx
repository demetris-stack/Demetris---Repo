import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Menu from './pages/Menu'
import AccountsPage from './pages/accounts/AccountsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/menu" replace />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/accounts" element={<AccountsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
