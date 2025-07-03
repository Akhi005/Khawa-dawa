import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { fetchCategoryMeals } from '../redux/mealSlice';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

export default function TasteByType() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.meal
  );

  useEffect(() => {
    dispatch(fetchCategoryMeals());
  }, [dispatch]);

  return (
    <section className="py-16 px-4 sm:px-10 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-4">
          Taste b<span className="text-orange-600">y Type</span>
        </h2>
        <p className="text-center text-gray-500 text-lg mb-12 max-w-2xl mx-auto">
          Explore delicious meals by category — whether you're craving seafood,
          dessert, or something spicy!
        </p>

        {error && (
          <p className="text-red-600 text-lg font-medium text-center">
            {error}
          </p>
        )}

        {!loading && categories?.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No meals found. Try again later!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories?.map((meal, index) => (
            <motion.div
              key={meal.idCategory}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Link to={`/category/${meal.strCategory}`}>
                <div
                  key={meal.idCategory}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:bg-gray-200"
                >
                  <img
                    src={meal.strCategoryThumb}
                    alt={meal.strCategory}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-yellow-600 transition">
                      {meal.strCategory}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {meal.strCategoryDescription?.slice(0, 80)}...
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
