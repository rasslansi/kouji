import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { 
  getLearningTopicById, 
  getLearningArticleById, 
  LearningTopic, 
  LearningArticle 
} from '../../mocks/learningContent';
import { 
  scale, 
  verticalScale, 
  typography, 
  spacing, 
  screenDimensions,
  rem,
  em,
  BASE_FONT_SIZE
} from '../../utils/responsive';
import HeaderBar from '../../components/HeaderBar';

// Placeholder image for development
const placeholderImage = 'https://via.placeholder.com/600x400';

// Simple Markdown-like renderer for the fullContent field
const renderMarkdownContent = (content: string) => {
  // Split content into lines
  const lines = content.split('\n');
  
  return lines.map((line, index) => {
    // Handle headings
    if (line.startsWith('# ')) {
      return (
        <Text key={index} style={styles.h1}>
          {line.substring(2)}
        </Text>
      );
    }
    
    if (line.startsWith('## ')) {
      return (
        <Text key={index} style={styles.h2}>
          {line.substring(3)}
        </Text>
      );
    }
    
    if (line.startsWith('- ')) {
      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listBullet}>•</Text>
          <Text style={styles.listText}>{line.substring(2)}</Text>
        </View>
      );
    }
    
    // Handle paragraphs (non-empty lines)
    if (line.trim() !== '') {
      // Check for bold text with ** markers
      if (line.includes('**')) {
        // This is a simplistic approach - a real implementation would be more robust
        const parts = line.split('**');
        return (
          <Text key={index} style={styles.paragraph}>
            {parts.map((part, partIndex) => {
              // Every odd index is bold text
              return partIndex % 2 === 1 ? (
                <Text key={partIndex} style={styles.boldText}>{part}</Text>
              ) : (
                part
              );
            })}
          </Text>
        );
      }
      
      return (
        <Text key={index} style={styles.paragraph}>
          {line}
        </Text>
      );
    }
    
    // Empty line, return a space
    return <View key={index} style={styles.spacer} />;
  });
};

export default function ArticleScreen() {
  const params = useLocalSearchParams();
  const { topicId, articleId } = params;
  
  const [topic, setTopic] = useState<LearningTopic | undefined>(undefined);
  const [article, setArticle] = useState<LearningArticle | undefined>(undefined);
  
  useEffect(() => {
    if (topicId && articleId) {
      const foundTopic = getLearningTopicById(topicId as string);
      const foundArticle = getLearningArticleById(articleId as string);
      
      setTopic(foundTopic);
      setArticle(foundArticle);
    }
  }, [topicId, articleId]);
  
  const handleSharePress = () => {
    // Share functionality would go here
    console.log('Sharing article:', article?.title);
  };
  
  if (!topic || !article) {
    return (
      <View style={styles.container}>
        <HeaderBar 
          title="Loading"
          showBackButton
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading article...</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <HeaderBar 
        title={topic.title}
        showBackButton
        showShare
        onSharePress={handleSharePress}
      />
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Article image */}
        <Image 
          source={{ uri: article.imageUrl || placeholderImage }} 
          style={styles.articleImage}
        />
        
        {/* Article header */}
        <View style={styles.articleHeader}>
          <Text style={styles.articleTitle}>{article.title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>
                {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
              </Text>
            </View>
            <Text style={styles.readTime}>{article.timeToRead}</Text>
          </View>
          
          <Text style={styles.articleDescription}>
            {article.shortDescription}
          </Text>
        </View>
        
        {/* Main content */}
        <View style={styles.contentWrapper}>
          {renderMarkdownContent(article.fullContent)}
        </View>
        
        {/* Tips section if available */}
        {article.tips && article.tips.length > 0 && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Pro Tips</Text>
            {article.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <MaterialIcons name="lightbulb" size={rem(1.25)} color="#D28F38" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Common mistakes section if available */}
        {article.commonMistakes && article.commonMistakes.length > 0 && (
          <View style={styles.mistakesContainer}>
            <Text style={styles.mistakesTitle}>Common Mistakes to Avoid</Text>
            {article.commonMistakes.map((mistake, index) => (
              <View key={index} style={styles.mistakeItem}>
                <MaterialIcons name="error-outline" size={rem(1.25)} color="#DD6B55" />
                <Text style={styles.mistakeText}>{mistake}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Related articles */}
        <View style={styles.relatedContainer}>
          <Text style={styles.relatedTitle}>Related Articles</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.relatedScroll}
          >
            {topic.articles
              .filter(relatedArticle => relatedArticle.id !== article.id)
              .map(relatedArticle => (
                <TouchableOpacity 
                  key={relatedArticle.id} 
                  style={styles.relatedCard}
                  onPress={() => {
                    // Reset and navigate to the new article
                    setArticle(undefined);
                    setTopic(undefined);
                    router.push({
                      pathname: '/learn/article',
                      params: { topicId: topic.id, articleId: relatedArticle.id }
                    });
                  }}
                >
                  <Image 
                    source={{ uri: relatedArticle.imageUrl || placeholderImage }} 
                    style={styles.relatedImage}
                  />
                  <View style={styles.relatedInfo}>
                    <Text style={styles.relatedArticleTitle} numberOfLines={2}>
                      {relatedArticle.title}
                    </Text>
                    <Text style={styles.relatedReadTime}>
                      {relatedArticle.timeToRead}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: rem(1.25),
    fontWeight: '500',
    color: '#222222',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: rem(2.5),
  },
  articleImage: {
    width: '100%',
    height: rem(15),
    resizeMode: 'cover',
  },
  articleHeader: {
    padding: rem(1.5),
    backgroundColor: '#FFFFFF',
  },
  articleTitle: {
    fontSize: rem(1.5),
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    marginBottom: rem(0.5),
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rem(1),
  },
  tagContainer: {
    backgroundColor: '#FFEDD6',
    paddingHorizontal: rem(0.5),
    paddingVertical: rem(0.2),
    borderRadius: 4,
    marginRight: rem(0.5),
  },
  tagText: {
    fontSize: rem(0.75),
    fontWeight: '600',
    color: '#D28F38',
  },
  readTime: {
    fontSize: rem(0.75),
    color: '#666666',
  },
  articleDescription: {
    fontSize: rem(1),
    lineHeight: em(1.5, BASE_FONT_SIZE),
    color: '#444444',
    fontWeight: '500',
  },
  contentWrapper: {
    paddingHorizontal: rem(1.5),
    paddingVertical: rem(1),
  },
  h1: {
    fontSize: rem(1.5),
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    marginVertical: rem(1),
  },
  h2: {
    fontSize: rem(1.25),
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Avenir' : 'sans-serif',
    color: '#222222',
    marginVertical: rem(0.75),
  },
  paragraph: {
    fontSize: rem(1),
    lineHeight: em(1.5, BASE_FONT_SIZE),
    color: '#333333',
    marginVertical: rem(0.5),
  },
  boldText: {
    fontWeight: '700',
    color: '#222222',
  },
  listItem: {
    flexDirection: 'row',
    paddingLeft: rem(0.5),
    marginVertical: rem(0.25),
  },
  listBullet: {
    fontSize: rem(1),
    color: '#D28F38',
    marginRight: rem(0.5),
    marginTop: Platform.OS === 'ios' ? 0 : -rem(0.3),
  },
  listText: {
    flex: 1,
    fontSize: rem(1),
    lineHeight: em(1.5, BASE_FONT_SIZE),
    color: '#333333',
  },
  spacer: {
    height: rem(0.625),
  },
  tipsContainer: {
    margin: rem(1.5),
    padding: rem(1),
    backgroundColor: '#FFFAED',
    borderRadius: rem(0.75),
    borderLeftWidth: 3,
    borderLeftColor: '#D28F38',
  },
  tipsTitle: {
    fontSize: rem(1.125),
    fontWeight: '700',
    color: '#D28F38',
    marginBottom: rem(1),
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: rem(0.5),
  },
  tipText: {
    flex: 1,
    fontSize: rem(1),
    color: '#555555',
    marginLeft: rem(0.5),
    lineHeight: em(1.4, BASE_FONT_SIZE),
  },
  mistakesContainer: {
    margin: rem(1.5),
    padding: rem(1),
    backgroundColor: '#FFF6F5',
    borderRadius: rem(0.75),
    borderLeftWidth: 3,
    borderLeftColor: '#DD6B55',
  },
  mistakesTitle: {
    fontSize: rem(1.125),
    fontWeight: '700',
    color: '#DD6B55',
    marginBottom: rem(1),
  },
  mistakeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: rem(0.5),
  },
  mistakeText: {
    flex: 1,
    fontSize: rem(1),
    color: '#555555',
    marginLeft: rem(0.5),
    lineHeight: em(1.4, BASE_FONT_SIZE),
  },
  relatedContainer: {
    paddingVertical: rem(1.5),
    paddingHorizontal: rem(1),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  relatedTitle: {
    fontSize: rem(1.125),
    fontWeight: '700',
    color: '#222222',
    marginBottom: rem(1),
    marginLeft: rem(0.5),
  },
  relatedScroll: {
    paddingLeft: rem(0.5),
    paddingRight: rem(1.5),
  },
  relatedCard: {
    width: rem(12.5),
    marginRight: rem(1),
    borderRadius: rem(0.625),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  relatedImage: {
    width: '100%',
    height: rem(7.5),
    resizeMode: 'cover',
  },
  relatedInfo: {
    padding: rem(0.5),
  },
  relatedArticleTitle: {
    fontSize: rem(1),
    fontWeight: '600',
    color: '#222222',
    marginBottom: rem(0.25),
  },
  relatedReadTime: {
    fontSize: rem(0.75),
    color: '#666666',
  },
}); 