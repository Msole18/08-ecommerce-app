import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomePage from './scenes/home/HomePage'
import Navbar from './scenes/global/Navbar'
import CheckOut from './scenes/checkout/CheckOut'
import ItemDetails from './scenes/itemDetails/ItemDetails'
import Confirmation from './scenes/checkout/Confirmation'

const ScrollToTop = () =>{
  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo(0,0)
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="item/itemID" element={<ItemDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
