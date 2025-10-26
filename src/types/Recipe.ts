export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
}

export interface AISuggestion {
  name: string;
  description: string;
}
