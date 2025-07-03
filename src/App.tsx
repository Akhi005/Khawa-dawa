import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import AllMeal from './pages/AllMeal';
import MealDetails from './pages/MealDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryMealsPage from './pages/CategoryMealsPage';
import BookmarkList from './pages/BookmarkList';
import IngredientsPage from './pages/Ingredients';

export default function App() {
  const location = useLocation();
  const shouldShowNavbar = location.pathname !== '/allmeal';

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowNavbar && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allmeal" element={<AllMeal />} />
          <Route path="/mealdetails/:id" element={<MealDetails />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryMealsPage />}
          />
          <Route path="/favourite" element={<BookmarkList />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
