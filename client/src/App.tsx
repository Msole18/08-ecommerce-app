import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/home/HomePage'
import Navbar from './components/Navbar'
import CartMenu from './components/CartMenu'
import Footer from './components/Footer'
import ItemDetails from './pages/details/ItemDetails'


const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="app">
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
