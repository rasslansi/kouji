// Types for learning content

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';
export type ContentCategory = 'technique' | 'tip' | 'science' | 'equipment' | 'ingredient';

// Topic represents a high-level learning area
export interface LearningTopic {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: ContentCategory;
  skillLevel: SkillLevel;
  articles: LearningArticle[];
}

// Article represents a detailed learning content
export interface LearningArticle {
  id: string;
  topicId: string;
  title: string;
  shortDescription: string;
  fullContent: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  timeToRead: string; // e.g., "5 min read"
  relatedRecipeIds?: string[]; // IDs of recipes that use this technique
  relatedTopicIds?: string[]; // IDs of related topics
  tips?: string[];
  commonMistakes?: string[];
}

// Mock data for cooking technique topics
export const learningTopics: LearningTopic[] = [
  {
    id: "knife-skills",
    title: "Knife Skills",
    description: "Master the fundamental cutting techniques that form the foundation of cooking.",
    imageUrl: "https://example.com/knife-skills.jpg",
    category: "technique",
    skillLevel: "beginner",
    articles: [
      {
        id: "knife-skills-basics",
        topicId: "knife-skills",
        title: "Basic Knife Cuts",
        shortDescription: "Learn the essential knife cuts used in professional kitchens.",
        fullContent: `# Basic Knife Cuts

Good knife skills are the foundation of cooking efficiently and safely. Here are the fundamental cuts every home cook should know:

## The Claw Grip

Always curl your fingertips under and use your knuckles as a guide for the knife. This protects your fingertips while giving you control over what you're cutting.

## Dice

A dice cut creates small cubes of uniform size:
- Fine dice: ⅛-inch cubes
- Medium dice: ¼-inch cubes
- Large dice: ½-inch cubes

## Julienne

Thin, matchstick-sized strips about 1/8 inch wide and 2-3 inches long. Perfect for stir-fries and garnishes.

## Brunoise

A fine dice created by cutting julienned vegetables into tiny cubes, about ⅛-inch. Used for elegant garnishes and delicate soups.

## Chiffonade

Thin ribbon-like strips created by rolling leafy herbs or greens and slicing them thinly. Ideal for garnishing dishes.

## Practice Makes Perfect

The key to improving knife skills is consistent practice. Start slowly and focus on uniformity rather than speed. Speed will come naturally as you develop muscle memory.`,
        imageUrl: "https://example.com/knife-cuts.jpg",
        tags: ["knife skills", "cutting techniques", "kitchen basics"],
        timeToRead: "5 min read",
        tips: [
          "Always keep your knife sharp - a dull knife is more dangerous than a sharp one",
          "Let the knife do the work; avoid applying excessive pressure",
          "Use a cutting board with a damp cloth underneath to prevent slipping"
        ],
        commonMistakes: [
          "Using the wrong knife for the task",
          "Not curling fingers away from the blade",
          "Rushing cuts before developing proper technique"
        ]
      },
      {
        id: "knife-types",
        topicId: "knife-skills",
        title: "Essential Kitchen Knives",
        shortDescription: "Understanding different knife types and their specialized uses.",
        fullContent: `# Essential Kitchen Knives

While a professional chef might have dozens of specialized knives, a home cook can accomplish nearly any task with just a few quality options:

## Chef's Knife

The most versatile knife in your kitchen. Typically 8-10 inches long with a curved blade that allows for a rocking motion when chopping. Perfect for:
- Chopping vegetables
- Slicing meats
- Mincing herbs
- Crushing garlic

## Paring Knife

A small knife (3-4 inches) ideal for precise tasks:
- Peeling fruits and vegetables
- Deveining shrimp
- Removing seeds
- Detailed garnish work

## Serrated Knife

Features a saw-like edge perfect for:
- Slicing bread without crushing it
- Cutting through foods with a tough exterior and soft interior (like tomatoes)
- Slicing cakes horizontally

## Santoku Knife

A Japanese-style knife with a straight edge and dimpled blade:
- Excellent for thin slicing
- Great for vegetables and boneless proteins
- Less rocking motion, more up-and-down chopping

## Caring For Your Knives

- Never put knives in the dishwasher
- Hand wash and dry immediately after use
- Store in a knife block, magnetic strip, or blade guards
- Sharpen regularly with a whetstone or honing rod

Investing in quality knives and taking proper care of them will make cooking more enjoyable and efficient for years to come.`,
        imageUrl: "https://example.com/knife-types.jpg",
        tags: ["knife types", "kitchen equipment", "tools"],
        timeToRead: "7 min read"
      }
    ]
  },
  {
    id: "heat-methods",
    title: "Heat & Cooking Methods",
    description: "Understand how different cooking techniques affect flavor, texture, and nutritional content.",
    imageUrl: "https://example.com/cooking-methods.jpg",
    category: "technique",
    skillLevel: "intermediate",
    articles: [
      {
        id: "dry-heat-cooking",
        topicId: "heat-methods",
        title: "Dry-Heat Cooking Methods",
        shortDescription: "Master techniques like roasting, grilling, and sautéing to develop flavors and textures.",
        fullContent: `# Dry-Heat Cooking Methods

Dry-heat cooking uses hot air, hot metal, radiation, or hot fat to transfer heat to food. These methods typically operate at higher temperatures and are excellent for developing flavors through browning reactions.

## Roasting

Cooking food in an oven with dry, hot air circulating around it:
- Best for larger cuts of meat, whole poultry, and vegetables
- Creates a flavorful exterior while keeping the interior moist
- Typically done at temperatures between 300°F and 450°F
- For even browning, place food on a rack above a pan

## Grilling

Cooking over direct heat, usually from below:
- Creates distinctive charred flavor and grill marks
- Great for steaks, burgers, vegetables, and firm fish
- Use high heat for quick-cooking items, medium for thicker cuts
- Let meat rest after grilling to redistribute juices

## Broiling

Similar to grilling but with heat from above:
- Perfect for thin cuts that cook quickly
- Watch carefully as food can burn easily
- Great for melting cheese or creating a browned topping
- Keep food 3-6 inches from the heat source

## Sautéing

Cooking food quickly in a small amount of hot fat:
- Use a wide, shallow pan for best results
- Food should sizzle when it hits the pan
- Don't overcrowd the pan (food will steam rather than brown)
- Perfect for thin cuts of meat, vegetables, and aromatics

## Stir-frying

Similar to sautéing but with constant movement:
- Use high heat and a wok or large skillet
- Cut ingredients into uniform, bite-sized pieces
- Have all ingredients prepped before starting
- Cook in order of longest to shortest cooking time

## Pan-frying

Using more fat than sautéing but less than deep-frying:
- Great for foods that need a crisp exterior
- Maintain medium to medium-high heat
- Turn food only once if possible for best browning
- Drain on paper towels after cooking

Each method imparts different flavors and textures to food, and mastering these techniques gives you tremendous versatility in the kitchen.`,
        imageUrl: "https://example.com/dry-heat-cooking.jpg",
        tags: ["cooking methods", "roasting", "grilling", "sautéing"],
        timeToRead: "10 min read",
        tips: [
          "For roasting, bring meat to room temperature before cooking for even heating",
          "When sautéing, pat ingredients dry to promote browning",
          "Let your grill or pan fully preheat before adding food"
        ]
      },
      {
        id: "moist-heat-cooking",
        topicId: "heat-methods",
        title: "Moist-Heat Cooking Methods",
        shortDescription: "Learn techniques like braising, steaming, and poaching for tender, flavorful results.",
        fullContent: `# Moist-Heat Cooking Methods

Moist-heat cooking uses water, stock, or steam to transfer heat to food. These methods are excellent for tenderizing tougher cuts of meat and preserving moisture in delicate foods.

## Braising

Cooking food slowly in a small amount of liquid in a covered pot:
- Perfect for tougher cuts of meat like chuck, brisket, or short ribs
- Typically involves searing the meat first, then adding liquid
- Low and slow cooking breaks down collagen into gelatin for tenderness
- Creates flavorful sauce as part of the cooking process

## Stewing

Similar to braising but with smaller pieces of meat fully submerged in liquid:
- Great for creating one-pot meals with meat and vegetables
- Use less tender cuts of meat for the best flavor development
- Simmer gently; never boil, which can toughen meat
- Always taste and adjust seasoning at the end

## Steaming

Cooking food using the steam from boiling water:
- Preserves nutrients and natural flavors better than boiling
- Great for delicate foods like fish, vegetables, and dumplings
- Food should be elevated above the water and not touch it
- Steamers can be specialized equipment or improvised with a rack in a pot

## Poaching

Cooking in liquid that's below the boiling point (160°F to 180°F):
- Perfect for delicate proteins like eggs, fish, and chicken
- Liquid should shimmer but not bubble vigorously
- Can use water, broth, wine, or milk as poaching liquid
- Season the poaching liquid well for flavor infusion

## Simmering

Cooking in liquid just below boiling point with small bubbles:
- Perfect for soups, sauces, and stocks
- Gentler than boiling, preventing ingredients from breaking apart
- Great for flavor extraction and development
- Watch heat carefully; many recipes fail from excessive heat

## Boiling

Cooking in water at 212°F (100°C) with rolling bubbles:
- Best for pasta, rice, and hearty vegetables
- Use generously salted water for properly seasoned food
- Save some cooking water for sauces, especially with pasta
- Time carefully to prevent overcooking

Moist-heat methods excel at creating tender, flavorful dishes and are often great for make-ahead meals that improve with time.`,
        imageUrl: "https://example.com/moist-heat-cooking.jpg",
        tags: ["cooking methods", "braising", "steaming", "poaching"],
        timeToRead: "9 min read",
        tips: [
          "When braising, don't completely submerge the meat - about 1/3 to 1/2 covered is ideal",
          "For steaming, check water levels occasionally to prevent the pot from boiling dry",
          "When poaching eggs, add a splash of vinegar to help the whites set properly"
        ]
      }
    ]
  },
  {
    id: "flavor-building",
    title: "Building Flavor",
    description: "Learn the science and techniques behind creating deep, complex flavors in your cooking.",
    imageUrl: "https://example.com/flavor-building.jpg",
    category: "science",
    skillLevel: "intermediate",
    articles: [
      {
        id: "aromatics",
        topicId: "flavor-building",
        title: "The Power of Aromatics",
        shortDescription: "Discover how ingredients like onions, garlic, and herbs create the foundation of flavor.",
        fullContent: `# The Power of Aromatics

Aromatics are the foundation of flavor in cuisines around the world. These ingredients, typically cooked at the beginning of a dish, create a flavor base that enhances everything added afterward.

## Key Aromatic Ingredients

Different cuisines rely on different combinations of aromatics:

- **French Mirepoix**: Onions, carrots, and celery (2:1:1 ratio)
- **Italian Soffritto**: Onions, carrots, and celery with olive oil
- **Spanish Sofrito**: Onions, garlic, peppers, and tomatoes
- **Cajun/Creole Holy Trinity**: Onions, celery, and bell peppers
- **Chinese**: Scallions, ginger, and garlic
- **Thai**: Lemongrass, galangal, garlic, and chilies
- **Indian**: Onions, garlic, ginger, and sometimes green chilies

## Cooking Aromatics Properly

The way you cook aromatics significantly impacts flavor:

- **Sweating**: Cooking slowly over low heat with a little fat until soft but not browned. This releases gentle flavors without caramelization.
- **Sautéing**: Cooking over medium-high heat until softened and lightly colored, developing deeper flavors.
- **Caramelizing**: Slowly cooking (especially onions) until they turn golden brown and sweet, bringing out natural sugars.
- **Toasting**: Briefly heating dry spices to release their essential oils and intensify their flavors.

## Building Your Aromatic Foundation

1. Choose the right fat (butter, olive oil, coconut oil) based on your cuisine
2. Add aromatics in order of cooking time (onions before garlic, for example)
3. Control temperature carefully - most aromatics burn easily
4. Be patient - rushing this step often results in underdeveloped flavor
5. Add herbs at the appropriate time - woody herbs (rosemary, thyme) early, tender herbs (parsley, cilantro) late

Master the use of aromatics, and you'll elevate every dish you cook, creating complex flavor profiles that make your food memorable.`,
        imageUrl: "https://example.com/aromatics.jpg",
        tags: ["aromatics", "flavor", "cooking basics"],
        timeToRead: "6 min read",
        tips: [
          "Pre-chop aromatics and store in the refrigerator to save time during weeknight cooking",
          "Save vegetable scraps in the freezer to make flavorful stocks",
          "Add a splash of water when sautéing to prevent aromatics from burning"
        ]
      },
      {
        id: "umami-flavor",
        topicId: "flavor-building",
        title: "Understanding Umami",
        shortDescription: "Learn about the fifth taste and how to harness it for more flavorful cooking.",
        fullContent: `# Understanding Umami

Umami, often described as the fifth taste alongside sweet, sour, salty, and bitter, is that deeply satisfying, savory quality found in many foods. Understanding and harnessing umami can transform your cooking from good to exceptional.

## The Science of Umami

Umami was identified by Japanese scientist Kikunae Ikeda in 1908, who isolated glutamates in kelp broth. Scientifically, umami comes from several compounds:

- **Glutamates**: Found in foods like tomatoes, mushrooms, aged cheeses
- **Inosinates**: Present in meats, particularly when cooked
- **Guanylates**: Concentrated in dried mushrooms and some vegetables

When these compounds combine, they create a synergistic effect, multiplying the umami sensation.

## Umami-Rich Ingredients

These ingredients can add depth and complexity to your cooking:

- **Fermented foods**: Soy sauce, miso, fish sauce, aged cheeses
- **Seafood**: Dried fish, shellfish, bonito flakes, anchovy
- **Vegetables**: Tomatoes (especially concentrated), mushrooms (particularly dried), seaweed
- **Meats**: Slow-cooked broths, cured meats, bone marrow
- **Others**: Nutritional yeast, MSG, yeast extracts

## Techniques to Boost Umami

- **Aging**: The breakdown of proteins increases umami (aged cheeses, dry-aged meat)
- **Fermentation**: Creates umami compounds (kimchi, sauerkraut, fish sauce)
- **Drying**: Concentrates umami flavor (sun-dried tomatoes, dried mushrooms)
- **Low & Slow Cooking**: Breaks down proteins into amino acids that deliver umami
- **Caramelization/Browning**: Maillard reactions create new flavor compounds

## Applications in Cooking

- Add a parmesan rind to vegetable soups and stews
- Use mushroom powder as a seasoning for meats and vegetables
- Incorporate small amounts of fish sauce in non-Asian dishes
- Deglaze pans with soy sauce instead of just wine
- Use tomato paste as a base for sauces beyond Italian cuisine
- Add a small amount of miso to salad dressings and marinades

Understanding umami allows you to create more satisfying dishes, reduce reliance on salt, and bring depth to vegetarian cooking without meat-based ingredients.`,
        imageUrl: "https://example.com/umami.jpg",
        tags: ["umami", "flavor science", "taste"],
        timeToRead: "8 min read",
        tips: [
          "Keep a 'umami pantry' with dried mushrooms, tomato paste, and parmesan rinds",
          "Use umami-rich ingredients to reduce the need for salt",
          "Combine different umami sources for maximum flavor impact"
        ]
      }
    ]
  },
  {
    id: "food-science",
    title: "Food Science Basics",
    description: "Understand the scientific principles behind cooking to become more intuitive in the kitchen.",
    imageUrl: "https://example.com/food-science.jpg",
    category: "science",
    skillLevel: "advanced",
    articles: [
      {
        id: "protein-cooking",
        topicId: "food-science",
        title: "The Science of Cooking Proteins",
        shortDescription: "Learn how heat affects proteins and how to achieve your desired texture every time.",
        fullContent: `# The Science of Cooking Proteins

Understanding the science behind protein cooking can transform your results, whether you're cooking a steak, fish fillet, or scrambled eggs.

## Protein Structure and Denaturation

Proteins are long chains of amino acids folded into complex structures. When heated:

1. **Denaturation** occurs: The protein's structure unfolds
2. **Coagulation** follows: Proteins bond together, creating structure
3. **Moisture release** happens: Water is expelled as proteins tighten

This three-step process explains why meats shrink when cooked and why they firm up.

## Temperature Effects on Different Proteins

Each protein denatures at different temperatures:

- **Beef/Lamb**: 
  - Rare: 125°F (52°C) - Proteins just beginning to denature
  - Medium: 140°F (60°C) - Significant denaturation
  - Well Done: 160°F+ (71°C+) - Full denaturation, moisture loss
  
- **Pork/Chicken**: Safe at 145°F (63°C) with 3-minute rest, but often cooked to 160°F (71°C)

- **Fish**: 
  - Delicate fish: 125°F (52°C) for silky texture
  - Firm fish: 140°F (60°C) for flaky texture

- **Eggs**:
  - Egg whites: Begin setting at 144°F (62°C)
  - Egg yolks: Begin setting at 149°F (65°C)
  - Custards set: 160°F-180°F (71°C-82°C)

## Cooking Methods and Effects

- **High Heat Methods** (searing, grilling):
  - Creates Maillard reaction (browning) for flavor
  - Forms crust that seals in moisture
  - Best for tender cuts with less connective tissue

- **Low Heat Methods** (braising, sous vide):
  - Slowly denatures proteins with less moisture loss
  - Breaks down collagen into gelatin in tough cuts
  - Provides greater control over final temperature

- **Acidic Marinades** (lemon juice, vinegar):
  - Denature proteins before cooking
  - Can "cook" proteins without heat (like ceviche)
  - Tenderize by breaking down muscle fibers

- **Salt/Brining**:
  - Dissolves muscle proteins
  - Helps retain moisture during cooking
  - Seasons throughout, not just surface level

## Resting Protein After Cooking

Resting allows:
- Temperature redistribution (carryover cooking)
- Reabsorption of juices that would otherwise run out
- Relaxation of contracted muscle fibers

Rule of thumb: Rest meat for about half the cooking time, or at least 5-10 minutes for larger cuts.

Understanding these principles helps you control texture, juiciness, and flavor in all protein cooking.`,
        imageUrl: "https://example.com/protein-science.jpg",
        tags: ["proteins", "meat cooking", "food science"],
        timeToRead: "10 min read",
        tips: [
          "Use a good digital thermometer for precision cooking",
          "Remember that carryover cooking will raise temperatures 5-10°F after removing from heat",
          "For tough cuts, cook low and slow to break down collagen into gelatin"
        ]
      },
      {
        id: "salting-science",
        topicId: "food-science",
        title: "The Science of Salting",
        shortDescription: "Learn when and how to salt food for maximum flavor enhancement.",
        fullContent: `# The Science of Salting

Salt is perhaps the most important ingredient in cooking. Understanding how it works and when to use it can dramatically improve your food.

## How Salt Works

Salt does far more than just make food taste salty:

- **Enhances flavor perception**: Activates taste buds and suppresses bitterness
- **Extracts moisture**: Draws out water through osmosis
- **Dissolves proteins**: Particularly in meat, improving texture
- **Preserves food**: Inhibits bacterial growth at high concentrations
- **Controls fermentation**: Affects good bacteria in bread, pickles, etc.

## Types of Salt and Their Uses

Different salts have different purposes in cooking:

- **Kosher Salt**: Large, irregular flakes with no additives. Perfect for everyday cooking, brining, and seasoning by hand due to its easy-to-pinch texture and clean flavor.

- **Sea Salt**: Evaporated from seawater with minimal processing. Varying crystal sizes and trace minerals provide subtle flavor differences. Best for finishing dishes.

- **Table Salt**: Fine-grained with anti-caking agents and often iodine. Consistent in volume measurements, good for baking where precision matters.

- **Flaky Sea Salt (like Maldon)**: Large, pyramid-shaped crystals with a clean flavor and pleasing crunch. Ideal as a finishing salt for visual appeal and textural contrast.

- **Specialty Salts**: Smoked salt, black salt, pink Himalayan, etc. Used primarily as finishing salts for their unique properties.

## When to Salt

Timing matters significantly:

- **Before cooking** (meats, eggplant): Draws out moisture initially, but given enough time (40+ minutes), the moisture is reabsorbed with the salt, seasoning throughout.

- **During cooking** (soups, sauces): Build flavor gradually, adding salt in stages as you add ingredients.

- **After cooking** (salads, grilled vegetables): Provides immediate impact with maximum flavor and textural contrast.

- **Special case - Beans**: Salt early (contrary to old wisdom) for beans that hold their shape better and are seasoned throughout.

## How Much Salt to Use

While personal preference varies:

- **Pasta water**: Should taste "as salty as the Mediterranean" (about 1-2 tablespoons per gallon)
- **Meat brining**: About 1 tablespoon kosher salt per pound
- **General savory cooking**: Around 0.75-1% salt by weight for balanced flavor
- **Baking bread**: 1.8-2% salt by flour weight is standard

## Salting Techniques

- **Dry brining**: Salting meat well in advance (1-24 hours) and refrigerating uncovered
- **Wet brining**: Submerging food in salt water solution (about 5-8% salinity)
- **Pinch height**: For even distribution, salt from 10-12 inches above food
- **Salt the water, not the vegetable**: For blanched vegetables, salt the water heavily

Understanding these principles allows you to use salt not just as a seasoning, but as a powerful technique to transform your cooking.`,
        imageUrl: "https://example.com/salt-science.jpg",
        tags: ["salt", "seasoning", "food science"],
        timeToRead: "9 min read",
        tips: [
          "Salt from a height when seasoning to ensure even distribution",
          "When tasting for salt, take multiple bites - your perception will change",
          "Use a salt cellar or pinch bowl for easy access while cooking"
        ]
      }
    ]
  },
  {
    id: "kitchen-organization",
    title: "Kitchen Efficiency & Organization",
    description: "Set up your kitchen for success with proper organization and workflow techniques.",
    imageUrl: "https://example.com/kitchen-organization.jpg",
    category: "tip",
    skillLevel: "beginner",
    articles: [
      {
        id: "mise-en-place",
        topicId: "kitchen-organization",
        title: "Mise en Place: The Chef's Secret Weapon",
        shortDescription: "Learn the professional technique of preparation and organization that makes cooking efficient.",
        fullContent: `# Mise en Place: The Chef's Secret Weapon

"Mise en place" (pronounced "meez ahn plahs") is a French culinary phrase meaning "everything in its place." This practice of preparing and organizing ingredients before cooking is fundamental in professional kitchens and can transform your home cooking experience.

## The Elements of Mise en Place

A proper mise en place includes:

1. **Reading the entire recipe** before starting
2. **Gathering all ingredients and equipment** needed
3. **Preparing ingredients** to the state needed in the recipe:
   - Chopping vegetables
   - Measuring spices and liquids
   - Bringing refrigerated items to room temperature
   - Preparing marinades or sauce components
4. **Organizing ingredients** in order of use
5. **Creating a clean, organized workspace**

## Benefits of Mise en Place

Implementing this practice delivers multiple advantages:

- **Reduces stress** while cooking
- **Prevents mistakes** like forgotten ingredients
- **Improves timing**, especially for quick-cooking dishes
- **Identifies missing ingredients** before it's too late
- **Creates a more enjoyable cooking experience**
- **Results in cleaner cooking** with less mess

## Practical Mise en Place for Home Cooks

You don't need professional equipment to implement mise en place:

- **Small bowls or ramekins** for pre-measured ingredients
- **Prep bowls** for chopped vegetables
- **Measuring cups and spoons** for accurate quantities
- **Cutting boards** for different ingredient types
- **Clean kitchen towels** for wiping hands and surfaces

## Implementing Mise en Place in Different Cooking Scenarios

- **For stir-fries**: Essential due to quick cooking; have everything chopped and sauces mixed
- **For baking**: Measure all ingredients and bring to proper temperature
- **For complex recipes**: Group ingredients by cooking stage
- **For weeknight meals**: Prepare mise en place the night before or morning of

## Beyond Ingredients: Mental Mise en Place

The concept extends to your mental approach to cooking:

- **Plan your cooking sequence**
- **Visualize the process** before beginning
- **Anticipate challenges** and plan solutions
- **Remove distractions** when possible

By adopting mise en place in your cooking routine, you'll transform from a frantic, stressed cook to a calm, methodical one – just like the professionals.`,
        imageUrl: "https://example.com/mise-en-place.jpg",
        tags: ["organization", "preparation", "cooking basics"],
        timeToRead: "6 min read",
        tips: [
          "Clear your sink before starting to cook for a place to put dirty tools",
          "Keep a 'garbage bowl' on your counter for scraps to reduce trips to the trash",
          "Group ingredients by cooking stage for complex recipes"
        ]
      },
      {
        id: "kitchen-tools",
        topicId: "kitchen-organization",
        title: "Essential Kitchen Tools",
        shortDescription: "The must-have tools for an effective kitchen setup, without unnecessary gadgets.",
        fullContent: `# Essential Kitchen Tools

A well-equipped kitchen doesn't require dozens of specialized gadgets. Instead, focus on versatile, quality tools that will serve multiple purposes and last for years.

## Must-Have Knives

- **Chef's knife (8-inch)**: Your kitchen workhorse
- **Paring knife (3-4 inch)**: For detail work and small items
- **Serrated bread knife**: For bread, tomatoes, and delicate items

## Cutting Surfaces

- **Large wooden cutting board**: For most prep work (15×20 inches ideal)
- **Plastic cutting board**: For raw meat (dishwasher safe for sanitation)
- **Small cutting board**: For quick tasks and aromatics

## Essential Pots & Pans

- **10-12 inch stainless steel skillet**: For sautéing, searing, and pan sauces
- **10-12 inch cast iron skillet**: For high-heat cooking, baking, and long heat retention
- **3-quart saucepan with lid**: For sauces, grains, and small-batch cooking
- **5-8 quart Dutch oven**: For braising, soups, stews, and even bread baking
- **Sheet pans (2-3)**: For roasting, baking, and sheet pan dinners

## Preparation Tools

- **Mixing bowls** (various sizes): Stainless steel or glass for durability
- **Liquid measuring cups**: Clear with pour spouts
- **Dry measuring cups and spoons**: For accurate measurements
- **Box grater**: For cheese, vegetables, and zest
- **Colander/strainer**: For draining pasta and washing produce
- **Kitchen scale**: For precision, especially in baking

## Must-Have Utensils

- **Wooden spoons**: Won't scratch pans or transmit heat
- **Silicone spatula**: Heat-resistant for scraping bowls and pans
- **Fish spatula/turner**: Flexible for delicate foods
- **Tongs**: For turning and serving
- **Whisk**: For emulsifying and incorporating air
- **Ladle**: For serving soups and stews
- **Peeler**: For vegetables, fruits, and chocolate shavings

## Beyond the Basics

These aren't essential but add significant value:

- **Immersion blender**: For pureeing soups in the pot
- **Microplane grater**: For zest, hard cheese, garlic, and ginger
- **Instant-read thermometer**: For perfectly cooked proteins
- **Salad spinner**: For drying greens efficiently
- **Stand mixer**: For frequent bakers

## Quality Matters

When purchasing kitchen tools:

- **Buy the best you can afford** for items you use daily
- **Look for solid construction** with few moving parts
- **Choose natural materials** when possible (wood, stainless steel)
- **Avoid unitaskers** unless the task is frequent and important

A well-chosen set of quality tools will make cooking more enjoyable and efficient while lasting for decades.`,
        imageUrl: "https://example.com/kitchen-tools.jpg",
        tags: ["kitchen tools", "equipment", "essentials"],
        timeToRead: "7 min read",
        tips: [
          "Buy quality knives and learn to maintain them properly",
          "Choose kitchen tools with multiple uses to reduce clutter",
          "Look for restaurant supply stores for quality tools at better prices"
        ]
      }
    ]
  }
];

// Function to get all learning topics
export function getAllLearningTopics(): LearningTopic[] {
  return learningTopics;
}

// Function to get a specific learning topic by ID
export function getLearningTopicById(topicId: string): LearningTopic | undefined {
  return learningTopics.find(topic => topic.id === topicId);
}

// Function to get a specific article by ID
export function getLearningArticleById(articleId: string): LearningArticle | undefined {
  for (const topic of learningTopics) {
    const article = topic.articles.find(article => article.id === articleId);
    if (article) {
      return article;
    }
  }
  return undefined;
}

// Function to get articles by skill level
export function getArticlesBySkillLevel(level: SkillLevel): LearningArticle[] {
  const articles: LearningArticle[] = [];
  
  for (const topic of learningTopics) {
    if (topic.skillLevel === level) {
      articles.push(...topic.articles);
    }
  }
  
  return articles;
}

// Function to get topics by category
export function getTopicsByCategory(category: ContentCategory): LearningTopic[] {
  return learningTopics.filter(topic => topic.category === category);
} 