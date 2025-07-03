import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';
import type { Category, Ingredient, Meal } from '../types/Meal';
import { API } from '../services/mealAPI';

interface MealState {
  meals: Meal[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  selectedMeal: Meal | null;
  ingredients: Ingredient[];
  categoryMeals: Meal[];
}

const initialState: MealState = {
  meals: [],
  categories: [],
  loading: false,
  error: null,
  selectedMeal: null,
  ingredients: [],
  categoryMeals: [],
};

export const fetchAllMeals = createAsyncThunk<Meal[]>(
  'meal/fetchAllMeals',
  async () => {
    const letters = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(97 + i)
    );
    const responses = await Promise.all(
      letters.map((letter) =>
        axios
          .get<{ meals: Meal[] | null }>(`${API}/search.php?f=${letter}`)
          .then((res) => res.data.meals || [])
          .catch(() => [])
      )
    );
    return responses.flat();
  }
);

export const fetchMealDetails = createAsyncThunk<Meal, string>(
  'meal/fetchMealDetails',
  async (id) => {
    const res = await axios.get<{ meals: Meal[] | null }>(
      `${API}/lookup.php?i=${id}`
    );
    if (!res.data.meals || res.data.meals.length === 0) {
      throw new Error('Meal not found');
    }
    return res.data.meals[0];
  }
);
export const fetchCategoryMeals = createAsyncThunk<Category[]>(
  'meal/fetchCategoryMeals',
  async () => {
    const res = await axios.get<{ categories: Category[] }>(
      `${API}/categories.php`
    );
    return res.data.categories;
  }
);
export const fetchRandomMeal = createAsyncThunk<Meal[]>(
  'meal/fetchRandomMeal',
  async () => {
    const res = await axios.get<{ meals: [] }>(`${API}/random.php`);
    return res.data.meals;
  }
);
export const fetchMeals = createAsyncThunk<Meal[], string>(
  'meal/fetchMeals',
  async (categoryName) => {
    const res = await axios.get<{ meals: Meal[] }>(
      `${API}/filter.php?c=${categoryName}`
    );
    return res.data.meals;
  }
);

export const fetchIngredients = createAsyncThunk<Ingredient[]>(
  'meal/fetchIngredients',
  async () => {
    const res = await axios.get<{ meals: Ingredient[] }>(
      `${API}/list.php?i=list`
    );
    return res.data.meals;
  }
);

const mealSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMeals.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.loading = false;
          state.meals = action.payload;
        }
      )
      .addCase(fetchAllMeals.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch all meals';
      })
      .addCase(fetchCategoryMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategoryMeals.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchCategoryMeals.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch categories';
      })
      .addCase(fetchMealDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedMeal = null;
      })
      .addCase(
        fetchMealDetails.fulfilled,
        (state, action: PayloadAction<Meal>) => {
          state.loading = false;
          state.selectedMeal = action.payload;
        }
      )
      .addCase(fetchMealDetails.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch meal details';
        state.selectedMeal = null;
      })
      .addCase(fetchRandomMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRandomMeal.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.loading = false;
          state.meals = action.payload;
        }
      )
      .addCase(fetchRandomMeal.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch random meal';
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<Ingredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch random meal';
      })
      .addCase(fetchMeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action: PayloadAction<Meal[]>) => {
        state.loading = false;
        state.categoryMeals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch category meals';
      });
  },
});

export default mealSlice.reducer;
