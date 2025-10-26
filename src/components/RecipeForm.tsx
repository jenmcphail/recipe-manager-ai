import { useState, useEffect } from 'react';
import type { Recipe } from '../types/Recipe';

interface RecipeFormProps {
  recipe?: Recipe | null;
  onSubmit: (recipe: Omit<Recipe, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const RecipeForm = ({ recipe, onSubmit, onCancel }: RecipeFormProps) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setIngredients(recipe.ingredients.join('\n'));
      setInstructions(recipe.instructions);
      setTags(recipe.tags.join(', '));
      setImageUrl(recipe.imageUrl || '');
    }
  }, [recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recipeData = {
      name: name.trim(),
      ingredients: ingredients.split('\n').filter(i => i.trim()),
      instructions: instructions.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      imageUrl: imageUrl.trim() || undefined,
    };

    onSubmit(recipeData);

    // Reset form
    setName('');
    setIngredients('');
    setInstructions('');
    setTags('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {recipe ? 'Edit Recipe' : 'Add New Recipe'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Recipe Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Ingredients (one per line) *
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Instructions *
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Mix ingredients, bake at 350°F for 30 minutes..."
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="dessert, quick, vegetarian"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Image URL
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          {recipe ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
