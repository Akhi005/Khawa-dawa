import React from 'react';

import {
  MdRestaurantMenu,
  MdOutlineDeliveryDining,
  MdStars,
  MdLocalDining,
  MdOutlineFastfood,
  MdEmojiFoodBeverage,
  MdSecurity,
  MdPhone,
} from 'react-icons/md';
import type { FeatureItemProps, FeaturesSectionProps } from '../types/Meal';

const mealFeatures = [
  {
    icon: MdRestaurantMenu,
    title: 'Diverse Menu',
    description:
      'Explore a wide array of dishes from local delicacies to international cuisines, crafted to perfection.',
  },
  {
    icon: MdOutlineDeliveryDining,
    title: 'Fast Delivery',
    description:
      'Enjoy your favorite meals delivered hot and fresh directly to your doorstep in no time.',
  },
  {
    icon: MdStars,
    title: 'Premium Quality',
    description:
      'We use only the freshest, high-quality ingredients sourced daily to ensure exceptional taste.',
  },
  {
    icon: MdLocalDining,
    title: 'Cozy Ambiance',
    description:
      'Experience a warm and inviting atmosphere perfect for family dinners or romantic evenings.',
  },
  {
    icon: MdOutlineFastfood,
    title: 'Fresh & Healthy',
    description:
      'Our dishes are prepared with utmost care, focusing on both delicious taste and nutritional value.',
  },
  {
    icon: MdEmojiFoodBeverage,
    title: 'Beverage Selection',
    description:
      'Complement your meal with our refreshing selection of drinks, from local beverages to classic sodas.',
  },
  {
    icon: MdSecurity,
    title: 'Hygiene Standards',
    description:
      'We adhere to strict hygiene and safety protocols in our kitchen and during delivery.',
  },
  {
    icon: MdPhone,
    title: 'Easy Ordering',
    description:
      'Order seamlessly through our user-friendly website or dedicated mobile app.',
  },
];

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <div className="text-5xl text-red-500 mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-900 uppercase tracking-wide">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  title = 'Why Choose Khawa Dawa?',
  description = 'Discover the exceptional benefits of dining with us. We are committed to providing you with the best culinary experience.',
  features = mealFeatures,
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
