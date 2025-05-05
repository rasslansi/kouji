import React, { useState, useRef, useEffect } from 'react';
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

const IMAGE_HEIGHT = 300;
const HEADER_HEIGHT = 100; // Approx height of Title + Tabs combined
const { width } = Dimensions.get('window');

// Ingredient Card Component
const IngredientCard = ({ ingredient }: { ingredient: Ingredient }) => (
  <View style={styles.ingredientCard}>
    <View style={styles.ingredientInfo}>
      <Text style={styles.ingredientName}>{ingredient.name}</Text>
      <Text style={styles.ingredientQuantity}>
        {ingredient.quantity} {ingredient.unit || ''}
        {ingredient.preparation ? ` (${ingredient.preparation})` : ''}
      </Text>
      {ingredient.notes && (
        <Text style={styles.ingredientNotes}>{ingredient.notes}</Text>
      )}
      {ingredient.isOptional && (
        <Text style={styles.optionalTag}>Optional</Text>
      )}
    </View>
  </View>
);

// Equipment Card Component
const EquipmentCard = ({ equipment }: { equipment: Equipment }) => (
  <View style={styles.equipmentCard}>
    <View style={styles.equipmentIcon}>
      <MaterialIcons name="restaurant" size={24} color="#FFCD4F" />
    </View>
    <View style={styles.equipmentInfo}>
      <Text style={styles.equipmentName}>{equipment.name}</Text>
      {equipment.notes && (
        <Text style={styles.equipmentNotes}>{equipment.notes}</Text>
      )}
      {equipment.alternatives && equipment.alternatives.length > 0 && (
        <View style={styles.alternativesContainer}>
          <Text style={styles.alternativesLabel}>Alternatives:</Text>
          <Text style={styles.alternativesText}>{equipment.alternatives.join(', ')}</Text>
        </View>
      )}
    </View>
  </View>
);

// Technique Card Component
const TechniqueCard = ({ technique }: { technique: Technique }) => (
  <View style={styles.techniqueCard}>
    <View style={styles.techniqueHeader}>
      <Text style={styles.techniqueName}>{technique.name}</Text>
      <View style={[
        styles.difficultyBadge, 
        technique.difficulty === 'easy' ? styles.easyBadge 
          : technique.difficulty === 'medium' ? styles.mediumBadge 
          : styles.hardBadge
      ]}>
        <Text style={styles.difficultyText}>{technique.difficulty.toUpperCase()}</Text>
      </View>
    </View>
    <Text style={styles.techniqueDescription}>{technique.description}</Text>
    {technique.videoUrl && (
      <TouchableOpacity style={styles.videoButton}>
        <MaterialIcons name="play-circle-filled" size={16} color="#FFCD4F" />
        <Text style={styles.videoButtonText}>Watch Tutorial</Text>
      </TouchableOpacity>
    )}
  </View>
);

// Tab components with real data
const IngredientsTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={styles.tabContent}>
    <Text style={styles.ingredientsIntro}>
      This recipe requires {recipe.ingredients.length} ingredients. Prepare them before starting to cook.
    </Text>
    {recipe.ingredients.map(ingredient => (
      <IngredientCard key={ingredient.id} ingredient={ingredient} />
    ))}
    <View style={{ height: 20 }} />
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
    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={styles.tabContent}>
      {Object.entries(sections).map(([sectionTitle, steps], sectionIndex) => (
        <View key={sectionTitle}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
          {steps.map((step, stepIndex) => (
            <View key={step.id} style={styles.stepCard}>
              <View style={styles.stepNumberContainer}>
                <Text style={styles.stepNumber}>{step.id}</Text>
              </View>
              <View style={styles.stepDivider} />
              <View style={styles.stepContentContainer}>
                <View style={styles.stepHeader}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
                
                {/* Show related equipment and techniques */}
                {step.equipmentNeeded && step.equipmentNeeded.length > 0 && (
                  <View style={styles.stepMetaContainer}>
                    <Text style={styles.stepMetaTitle}>Equipment:</Text>
                    <Text style={styles.stepMetaText}>{step.equipmentNeeded.join(', ')}</Text>
                  </View>
                )}
                
                {step.techniquesUsed && step.techniquesUsed.length > 0 && (
                  <View style={styles.stepMetaContainer}>
                    <Text style={styles.stepMetaTitle}>Techniques:</Text>
                    <Text style={styles.stepMetaText}>{step.techniquesUsed.join(', ')}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

const EquipmentTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={styles.tabContent}>
    <Text style={styles.tabIntroText}>
      Make sure you have all the necessary equipment before starting. Alternatives are provided where possible.
    </Text>
    {recipe.equipment.map(equipment => (
      <EquipmentCard key={equipment.id} equipment={equipment} />
    ))}
    <View style={{ height: 20 }} />
  </ScrollView>
);

const TechniquesTab = ({ recipe }: { recipe: Recipe }) => (
  <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false} style={styles.tabContent}>
    <Text style={styles.tabIntroText}>
      These cooking techniques will help you prepare this dish like a professional chef.
    </Text>
    {recipe.techniques.map(technique => (
      <TechniqueCard key={technique.id} technique={technique} />
    ))}
    <View style={{ height: 20 }} />
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
    
    switch(activeTab) {
      case 'Ingredients': return <IngredientsTab recipe={recipe} />;
      case 'Steps': return <StepsTab recipe={recipe} />;
      case 'Equipment': return <EquipmentTab recipe={recipe} />;
      case 'Techniques': return <TechniquesTab recipe={recipe} />;
      default: return <StepsTab recipe={recipe} />;
    }
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Animated Header/Image Area */}
       <Animated.View style={[
          styles.headerContainer, 
          {
            height: scrollY.interpolate({
              inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
              outputRange: [IMAGE_HEIGHT, HEADER_HEIGHT],
              extrapolate: 'clamp'
            })
          }
        ]}>
          <Animated.Image
             source={recipe.imageUrl ? { uri: recipe.imageUrl } : require('../../assets/images/recipe_image.png')}
             style={[
               styles.recipeImage,
               {
                 transform: [{
                   translateY: scrollY.interpolate({
                     inputRange: [0, IMAGE_HEIGHT - HEADER_HEIGHT],
                     outputRange: [0, -(IMAGE_HEIGHT - HEADER_HEIGHT) / 2], // Parallax effect
                     extrapolate: 'clamp'
                   })
                 },{
                   scale: scrollY.interpolate({
                      inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT - HEADER_HEIGHT],
                      outputRange: [2, 1, 1], // Zoom out effect when pulling down
                      extrapolate: 'clamp'
                   })
                 }]
               }
             ]}
          />
       </Animated.View>
      
      {/* Main ScrollView */}
      <Animated.ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false } // Set to false for height/translateY animations
        )}
        contentContainerStyle={{ paddingTop: IMAGE_HEIGHT }} // Start content below image
      >
        {/* Static Recipe Info (below image, above tabs) */}
        <View style={styles.recipeInfoContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.recipeDescription}>{recipe.description}</Text>
          <View style={styles.recipeMetaContainer}>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyText}>{recipe.difficulty.toUpperCase()}</Text>
            </View>
            <View style={styles.recipeMetaDetails}>
              <Text style={styles.recipeMetaText}>{recipe.totalTime}</Text>
              <Text style={styles.recipeMetaText}>{recipe.servings} servings</Text>
              {recipe.calories && <Text style={styles.recipeMetaText}>{recipe.calories} cal</Text>}
            </View>
          </View>
          
          {recipe.rating && (
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <MaterialIcons 
                  key={star}
                  name={star <= Math.floor(recipe.rating || 0) ? "star" : star <= (recipe.rating || 0) ? "star-half" : "star-border"} 
                  size={20} 
                  color="#FFCD4F" 
                />
              ))}
              <Text style={styles.ratingText}>{recipe.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        {/* Tabs Bar (will appear below static info) */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {['Ingredients','Steps','Equipment','Techniques'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tabButton}>
                <Text style={[styles.tabText, activeTab===tab && styles.activeTabText]}>{tab}</Text>
                {activeTab===tab && <View style={styles.activeTabIndicator}/>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Active Tab Content (inside ScrollView) */}
        <View style={styles.tabContentContainer}>
           {renderTab()}
        </View>
      </Animated.ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push({
            pathname: '/recipe/cook',
            params: { id: recipe.id }
          })}
        >
          <Text style={styles.primaryButtonText}>Let's Cook</Text>
        </TouchableOpacity>
      </View>
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