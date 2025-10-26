import { useState } from 'react';
import OpenAI from 'openai';

interface AISuggestionsProps {
  apiKey: string;
}

export const AISuggestions = ({ apiKey }: AISuggestionsProps) => {
  const [ingredients, setIngredients] = useState('');
  const [suggestions, setSuggestions] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getSuggestions = async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients');
      return;
    }

    if (!apiKey) {
      setError('Please set your OpenAI API key in the app');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestions('');

    try {
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // Note: For production, use a backend API
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `Given these ingredients: ${ingredients}, suggest 3 recipes I can make. For each recipe, provide the name and a brief description (2-3 sentences). Format the response clearly with numbered recipes.`,
          },
        ],
        max_tokens: 500,
      });

      const suggestion = response.choices[0]?.message?.content || 'No suggestions received';
      setSuggestions(suggestion);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        AI Recipe Suggestions
      </h2>
      <p className="text-gray-600 mb-4">
        Tell me what ingredients you have, and I'll suggest recipes you can make!
      </p>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          What ingredients do you have?
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="chicken, rice, tomatoes, onions"
        />
      </div>

      <button
        onClick={getSuggestions}
        disabled={loading}
        className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Getting suggestions...' : 'Get AI Suggestions'}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {suggestions && (
        <div className="mt-4 p-4 bg-white rounded-md shadow">
          <h3 className="font-semibold text-gray-800 mb-2">Suggested Recipes:</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{suggestions}</div>
        </div>
      )}
    </div>
  );
};
