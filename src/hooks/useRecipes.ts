import { useState, useEffect } from 'react';
import type { Recipe } from '../types/Recipe';

const STORAGE_KEY = 'recipe-manager-recipes';

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // Load recipes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecipes(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load recipes:', error);
      }
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    const newRecipe: Recipe = {
      ...recipe,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setRecipes(prev => [...prev, newRecipe]);
  };

  const updateRecipe = (id: string, updates: Partial<Recipe>) => {
    setRecipes(prev =>
      prev.map(recipe => (recipe.id === id ? { ...recipe, ...updates } : recipe))
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(recipe => recipe.id !== id));
  };

  return {
    recipes,
    addRecipe,
    updateRecipe,
    deleteRecipe,
  };
};
