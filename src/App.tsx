import { useState, useMemo } from 'react';
import { useRecipes } from './hooks/useRecipes';
import { RecipeCard } from './components/RecipeCard';
import { RecipeForm } from './components/RecipeForm';
import { AISuggestions } from './components/AISuggestions';
import type { Recipe } from './types/Recipe';

function App() {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Get all unique tags from recipes
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [recipes]);

  // Filter recipes based on search query and selected tag
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        searchQuery === '' ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag = selectedTag === '' || recipe.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [recipes, searchQuery, selectedTag]);

  const handleAddRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt'>) => {
    if (editingRecipe) {
      updateRecipe(editingRecipe.id, recipe);
      setEditingRecipe(null);
    } else {
      addRecipe(recipe);
    }
    setShowForm(false);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (id: string) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recipe Manager AI
          </h1>
          <p className="text-gray-600">
            Manage your recipes and get AI-powered cooking suggestions
          </p>
        </div>

        {/* API Key Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          {!apiKey ? (
            <div>
              <p className="text-sm text-yellow-800 mb-2">
                To use AI features, please enter your OpenAI API key:
              </p>
              {showApiKeyInput ? (
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="flex-1 px-3 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowApiKeyInput(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 text-sm"
                >
                  Enter API Key
                </button>
              )}
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm text-green-800">
                API Key configured! AI features are ready.
              </p>
              <button
                onClick={() => {
                  setApiKey('');
                  setShowApiKeyInput(false);
                }}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Clear Key
              </button>
            </div>
          )}
        </div>

        {/* AI Suggestions */}
        {apiKey && <AISuggestions apiKey={apiKey} />}

        {/* Add Recipe Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md"
          >
            + Add New Recipe
          </button>
        )}

        {/* Recipe Form */}
        {showForm && (
          <RecipeForm
            recipe={editingRecipe}
            onSubmit={handleAddRecipe}
            onCancel={handleCancelForm}
          />
        )}

        {/* Search and Filter */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Search recipes
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or ingredients..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Filter by tag
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              {recipes.length === 0
                ? 'No recipes yet. Add your first recipe to get started!'
                : 'No recipes match your search criteria.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
              />
            ))}
          </div>
        )}

        {/* Recipe Count */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </div>
      </div>
    </div>
  );
}

export default App;
