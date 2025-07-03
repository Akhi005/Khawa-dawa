import TasteByType from './TasteByType';
import RandomMeal from './RandomMeal';
import FeaturesSection from './FeaturesSection';
import BannerCarousel from './BannerCarousel';

export default function Home() {
  return (
    <>
      <div className="px-4 sm:px-8 md:px-16 py-8 bg-gray-50 min-h-screen">
        <BannerCarousel />
        <TasteByType />
      </div>
      <RandomMeal />
      <FeaturesSection />
    </>
  );
}
