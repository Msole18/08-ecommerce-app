import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './pages/home/HomePage'
import Navbar from './components/Navbar'
import CheckOut from './pages/checkout/CheckOut'
import ItemDetails from './pages/itemDetails/ItemDetails'
import Confirmation from './pages/checkout/Confirmation'
import CartMenu from './components/CartMenu'
import Footer from './components/Footer'


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
          <Route path="checkout" element={<CheckOut />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
