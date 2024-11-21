import ShoppingList from './ShoppingList'
import Subscribe from './Subscribe'
import MainCarousel from './MainCarousel'

const HomePage = () => {
  return (
    <div className="home">
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </div>
  )
}

export default HomePage
