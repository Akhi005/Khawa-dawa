import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients } from '../redux/mealSlice';
import type { AppDispatch, RootState } from '../redux/store';
import { GiHerbsBundle } from 'react-icons/gi';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function IngredientsPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { ingredients, loading, error } = useSelector(
    (state: RootState) => state.meal
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-gray-700">
          <h1 className="text-3xl font-alegreya font-semibold">
            Loading Ingredients...
          </h1>
          <p className="text-gray-500 mt-2">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="flex flex-col items-center text-red-700 bg-white p-8 rounded-lg shadow-lg">
          <RiErrorWarningLine size={60} className="text-red-500 mb-4" />
          <h1 className="text-3xl font-alegreya font-semibold mb-2">
            Oops! Something Went Wrong!
          </h1>
          <p className="text-lg text-red-600 text-center">{error}</p>
          <p className="text-gray-500 mt-4">
            Please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 font-alegreya tracking-tight">
        Discover Every Ingredient
      </h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ingredients.map((ingredient) => (
          <li
            key={ingredient.idIngredient}
            className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center border-b-4 border-yellow-500 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
          >
            <div className="bg-yellow-100 text-yellow-800 rounded-full p-4 mb-4 shadow-inner">
              <GiHerbsBundle size={50} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {ingredient.strIngredient}
            </h2>

            <p className="text-md text-gray-700 leading-relaxed text-center overflow-hidden h-20">
              {ingredient.strDescription || (
                <span className="italic text-gray-400">
                  No description available for this ingredient.
                </span>
              )}
            </p>
            {ingredient.strDescription &&
              ingredient.strDescription.length > 100 && (
                <button className="mt-3 text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
                  Read More
                </button>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
