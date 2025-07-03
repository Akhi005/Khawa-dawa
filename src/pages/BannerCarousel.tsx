import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategoryMeals } from '../redux/mealSlice';
import '/src/index.css';

export default function BannerCarousel() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.meal
  );

  useEffect(() => {
    dispatch(fetchCategoryMeals());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-gray-100 rounded-xl mb-10 shadow-lg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
        <p className="ml-4 text-gray-700 text-xl">Loading delicious meals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-red-50 p-4 rounded-xl mb-10 shadow-lg">
        <p className="text-red-700 text-xl text-center">
          Failed to load meals: {error}. Please try again later.
        </p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-gray-100 p-4 rounded-xl mb-10 shadow-lg">
        <p className="text-gray-600 text-xl text-center">
          No meal categories available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] lg:h-[90vh] rounded-xl overflow-hidden mb-10 shadow-2xl">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1000}
        className="w-full h-full"
      >
        {categories.map((meal) => (
          <SwiperSlide key={meal.idCategory}>
            <div className="relative w-full h-full">
              <img
                src={meal.strCategoryThumb}
                className="w-full h-full object-cover object-center"
                alt={meal.strCategory}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-white text-center p-6 md:p-10">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight font-playfair">
                  Are you Hungry?
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl mb-8 max-w-3xl drop-shadow-md font-semibold">
                  Let's dive into the world of delicious meals,
                  <span className="block mt-2">crafted just for you.</span>
                </p>
                <Link
                  to="/allmeal"
                  className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full text-xl font-bold transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
                  aria-label="Explore All Meals"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
