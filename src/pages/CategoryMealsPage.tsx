import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../redux/store';
import { fetchMeals } from '../redux/mealSlice';

export default function CategoryMealsPage() {
  const { categoryName } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const { categoryMeals, loading } = useSelector(
    (state: RootState) => state.meal
  );

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchMeals(categoryName));
    }
  }, [categoryName, dispatch]);

  return (
    <div className="px-4 sm:px-8 md:px-16 py-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Meals in "{categoryName}"
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : categoryMeals.length === 0 ? (
        <p className="text-center text-gray-500">No meals found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categoryMeals.map((meal, index) => (
            <motion.div
              key={meal.idMeal}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={`/mealdetails/${meal.idMeal}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {meal.strMeal}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
