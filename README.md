# Recipe Manager AI

A modern, full-stack recipe management application with AI-powered meal suggestions. Built with React, TypeScript, and Tailwind CSS, featuring OpenAI integration for intelligent recipe recommendations.

![Recipe Manager AI](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-blue)

## Features

### Core Functionality
- **Recipe Management**: Add, edit, and delete recipes with ease
- **Rich Recipe Details**: Include name, ingredients, instructions, tags, and image URLs
- **Grid Layout**: Beautiful, responsive recipe cards in a grid layout
- **LocalStorage Persistence**: All data saved locally in your browser (no database needed)

### Advanced Features
- **AI-Powered Suggestions**: Ask "What can I make with [ingredients]?" and get instant recipe suggestions powered by OpenAI's GPT-4o-mini
- **Smart Search**: Search recipes by name or ingredients
- **Tag Filtering**: Filter recipes by tags (e.g., dessert, vegetarian, quick)
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: OpenAI API (gpt-4o-mini model)
- **Build Tool**: Vite
- **Data Storage**: Browser LocalStorage
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-manager-ai.git
cd recipe-manager-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Using the AI Features

1. Click "Enter API Key" in the yellow banner at the top
2. Paste your OpenAI API key (starts with `sk-`)
3. Click "Save"
4. You can now use the "AI Recipe Suggestions" feature!

**Note**: The API key is stored in your browser's memory and is never saved to disk or sent anywhere except OpenAI's API.

## Usage

### Adding a Recipe

1. Click the "+ Add New Recipe" button
2. Fill in the recipe details:
   - **Name**: The recipe title
   - **Ingredients**: One ingredient per line
   - **Instructions**: Cooking steps
   - **Tags**: Comma-separated (e.g., "dessert, quick, vegetarian")
   - **Image URL**: Optional image link
3. Click "Add Recipe"

### Editing a Recipe

1. Click the "Edit" button on any recipe card
2. Update the fields
3. Click "Update Recipe"

### Deleting a Recipe

1. Click the "Delete" button on any recipe card
2. Confirm the deletion

### Using AI Suggestions

1. Enter ingredients you have (e.g., "chicken, rice, tomatoes")
2. Click "Get AI Suggestions"
3. Receive 3 recipe suggestions with descriptions

### Searching & Filtering

- **Search bar**: Type to search by recipe name or ingredients
- **Tag filter**: Select a tag to filter recipes

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Click "Deploy"

That's it! Vercel will automatically detect the Vite configuration and deploy your app.

### Deploy to Other Platforms

This app works with any static hosting service:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Just run `npm run build` and deploy the `dist` folder.

## Project Structure

```
recipe-manager-ai/
├── src/
│   ├── components/
│   │   ├── RecipeCard.tsx      # Recipe display card
│   │   ├── RecipeForm.tsx      # Add/edit recipe form
│   │   └── AISuggestions.tsx   # AI suggestion interface
│   ├── hooks/
│   │   └── useRecipes.ts       # Recipe CRUD logic
│   ├── types/
│   │   └── Recipe.ts           # TypeScript interfaces
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Tailwind styles
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Future Enhancements

Potential features for future versions:
- [ ] Recipe import from URLs
- [ ] Nutritional information
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Recipe sharing via URL
- [ ] Image upload support
- [ ] Recipe ratings and reviews
- [ ] Print-friendly recipe view

## Development Notes

### Why LocalStorage?

For this portfolio project, LocalStorage provides:
- Zero backend complexity
- Instant setup
- Perfect for demo purposes
- Data persists across sessions

For production apps, consider:
- Backend API with database
- User authentication
- Cloud storage for images

### API Key Security

**Important**: This app uses `dangerouslyAllowBrowser: true` to call OpenAI from the client. This is fine for:
- Personal use
- Portfolio demos
- Prototypes

For production apps:
- Create a backend API endpoint
- Call OpenAI from your server
- Never expose API keys in client code

## License

MIT License - feel free to use this project for your portfolio!

## Author

Built as a portfolio project to demonstrate:
- React + TypeScript proficiency
- Modern UI with Tailwind CSS
- AI API integration
- Clean code architecture
- Professional documentation

---

**Note**: This is a portfolio project built to showcase technical skills for freelance platform applications. It prioritizes clean code, good UX, and practical features over enterprise-level architecture.
