import type { Recipe } from '../types/Recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

export const RecipeCard = ({ recipe, onEdit, onDelete }: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h3>

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Ingredients:</h4>
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li className="text-gray-500">+{recipe.ingredients.length - 3} more...</li>
            )}
          </ul>
        </div>

        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-600 mb-1">Instructions:</h4>
          <p className="text-sm text-gray-700 line-clamp-3">{recipe.instructions}</p>
        </div>

        {recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(recipe)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
