import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { useEffect, useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { fetchAllMeals } from '../redux/mealSlice';
import Skeleton from 'react-loading-skeleton';
import type { Meal } from '../types/Meal';
import {
  searchMealByName,
  searchMealByLetter,
  filterMealByCategory,
  filterMealByArea,
  getAllCategories,
  getAllAreas,
} from '../services/mealService';
import { Link } from 'react-router';
import MealSkeletonCard from '../components/SkeletonCard';
import Navbar from '../components/Navbar';

export default function AllMeal() {
  const dispatch = useDispatch<AppDispatch>();
  const { meals, loading, error } = useSelector(
    (state: RootState) => state.meal
  );
  const [searchValue, setSearchValue] = useState('');
  const [filteredMeal, setFilteredMeal] = useState<Meal[]>([]);
  const [searching, setSearching] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [areaList, setAreaList] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [selectedFilter, setSelectedFilter] = useState({
    category: '',
    area: '',
  });
  useEffect(() => {
    const autoSearch = async () => {
      const keyword = searchValue.trim();
      if (keyword.length === 1 && /^[a-zA-Z]$/.test(keyword)) {
        try {
          const result = await searchMealByLetter(keyword);
          setFilteredMeal(result);
        } catch (error) {
          console.error('Auto search error:', error);
          setFilteredMeal([]);
        }
      }
    };

    autoSearch();
  }, [searchValue]);

  useEffect(() => {
    const applyFilter = async () => {
      try {
        let results: Meal[] = [];
        if (selectedFilter.category) {
          results = await filterMealByCategory(selectedFilter.category);
        } else if (selectedFilter.area) {
          results = await filterMealByArea(selectedFilter.area);
        } else {
          setFilteredMeal(meals);
          return;
        }
        setFilteredMeal(results);
      } catch (err) {
        console.error('Failed to filter:', err);
        setFilteredMeal([]);
      }
    };

    applyFilter();
  }, [selectedFilter, meals]);

  useEffect(() => {
    dispatch(fetchAllMeals());
  }, [dispatch]);

  useEffect(() => {
    getAllCategories().then(setCategoryList);
    getAllAreas().then(setAreaList);
  }, []);

  useEffect(() => {
    setFilteredMeal(meals);
  }, [meals]);

  const handleSearch = async () => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword || keyword.length <= 1) return;

    setSearching(true);
    try {
      const result = await searchMealByName(keyword);
      setFilteredMeal(result);
      setSearchValue('');
    } catch (error) {
      console.error('Manual search error:', error);
      setFilteredMeal([]);
    }
    setSearching(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-end items-center gap-4 px-6 py-4 bg-white shadow flex-wrap">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-3 pl-5 pr-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
            placeholder="Search meals..."
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full transition"
            aria-label="Search"
          >
            <IoMdSearch
              onClick={handleSearch}
              className="cursor-pointer"
              size={20}
            />
          </button>
        </div>
      </div>

      <div className="py-10 px-4 sm:px-6 lg:px-16 bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Explore All Meals
          </h2>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
            <select
              className="border rounded px-4 py-2 disabled:text-gray-300 "
              value={selectedFilter.category}
              onChange={(e) =>
                setSelectedFilter((prev) => ({
                  ...prev,
                  category: e.target.value,
                  area: '',
                }))
              }
              disabled={!!selectedFilter.area}
            >
              <option value="">Filter by Category</option>
              {categoryList.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-4 py-2 disabled:text-gray-300 "
              value={selectedFilter.area}
              onChange={(e) =>
                setSelectedFilter((prev) => ({
                  ...prev,
                  area: e.target.value,
                  category: '',
                }))
              }
              disabled={!!selectedFilter.category}
            >
              <option value="">Filter by Area</option>
              {areaList.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-gray-400"
              onClick={() => {
                setFilteredMeal(meals);
                setSelectedFilter({ category: '', area: '' });
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {error && (
          <p className="text-center text-red-600 text-lg font-medium mb-6">
            {error}
          </p>
        )}
        {searching && <Skeleton count={4} height={200} />}
        {!loading && filteredMeal.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-10">
            No meals found. Try again later!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <MealSkeletonCard key={index} />
              ))
            : filteredMeal.slice(0, visibleCount).map((meal) => (
                <Link to={`/mealdetails/${meal.idMeal}`}>
                  <div
                    key={meal.idMeal}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
                  >
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">
                        {meal.strMeal}
                      </h3>
                      <div className="flex flex-wrap gap-2 ">
                        {meal.strCategory && (
                          <span className="inline-block text-sm text-white bg-red-500 px-2 py-1 rounded-full">
                            {meal.strCategory || selectedFilter.category}
                          </span>
                        )}
                        {meal.strArea && (
                          <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded-full">
                            {meal.strArea || selectedFilter.area}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
        {filteredMeal.length > visibleCount && (
          <div className="flex w-full justify-center mt-10 ">
            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-600 text-xl text-white rounded-full transition"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
