export interface RecipeStep {
  id: number;
  title: string;
  description: string;
  estimatedTime?: string; // Optional time needed for the step
  imageUrl?: string; // Optional image for the step
  equipmentNeeded?: string[]; // Optional equipment needed for this step
  techniquesUsed?: string[]; // Optional techniques used in this step
}

export interface Ingredient {
  id: number;
  name: string;
  quantity: string;
  unit?: string;
  preparation?: string; // e.g., "thinly sliced", "minced"
  imageUrl?: string;
  notes?: string;
  isOptional?: boolean;
}

export interface Equipment {
  id: number;
  name: string;
  imageUrl?: string;
  alternatives?: string[];
  notes?: string;
}

export interface Technique {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  videoUrl?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  difficulty: string;
  servings: number;
  rating?: number; // out of 5
  ingredients: Ingredient[];
  equipment: Equipment[];
  techniques: Technique[];
  steps: RecipeStep[];
  cuisine?: string;
  calories?: number;
  tags?: string[];
  notes?: string;
}

// Mock recipe for Chicken Piccata
export const chickenPiccataRecipe: Recipe = {
  id: "chicken-piccata-1",
  title: "Chicken Piccata",
  description: "A classic Italian-American dish featuring thin chicken cutlets in a tangy lemon-caper sauce. Quick to prepare and full of bright flavors.",
  imageUrl: "https://example.com/chicken-piccata.jpg",
  prepTime: "15 mins",
  cookTime: "15 mins",
  totalTime: "30 mins",
  difficulty: "Medium",
  servings: 4,
  rating: 4.8,
  cuisine: "Italian-American",
  calories: 420,
  tags: ["chicken", "dinner", "italian", "quick", "weeknight"],
  notes: "Make sure to pound the chicken to an even thickness for the best results. The sauce can be made ahead and reheated when needed.",
  
  ingredients: [
    {
      id: 1,
      name: "Chicken breasts",
      quantity: "2",
      unit: "large",
      preparation: "butterflied and pounded thin",
      imageUrl: "/assets/ingredients/chicken-breast.jpg"
    },
    {
      id: 2,
      name: "All-purpose flour",
      quantity: "1/2",
      unit: "cup",
      preparation: "for dredging"
    },
    {
      id: 3,
      name: "Salt",
      quantity: "1",
      unit: "tsp"
    },
    {
      id: 4,
      name: "Black pepper",
      quantity: "1/2",
      unit: "tsp",
      preparation: "freshly ground"
    },
    {
      id: 5,
      name: "Olive oil",
      quantity: "2",
      unit: "tbsp"
    },
    {
      id: 6,
      name: "Butter",
      quantity: "4",
      unit: "tbsp",
      preparation: "divided"
    },
    {
      id: 7,
      name: "Lemon juice",
      quantity: "1/4",
      unit: "cup",
      preparation: "freshly squeezed"
    },
    {
      id: 8,
      name: "Chicken broth",
      quantity: "1/2",
      unit: "cup",
      preparation: "low-sodium"
    },
    {
      id: 9,
      name: "Capers",
      quantity: "2",
      unit: "tbsp",
      preparation: "drained"
    },
    {
      id: 10,
      name: "Fresh parsley",
      quantity: "2",
      unit: "tbsp",
      preparation: "chopped",
      isOptional: true
    },
    {
      id: 11,
      name: "Lemon slices",
      quantity: "1",
      unit: "lemon",
      preparation: "thinly sliced",
      isOptional: true,
      notes: "For garnish"
    }
  ],
  
  equipment: [
    {
      id: 1,
      name: "Large skillet",
      notes: "10-12 inch diameter",
      alternatives: ["Sauté pan", "Cast iron skillet"]
    },
    {
      id: 2,
      name: "Meat mallet",
      alternatives: ["Rolling pin", "Heavy bottomed pan"]
    },
    {
      id: 3,
      name: "Tongs",
      notes: "For flipping the chicken"
    },
    {
      id: 4,
      name: "Cutting board"
    },
    {
      id: 5,
      name: "Chef's knife"
    },
    {
      id: 6,
      name: "Shallow dish",
      notes: "For dredging chicken in flour"
    },
    {
      id: 7,
      name: "Whisk"
    }
  ],
  
  techniques: [
    {
      id: 1,
      name: "Butterflying",
      description: "Slicing chicken breasts horizontally to create two thinner pieces. This technique helps the chicken cook faster and more evenly.",
      difficulty: "easy"
    },
    {
      id: 2,
      name: "Pounding",
      description: "Using a meat mallet to flatten chicken to an even thickness, ensuring even cooking and tenderness.",
      difficulty: "easy"
    },
    {
      id: 3,
      name: "Dredging",
      description: "Lightly coating meat in flour before cooking. This creates a light crust and helps the meat brown beautifully.",
      difficulty: "easy"
    },
    {
      id: 4,
      name: "Pan sauce",
      description: "Creating a flavorful sauce in the same pan used to cook meat, incorporating the browned bits and meat juices.",
      difficulty: "medium"
    },
    {
      id: 5,
      name: "Deglazing",
      description: "Adding liquid to a hot pan to loosen browned bits, which adds flavor to sauces and prevents burning.",
      difficulty: "medium"
    }
  ],
  
  steps: [
    {
      id: 1,
      title: "Prepare the chicken",
      description: "Butterfly the chicken breasts and pound them to an even 1/4-inch thickness. Pat dry with paper towels.",
      equipmentNeeded: ["Meat mallet", "Cutting board"],
      techniquesUsed: ["Butterflying", "Pounding"]
    },
    {
      id: 2,
      title: "Season the chicken",
      description: "Season both sides of the chicken with salt and pepper. Dredge in flour, shaking off any excess.",
      equipmentNeeded: ["Shallow dish"],
      techniquesUsed: ["Dredging"]
    },
    {
      id: 3,
      title: "Heat the pan",
      description: "Heat 2 tablespoons of olive oil in a large skillet over medium-high heat until shimmering.",
      equipmentNeeded: ["Large skillet"]
    },
    {
      id: 4,
      title: "Cook the chicken",
      description: "Add the chicken to the pan and cook until golden brown, about 3 minutes per side. Transfer to a plate.",
      equipmentNeeded: ["Large skillet", "Tongs"]
    },
    {
      id: 5,
      title: "Make the sauce",
      description: "Add lemon juice, chicken broth, and capers to the same pan. Bring to a boil, scraping up any browned bits.",
      equipmentNeeded: ["Large skillet", "Whisk"],
      techniquesUsed: ["Deglazing", "Pan sauce"]
    },
    {
      id: 6,
      title: "Finish the sauce",
      description: "Reduce the heat and simmer until the sauce is slightly thickened, about 5 minutes. Whisk in 2 tablespoons of butter.",
      equipmentNeeded: ["Whisk"],
      techniquesUsed: ["Pan sauce"]
    },
    {
      id: 7,
      title: "Return the chicken",
      description: "Return the chicken to the pan and simmer for 2-3 minutes until heated through, turning once.",
      equipmentNeeded: ["Tongs"]
    },
    {
      id: 8,
      title: "Garnish and serve",
      description: "Sprinkle with fresh chopped parsley and serve with lemon slices. Pairs well with pasta or rice.",
      equipmentNeeded: ["Chef's knife"]
    }
  ]
};

// Function to get recipe steps by recipe ID
export function getRecipeById(recipeId: string): Recipe | undefined {
  // In a real app, this would fetch from an API or database
  // For now, we just return the chicken piccata recipe
  if (recipeId === "chicken-piccata-1") {
    return chickenPiccataRecipe;
  }
  return undefined;
}

// Function to get all available recipes
export function getAllRecipes(): Recipe[] {
  return [chickenPiccataRecipe];
} 