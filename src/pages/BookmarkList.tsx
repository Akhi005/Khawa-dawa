import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Meal } from '../types/Meal';

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Meal[]>([]);

  useEffect(() => {
    const stored: Meal[] = JSON.parse(localStorage.getItem('bookmark') || '[]');
    setBookmarks(stored);
  }, []);

  const handleRemove = (idMeal: string) => {
    const updated = bookmarks.filter((meal) => meal.idMeal !== idMeal);
    localStorage.setItem('bookmark', JSON.stringify(updated));
    setBookmarks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h2 className=" italic text-3xl font-bold text-gray-800 mb-16 text-center">
        Your Favorite Flavors
      </h2>

      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bookmarks.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group relative"
            >
              <Link to={`/mealdetails/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {meal.strMeal}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {meal.strArea} • {meal.strCategory}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end items-center p-4 pt-0">
                <button
                  onClick={() => handleRemove(meal.idMeal)}
                  className="text-red-500 hover:text-red-700 text-md font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
