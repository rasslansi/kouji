import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Animated,
  Dimensions,
  FlatList,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { chickenPiccataRecipe, Recipe, getRecipeById, Ingredient, Equipment, Technique } from '../../mocks/recipeSteps';
import 'nativewind';

const IMAGE_HEIGHT = 300;
const HEADER_HEIGHT = 100; // Approx height of Title + Tabs combined
const { width } = Dimensions.get('window');

// Ingredient Card Component
const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => (
  <View className="bg-white rounded-lg p-3 mb-3 border border-gray-100 shadow-sm">
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800">{ingredient.name}</Text>
      <Text className="text-sm text-gray-600 mt-1">
        {ingredient.quantity} {ingredient.unit || ''}
        {ingredient.preparation ? ` (${ingredient.preparation})` : ''}
      </Text>
      {ingredient.notes && (
        <Text className="text-xs text-gray-500 mt-1 italic">{ingredient.notes}</Text>
      )}
      {ingredient.isOptional && (
        <Text className="text-xs text-amber-700 font-medium mt-1 bg-amber-50 self-start px-2 py-0.5 rounded">Optional</Text>
      )}
    </View>
  </View>
);

// Equipment Card Component
const EquipmentCard = ({ equipment }: { equipment: Equipment }) => (
  <View className="flex-row bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm">
    <View className="w-10 h-10 rounded-full bg-amber-50 items-center justify-center mr-3">
      <MaterialIcons name="restaurant" size={24} color="#FFCD4F" />
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-800">{equipment.name}</Text>
      {equipment.notes && (
        <Text className="text-sm text-gray-600 mt-1">{equipment.notes}</Text>
      )}
      {equipment.alternatives && equipment.alternatives.length > 0 && (
        <View className="mt-2">
          <Text className="text-xs font-medium text-gray-700">Alternatives:</Text>
          <Text className="text-sm text-gray-600">{equipment.alternatives.join(', ')}</Text>
        </View>
      )}
    </View>
  </View>
);

// Technique Card Component
const TechniqueCard = ({ technique }: { technique: Technique }) => (
  <View className="bg-white rounded-lg p-4 mb-3 border border-gray-100 shadow-sm">
    <View className="flex-row justify-between items-center mb-2">
      <Text className="text-base font-semibold text-gray-800">{technique.name}</Text>
      <View className={`px-2 py-1 rounded-md ${
        technique.difficulty === 'easy' ? 'bg-green-100' 
        : technique.difficulty === 'medium' ? 'bg-amber-100' 
        : 'bg-red-100'
      }`}>
        <Text className={`text-xs font-semibold ${
          technique.difficulty === 'easy' ? 'text-green-700' 
          : technique.difficulty === 'medium' ? 'text-amber-700' 
          : 'text-red-700'
        }`}>
          {technique.difficulty.toUpperCase()}
        </Text>
      </View>
    </View>
    <Text className="text-sm text-gray-600 mb-3">{technique.description}</Text>
    {technique.videoUrl && (
      <TouchableOpacity className="flex-row items-center self-start">
        <MaterialIcons name="play-circle-filled" size={16} color="#FFCD4F" />
        <Text className="text-sm font-medium text-amber-600 ml-1">Watch Tutorial</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Tab components with real data
const IngredientsTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} className="p-4">
    <Text className="text-base text-gray-600 mb-4 italic">
      This recipe requires {recipe.ingredients.length} ingredients. Prepare them before starting to cook.
    </Text>
    {recipe.ingredients.map(ingredient => (
      <IngredientCard key={ingredient.id} ingredient={ingredient} />
    ))}
    <View className="h-5" />
  </ScrollView>
);

const StepsTab = ({ recipe }: { recipe: Recipe }) => {
  // Group steps by similar titles to create sections
  const sections = recipe.steps.reduce((acc, step) => {
    const sectionTitle = step.title.split(' ')[0]; // Simple grouping by first word
    if (!acc[sectionTitle]) {
      acc[sectionTitle] = [];
    }
    acc[sectionTitle].push(step);
    return acc;
  }, {} as Record<string, typeof recipe.steps>);

  return (
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} className="p-4">
      {Object.entries(sections).map(([sectionTitle, steps], sectionIndex) => (
        <View key={sectionTitle}>
          <Text className="text-lg font-bold text-gray-800 mb-3 mt-2">{sectionTitle}</Text>
          {steps.map((step, stepIndex) => (
            <View key={step.id} className="bg-white rounded-lg p-4 mb-4 border border-gray-100 shadow-sm flex-row">
              <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center">
                <Text className="text-sm font-bold text-amber-700">{step.id}</Text>
              </View>
              <View className="w-px h-full bg-gray-200 mx-3" />
              <View className="flex-1">
                <View className="mb-2">
                  <Text className="text-base font-semibold text-gray-800">{step.title}</Text>
                </View>
                <Text className="text-sm text-gray-600 mb-3">{step.description}</Text>
                
                {/* Show related equipment and techniques */}
                {step.equipmentNeeded && step.equipmentNeeded.length > 0 && (
                  <View className="mt-2">
                    <Text className="text-xs font-medium text-gray-700">Equipment:</Text>
                    <Text className="text-sm text-gray-600">{step.equipmentNeeded.join(', ')}</Text>
                  </View>
                )}
                
                {step.techniquesUsed && step.techniquesUsed.length > 0 && (
                  <View className="mt-2">
                    <Text className="text-xs font-medium text-gray-700">Techniques:</Text>
                    <Text className="text-sm text-gray-600">{step.techniquesUsed.join(', ')}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
      <View className="h-5" />
    </ScrollView>
  );
};

const EquipmentTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} className="p-4">
    <Text className="text-base text-gray-600 mb-4 italic">
      Make sure you have all the necessary equipment before starting. Alternatives are provided where possible.
    </Text>
    {recipe.equipment.map(equipment => (
      <EquipmentCard key={equipment.id} equipment={equipment} />
    ))}
    <View className="h-5" />
  </ScrollView>
);

const TechniquesTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} className="p-4">
    <Text className="text-base text-gray-600 mb-4 italic">
      These cooking techniques will help you prepare this dish like a professional chef.
    </Text>
    {recipe.techniques.map(technique => (
      <TechniqueCard key={technique.id} technique={technique} />
    ))}
    <View className="h-5" />
  </ScrollView>
);

export default function RecipePage() {
  const params = useLocalSearchParams();
  const recipeId = params.id as string || 'chicken-piccata-1'; // default recipe
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState('Steps');
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Load recipe data
  useEffect(() => {
    const recipeData = getRecipeById(recipeId);
    if (recipeData) {
      setRecipe(recipeData);
    } else {
      // Fallback to default recipe if ID not found
      setRecipe(chickenPiccataRecipe);
    }
  }, [recipeId]);

  const renderTab = () => {
    if (!recipe) return null;
    
    switch (activeTab) {
      case 'Steps':
        return <StepsTab recipe={recipe} />;
      case 'Ingredients':
        return <IngredientsTab recipe={recipe} />;
      case 'Equipment':
        return <EquipmentTab recipe={recipe} />;
      case 'Techniques':
        return <TechniquesTab recipe={recipe} />;
      default:
        return <StepsTab recipe={recipe} />;
    }
  };

  // Parallax effect for recipe image
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [150, 0, -150],
    extrapolate: 'clamp',
  });

  // Fade in effect for recipe info container as you scroll
  const infoContainerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  if (!recipe) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg font-medium text-gray-800">Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Recipe Image with Parallax Effect */}
      <View className="absolute top-0 left-0 right-0 h-[300px] overflow-hidden z-[1]">
        <Animated.Image
          source={{ uri: recipe.imageUrl || 'https://via.placeholder.com/600x400' }}
          className="w-full h-full"
          style={{ transform: [{ translateY: imageTranslateY }] }}
          resizeMode="cover"
        />
      </View>
      
      <Animated.ScrollView
        className="flex-1 bg-transparent"
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        {/* Transparent Spacer for Image */}
        <View style={{ height: IMAGE_HEIGHT }} />
        
        <Animated.View 
          className="bg-white px-4 pt-4 pb-3"
          style={{ opacity: infoContainerOpacity }}
        >
          <Text className="text-2xl font-extrabold text-gray-800 mb-2">{recipe.title}</Text>
          <Text className="text-base text-gray-600 leading-6 mb-3">{recipe.description}</Text>
          
          <View className="flex-row items-center my-2">
            <View className={`${
              recipe.difficulty === 'easy' ? 'bg-green-100' 
              : recipe.difficulty === 'medium' ? 'bg-amber-100' 
              : 'bg-red-100'
            } px-3 py-1 rounded mr-3`}>
              <Text className={`text-xs font-semibold ${
                recipe.difficulty === 'easy' ? 'text-green-700' 
                : recipe.difficulty === 'medium' ? 'text-amber-700'
                : 'text-red-700'
              }`}>
                {recipe.difficulty.toUpperCase()}
              </Text>
            </View>
            
            <View className="flex-row">
              <Text className="text-sm text-gray-600 mr-3">
                <MaterialIcons name="access-time" size={14} color="#777777" /> {recipe.cookTime}
              </Text>
              <Text className="text-sm text-gray-600 mr-3">
                <MaterialIcons name="restaurant" size={14} color="#777777" /> {recipe.servings} servings
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center my-2">
            <MaterialIcons name="star" size={18} color="#FFCD4F" />
            <MaterialIcons name="star" size={18} color="#FFCD4F" />
            <MaterialIcons name="star" size={18} color="#FFCD4F" />
            <MaterialIcons name="star" size={18} color="#FFCD4F" />
            <MaterialIcons name="star-half" size={18} color="#FFCD4F" />
            <Text className="text-sm font-medium text-gray-600 ml-2">4.7 (243 ratings)</Text>
          </View>
        </Animated.View>
        
        {/* Tabs Navigation */}
        <View className="bg-white border-b border-gray-200">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {['Steps', 'Ingredients', 'Equipment', 'Techniques'].map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className="px-4 py-3 relative"
              >
                <Text className={`text-base font-medium ${
                  activeTab === tab ? 'text-gray-800 font-semibold' : 'text-gray-500'
                }`}>
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View className="absolute bottom-0 left-4 right-4 h-0.75 bg-amber-400 rounded-t" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Tab Content */}
        <View className="flex-1 bg-gray-50">
          {renderTab()}
        </View>
        
        {/* Footer with Cook Button */}
        <View className="bg-white px-4 py-3 border-t border-gray-200">
          <TouchableOpacity
            className="bg-amber-400 rounded-full py-3 items-center"
            onPress={() => router.push(`/recipe/cook?id=${recipe.id}`)}
          >
            <Text className="text-base font-semibold text-amber-900">Start Cooking</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

// --- Styles --- //
interface Styles {
  container: ViewStyle;
  headerContainer: ViewStyle;
  recipeImage: ImageStyle;
  scrollView: ViewStyle;
  recipeInfoContainer: ViewStyle;
  recipeTitle: TextStyle;
  recipeDescription: TextStyle;
  recipeMetaContainer: ViewStyle;
  difficultyBadge: ViewStyle;
  easyBadge: ViewStyle;
  mediumBadge: ViewStyle;
  hardBadge: ViewStyle;
  difficultyText: TextStyle;
  recipeMetaDetails: ViewStyle;
  recipeMetaText: TextStyle;
  ratingContainer: ViewStyle;
  ratingText: TextStyle;
  tabsContainer: ViewStyle;
  tabsScroll: ViewStyle;
  tabButton: ViewStyle;
  tabText: TextStyle;
  activeTabText: TextStyle;
  activeTabIndicator: ViewStyle;
  tabContentContainer: ViewStyle;
  tabContent: ViewStyle;
  tabIntroText: TextStyle;
  ingredientsIntro: TextStyle;
  sectionTitle: TextStyle;
  stepCard: ViewStyle;
  stepNumberContainer: ViewStyle;
  stepNumber: TextStyle;
  stepDivider: ViewStyle;
  stepContentContainer: ViewStyle;
  stepHeader: ViewStyle;
  stepTitle: TextStyle;
  stepTime: TextStyle;
  stepDescription: TextStyle;
  stepMetaContainer: ViewStyle;
  stepMetaTitle: TextStyle;
  stepMetaText: TextStyle;
  ingredientCard: ViewStyle;
  ingredientInfo: ViewStyle;
  ingredientName: TextStyle;
  ingredientQuantity: TextStyle;
  ingredientNotes: TextStyle;
  optionalTag: TextStyle;
  equipmentCard: ViewStyle;
  equipmentIcon: ViewStyle;
  equipmentInfo: ViewStyle;
  equipmentName: TextStyle;
  equipmentNotes: TextStyle;
  alternativesContainer: ViewStyle;
  alternativesLabel: TextStyle;
  alternativesText: TextStyle;
  techniqueCard: ViewStyle;
  techniqueHeader: ViewStyle;
  techniqueName: TextStyle;
  techniqueDescription: TextStyle;
  videoButton: ViewStyle;
  videoButtonText: TextStyle;
  footer: ViewStyle;
  primaryButton: ViewStyle;
  primaryButtonText: TextStyle;
  loadingContainer: ViewStyle;
  loadingText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#222222',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT,
    overflow: 'hidden',
    zIndex: 1, // Ensure image is behind scroll content
  },
  recipeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  recipeInfoContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222222',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 12,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  difficultyBadge: {
    backgroundColor: '#FEF2D5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 12,
  },
  easyBadge: {
    backgroundColor: '#E0F7E0',
  },
  mediumBadge: {
    backgroundColor: '#FEF2D5',
  },
  hardBadge: {
    backgroundColor: '#FFE5E5',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#775A00',
  },
  recipeMetaDetails: {
    flexDirection: 'row',
  },
  recipeMetaText: {
    fontSize: 14,
    color: '#666666',
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555555',
    marginLeft: 8,
  },
  tabsContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabsScroll: {
    paddingHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888888',
  },
  activeTabText: {
    color: '#222222',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: '#FFCD4F',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tabContentContainer: {
    backgroundColor: '#F9F9F9',
    flex: 1,
    paddingBottom: 70, // Space for footer
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  tabIntroText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 16,
  },
  ingredientsIntro: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 22,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
    marginTop: 24,
    marginBottom: 12,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stepNumberContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF2D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
    marginHorizontal: 4,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#775A00',
  },
  stepDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 12,
  },
  stepContentContainer: {
    flex: 1,
    paddingRight: 8,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  stepTime: {
    fontSize: 12,
    color: '#888888',
  },
  stepDescription: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 8,
  },
  stepMetaContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  stepMetaTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 2,
  },
  stepMetaText: {
    fontSize: 12,
    color: '#888888',
  },
  ingredientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#555555',
  },
  ingredientNotes: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  optionalTag: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
    fontWeight: '500',
  },
  equipmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  equipmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2D5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 4,
  },
  equipmentNotes: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 6,
  },
  alternativesContainer: {
    marginTop: 4,
  },
  alternativesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 2,
  },
  alternativesText: {
    fontSize: 12,
    color: '#888888',
  },
  techniqueCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  techniqueName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  techniqueDescription: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 12,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  videoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFCD4F',
    marginLeft: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  primaryButton: {
    backgroundColor: '#FFCD4F',
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#503C00',
  },
}); 