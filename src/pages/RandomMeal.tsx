import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { useEffect } from 'react';
import { fetchRandomMeal } from '../redux/mealSlice';
import { Link } from 'react-router-dom';

export default function RandomMeal() {
  const dispatch = useDispatch<AppDispatch>();
  const { meals, loading, error } = useSelector(
    (state: RootState) => state.meal
  );

  useEffect(() => {
    dispatch(fetchRandomMeal());
  }, [dispatch]);

  const meal = Array.isArray(meals) && meals.length > 0 ? meals[0] : null;

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {meal && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${meal.strMealThumb})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.5)',
          }}
        ></div>
      )}

      {loading && <p className="text-white text-lg">Loading...</p>}
      {error && <p className="text-red-500 text-lg">{error}</p>}

      {meal && (
        <div className="bg-white/20 backdrop-blur-xl text-white rounded-2xl p-10 md:p-14 shadow-xl max-w-3xl mx-auto text-center text-xl space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            {meal.strMeal}
          </h2>
          <p className="text-xl md:text-xl leading-relaxed tracking-wide">
            {meal.strInstructions?.slice(0, 300)}...
          </p>
          <Link
            to={`/mealdetails/${meal.idMeal}`}
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-full transition"
          >
            View Details
          </Link>
        </div>
      )}
    </div>
  );
}
