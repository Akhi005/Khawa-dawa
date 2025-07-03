import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMealDetails } from '../redux/mealSlice';
import type { AppDispatch, RootState } from '../redux/store';
import { getYouTubeEmbedUrl } from '../components/YouTubeEmbedUrl';
import { FaBookmark, FaCheckSquare, FaRegBookmark } from 'react-icons/fa';
import type { Meal } from '../types/Meal';

export default function MealDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const [bookMark, setBookMark] = useState(false);
  const {
    selectedMeal: meal,
    loading,
    error,
  } = useSelector((state: RootState) => state.meal);

  useEffect(() => {
    if (!meal) return;
    const existing: Meal[] = JSON.parse(
      localStorage.getItem('bookmark') || '[]'
    );
    const isBookmarked = existing.some((item) => item.idMeal === meal.idMeal);
    setBookMark(isBookmarked);
  }, [meal]);
  useEffect(() => {
    if (id) dispatch(fetchMealDetails(id));
  }, [dispatch, id]);

  if (loading || !meal) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold text-lg py-10">
        {error}
      </div>
    );
  }

  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith('strIngredient') && meal[key])
    .map((key) => {
      const measureKey = `strMeasure${key.replace('strIngredient', '')}`;
      return `${meal[key]} - ${meal[measureKey]}`;
    });

  const youtubeEmbedUrl = meal.strYoutube
    ? getYouTubeEmbedUrl(meal.strYoutube)
    : '';

  const toggleBookmark = (meal: Meal) => {
    const existing: Meal[] = JSON.parse(
      localStorage.getItem('bookmark') || '[]'
    );
    const exists = existing.find((item) => item.idMeal === meal.idMeal);
    let updated: Meal[];
    if (exists) {
      updated = existing.filter((item) => item.idMeal !== meal.idMeal);
      setBookMark(false);
    } else {
      updated = [...existing, meal];
      setBookMark(true);
    }
    localStorage.setItem('bookmark', JSON.stringify(updated));
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 bg-gray-200">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-1/3 object-cover brightness-50"
        />
      </div>
      <div className="container mx-auto px-4 py-20 ">
        <div className="bg-white/90 mt-32 backdrop-blur-md shadow-2xl p-6 md:p-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="flex-1">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-72 object-cover rounded-xl mb-6 shadow-lg"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Instructions
              </h2>
              <p className="text-gray-700 text-xl leading-relaxed whitespace-pre-line text-justify">
                {meal.strInstructions}
              </p>
              <div className="mt-12 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Leave a comment
                </h3>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
                <textarea
                  placeholder="Write your comment..."
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  rows={5}
                ></textarea>
                <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                  Submit Comment
                </button>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                  {meal.strMeal}
                </h1>
                {!bookMark ? (
                  <FaRegBookmark
                    size={24}
                    className="cursor-pointer"
                    onClick={() => toggleBookmark(meal)}
                  />
                ) : (
                  <FaBookmark
                    size={24}
                    className="cursor-pointer"
                    onClick={() => toggleBookmark(meal)}
                  />
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">
                  {meal.strCategory}
                </span>
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                  {meal.strArea}
                </span>
                {meal.strTags && (
                  <span className="bg-green-600 text-white text-sm px-3 py-1 rounded-full">
                    {meal.strTags}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Ingredients
              </h2>
              <ul className="space-y-3 mb-8 text-lg text-gray-800">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaCheckSquare className="text-gray-500 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {youtubeEmbedUrl && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Watch on YouTube
                  </h2>
                  <div className="aspect-video rounded-xl shadow overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={youtubeEmbedUrl}
                      title={`Watch ${meal.strMeal} on YouTube`}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
