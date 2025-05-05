import React, { useState, useRef } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Animated, 
  View, 
  Text, 
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getAllLearningTopics, getTopicsByCategory, LearningTopic, ContentCategory } from '../../mocks/learningContent';
import { 
  scale, 
  verticalScale, 
  moderateScale, 
  typography, 
  spacing, 
  screenDimensions,
  rem,
  em
} from '../../utils/responsive';
import HeaderBar from '../../components/HeaderBar';

// Placeholder image for development
const placeholderImage = 'https://via.placeholder.com/600x400';

export default function LearnScreen() {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | 'all'>('all');
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const categories: { id: ContentCategory | 'all', label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'technique', label: 'Techniques' },
    { id: 'science', label: 'Science' },
    { id: 'tip', label: 'Tips' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'ingredient', label: 'Ingredients' }
  ];

  // Get all topics or filter by category
  const topics = selectedCategory === 'all' 
    ? getAllLearningTopics() 
    : getTopicsByCategory(selectedCategory);

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
    
    // After expanding, scroll to show the expanded content
    if (expandedTopic !== topicId) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      }, 100);
    }
  };

  // Navigate to article detail
  const openArticle = (topicId: string, articleId: string) => {
    router.push({
      pathname: '/learn/article',
      params: { topicId, articleId }
    });
  };

  return (
    <View style={styles.container}>
      <HeaderBar 
        title="Learn"
        showLogo
        showSearch
        showProfile
      />
      
      {/* Category filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Topics list */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.topicsContainer}
        contentContainerStyle={styles.topicsContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>
          Expand your cooking knowledge
        </Text>
        
        {topics.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="restaurant" size={rem(3)} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>
              No learning topics available in this category yet
            </Text>
          </View>
        ) : (
          topics.map(topic => (
            <View key={topic.id} style={styles.topicCard}>
              {/* Topic header */}
              <TouchableOpacity 
                style={styles.topicHeader}
                onPress={() => toggleTopic(topic.id)}
                activeOpacity={0.7}
              >
                <Image 
                  source={{ uri: topic.imageUrl || placeholderImage }}
                  style={styles.topicImage}
                />
                
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.7)']}
                  style={styles.topicGradient}
                />
                
                <View style={styles.topicInfo}>
                  <View style={styles.topicTags}>
                    <View style={styles.skillLevelTag}>
                      <Text style={styles.skillLevelText}>
                        {topic.skillLevel.charAt(0).toUpperCase() + topic.skillLevel.slice(1)}
                      </Text>
                    </View>
                    <View style={styles.categoryTag}>
                      <Text style={styles.categoryTagText}>
                        {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
                      </Text>
                    </View>
                  </View>
                  
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicDescription} numberOfLines={2}>{topic.description}</Text>
                  
                  <View style={styles.expandButton}>
                    <MaterialIcons 
                      name={expandedTopic === topic.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                      size={rem(1.5)} 
                      color="#FFFFFF" 
                    />
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Expanded articles list */}
              {expandedTopic === topic.id && (
                <View style={styles.articlesContainer}>
                  <Text style={styles.articlesTitle}>Articles</Text>
                  
                  {topic.articles.map((article, index) => (
                    <TouchableOpacity 
                      key={article.id}
                      style={[
                        styles.articleItem,
                        index < topic.articles.length - 1 && styles.articleItemBorder
                      ]}
                      onPress={() => openArticle(topic.id, article.id)}
                    >
                      <View style={styles.articleContent}>
                        <Text style={styles.articleTitle}>{article.title}</Text>
                        <Text style={styles.articleDescription} numberOfLines={2}>
                          {article.shortDescription}
                        </Text>
                        <View style={styles.articleMeta}>
                          <Text style={styles.readTime}>{article.timeToRead}</Text>
                          
                          {article.tags && article.tags.length > 0 && (
                            <View style={styles.tagContainer}>
                              <Text style={styles.tagText}>
                                {article.tags[0]}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <MaterialIcons name="chevron-right" size={rem(1.5)} color="#CCCCCC" />
                    </TouchableOpacity>
                  ))}
                  
                  <TouchableOpacity style={styles.viewAllButton}>
                    <Text style={styles.viewAllText}>View all in {topic.title}</Text>
                    <MaterialIcons name="arrow-forward" size={rem(1)} color="#D28F38" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  categoriesContainer: {
    paddingHorizontal: rem(1),
    paddingVertical: rem(0.75),
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: rem(1),
    paddingVertical: rem(0.3),
    borderRadius: 999,
    backgroundColor: '#F5F5F5',
    marginRight: rem(0.5),
  },
  selectedCategory: {
    backgroundColor: '#FFEDD6',
  },
  categoryText: {
    fontSize: rem(0.75),
    fontWeight: '600',
    color: '#666666',
  },
  selectedCategoryText: {
    color: '#D28F38',
  },
  topicsContainer: {
    flex: 1,
  },
  topicsContent: {
    paddingHorizontal: rem(1),
    paddingBottom: rem(7.5),
  },
  sectionTitle: {
    fontSize: rem(1.25),
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    marginVertical: rem(1),
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: rem(2),
  },
  emptyStateText: {
    fontSize: rem(1),
    color: '#999999',
    textAlign: 'center',
    marginTop: rem(1),
  },
  topicCard: {
    marginBottom: rem(1.5),
    borderRadius: rem(1),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  topicHeader: {
    width: '100%',
    aspectRatio: 16/9,
  },
  topicImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topicGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    zIndex: 1,
  },
  topicInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: rem(1),
    zIndex: 2,
  },
  topicTags: {
    flexDirection: 'row',
    marginBottom: rem(0.25),
  },
  skillLevelTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: rem(0.5),
    paddingVertical: rem(0.125),
    borderRadius: 4,
    marginRight: rem(0.25),
  },
  skillLevelText: {
    fontSize: rem(0.75),
    fontWeight: '600',
    color: '#333333',
  },
  categoryTag: {
    backgroundColor: 'rgba(210, 143, 56, 0.9)',
    paddingHorizontal: rem(0.5),
    paddingVertical: rem(0.125),
    borderRadius: 4,
  },
  categoryTagText: {
    fontSize: rem(0.75),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  topicTitle: {
    fontSize: rem(1.25),
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#FFFFFF',
    marginBottom: rem(0.25),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  topicDescription: {
    fontSize: rem(0.75),
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  expandButton: {
    position: 'absolute',
    right: rem(1),
    bottom: rem(1),
  },
  articlesContainer: {
    padding: rem(1),
  },
  articlesTitle: {
    fontSize: rem(1.125),
    fontWeight: '700',
    color: '#333333',
    marginBottom: rem(1),
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: rem(0.75),
  },
  articleItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  articleContent: {
    flex: 1,
    marginRight: rem(0.5),
  },
  articleTitle: {
    fontSize: rem(1),
    fontWeight: '700',
    color: '#333333',
    marginBottom: rem(0.125),
  },
  articleDescription: {
    fontSize: rem(0.75),
    color: '#666666',
    marginBottom: rem(0.25),
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readTime: {
    fontSize: rem(0.75),
    color: '#999999',
    marginRight: rem(0.5),
  },
  tagContainer: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: rem(0.5),
    paddingVertical: rem(0.125),
    borderRadius: 4,
  },
  tagText: {
    fontSize: rem(0.75),
    color: '#666666',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rem(1),
    marginTop: rem(0.5),
  },
  viewAllText: {
    fontSize: rem(0.75),
    fontWeight: '600',
    color: '#D28F38',
    marginRight: rem(0.25),
  },
});
