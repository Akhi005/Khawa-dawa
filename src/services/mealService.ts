import axios from 'axios';
import type { Meal } from '../types/Meal';
import { API } from './mealAPI';

export const searchMealByName = async (name: string): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(
    `${API}/search.php?s=${name}`
  );
  return res.data.meals || [];
};

export const searchMealByLetter = async (letter: string): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(
    `${API}/search.php?f=${letter}`
  );
  return res.data.meals || [];
};

export const getMealById = async (id: string): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(
    `${API}/lookup.php?i=${id}`
  );
  return res.data.meals || [];
};

export const getRandomMeal = async (): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(`${API}/random.php`);
  return res.data.meals || [];
};
export const filterMealByCategory = async (
  category: string
): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(
    `${API}/filter.php?c=${category}`
  );
  return res.data.meals || [];
};
export const filterMealByArea = async (area: string): Promise<Meal[]> => {
  const res = await axios.get<{ meals: Meal[] | null }>(
    `${API}/filter.php?a=${area}`
  );
  return res.data.meals || [];
};
export const getAllCategories = async (): Promise<string[]> => {
  const res = await axios.get<{ meals: { strCategory: string }[] }>(
    `${API}/list.php?c=list`
  );
  return res.data.meals.map((m) => m.strCategory);
};
export const getAllAreas = async (): Promise<string[]> => {
  const res = await axios.get<{ meals: { strArea: string }[] }>(
    `${API}/list.php?a=list`
  );
  return res.data.meals.map((m) => m.strArea);
};
