import type { IconType } from 'react-icons';
export interface Meal {
  idMeal: string;
  strMealThumb: string;
  strMeal?: string;
  strArea: string;
  strTags: string;
  strIngredients: string;
  strYoutube: string;
  strCategory?: string;
  [key: string]: string | undefined;
}
export type FeaturedMealsProps = {
  meals: Meal[];
};
export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export interface FeatureItemProps {
  icon: IconType;
  title: string;
  description: string;
}

export interface FeaturesSectionProps {
  title?: string;
  description?: string;
  features?: FeatureItemProps[];
}
