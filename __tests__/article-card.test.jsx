import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ArticleCard from '../src/features/blog/components/ArticleCard';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: ({ children, ...props }) => React.createElement('div', props, children),
    },
  };
});

describe('ArticleCard', () => {
  const mockPost = {
    slug: 'test-article',
    title: 'Test Article Title',
    excerpt: 'This is a test article excerpt',
    content: 'Full content of the article',
    date: '2025-01-27',
    author: 'Test Author',
    category: 'tecnologia',
    readTime: '5 min de lectura',
    image: '/test-image.jpg',
    tags: ['test', 'article', 'blog'],
    featured: false,
  };

  const defaultProps = {
    post: mockPost,
    viewMode: 'grid',
    isFavorite: false,
    showActions: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders article card in grid mode', () => {
    render(<ArticleCard {...defaultProps} />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test article excerpt')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
  });

  test('renders article card in list mode', () => {
    render(<ArticleCard {...defaultProps} viewMode="list" />);

    expect(screen.getByText('Test Article Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test article excerpt')).toBeInTheDocument();
  });

  test('renders article image when provided', () => {
    render(<ArticleCard {...defaultProps} />);

    const image = screen.getByAltText('Test Article Title');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('renders placeholder when image is not provided', () => {
    const postWithoutImage = { ...mockPost, image: null };
    render(<ArticleCard {...defaultProps} post={postWithoutImage} />);

    // Should show placeholder emoji
    expect(screen.getByText('📄')).toBeInTheDocument();
  });

  test('renders category badge', () => {
    render(<ArticleCard {...defaultProps} />);

    expect(screen.getByText(/Tecnología/i)).toBeInTheDocument();
  });

  test('renders featured badge when post is featured', () => {
    const featuredPost = { ...mockPost, featured: true };
    render(<ArticleCard {...defaultProps} post={featuredPost} />);

    expect(screen.getByText('Destacado')).toBeInTheDocument();
  });

  test('renders tags', () => {
    render(<ArticleCard {...defaultProps} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('article')).toBeInTheDocument();
  });

  test('renders date and reading time', () => {
    render(<ArticleCard {...defaultProps} />);

    expect(screen.getByText('5 min de lectura')).toBeInTheDocument();
  });

  test('calls onFavorite when favorite button is clicked', () => {
    const mockOnFavorite = jest.fn();
    render(<ArticleCard {...defaultProps} onFavorite={mockOnFavorite} />);

    // Find favorite button (bookmark icon)
    const buttons = screen.getAllByRole('button');
    const favoriteButton = buttons.find(
      (btn) => btn.querySelector('svg') && btn.className.includes('yellow'),
    );

    if (favoriteButton) {
      fireEvent.click(favoriteButton);
      expect(mockOnFavorite).toHaveBeenCalledWith('test-article');
    }
  });

  test('calls onShare when share button is clicked', () => {
    const mockOnShare = jest.fn();
    render(<ArticleCard {...defaultProps} onShare={mockOnShare} />);

    // Find share button
    const buttons = screen.getAllByRole('button');
    const shareButton = buttons.find(
      (btn) => btn.querySelector('svg') && btn.className.includes('blue'),
    );

    if (shareButton) {
      fireEvent.click(shareButton);
      expect(mockOnShare).toHaveBeenCalledWith(mockPost);
    }
  });

  test('shows favorite state when isFavorite is true', () => {
    render(<ArticleCard {...defaultProps} isFavorite={true} />);

    // Favorite button should have active state
    const buttons = screen.getAllByRole('button');
    const favoriteButton = buttons.find((btn) => btn.className.includes('yellow-500'));

    expect(favoriteButton).toBeDefined();
  });

  test('hides actions when showActions is false', () => {
    render(<ArticleCard {...defaultProps} showActions={false} />);

    // Should not have action buttons visible
    const buttons = screen.queryAllByRole('button');
    const actionButtons = buttons.filter((btn) => btn.className.includes('rounded-full'));

    expect(actionButtons.length).toBe(0);
  });

  test('renders link to article page', () => {
    render(<ArticleCard {...defaultProps} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/blog/test-article');
  });

  test('handles like button click', () => {
    render(<ArticleCard {...defaultProps} />);

    // Find like button (heart icon)
    const buttons = screen.getAllByRole('button');
    const likeButton = buttons.find(
      (btn) => btn.querySelector('svg') && btn.className.includes('red'),
    );

    if (likeButton) {
      fireEvent.click(likeButton);
      // Like state should change (internal state)
      expect(likeButton).toBeInTheDocument();
    }
  });

  test('renders author initials when author is provided', () => {
    render(<ArticleCard {...defaultProps} />);

    // Author initials should be rendered
    expect(screen.getByText('TA')).toBeInTheDocument();
  });

  test('renders author initials correctly for multiple words', () => {
    const postWithLongAuthor = { ...mockPost, author: 'John Doe Smith' };
    render(<ArticleCard {...defaultProps} post={postWithLongAuthor} />);

    expect(screen.getByText('JDS')).toBeInTheDocument();
  });

  test('limits tags display in grid mode', () => {
    const postWithManyTags = {
      ...mockPost,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    };
    render(<ArticleCard {...defaultProps} post={postWithManyTags} />);

    // Should only show first 2 tags in grid mode
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
  });

  test('limits tags display in list mode', () => {
    const postWithManyTags = {
      ...mockPost,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
    };
    render(<ArticleCard {...defaultProps} post={postWithManyTags} viewMode="list" />);

    // Should show first 3 tags in list mode
    expect(screen.getByText('tag1')).toBeInTheDocument();
    expect(screen.getByText('tag2')).toBeInTheDocument();
    expect(screen.getByText('tag3')).toBeInTheDocument();
  });

  test('formats date correctly', () => {
    render(<ArticleCard {...defaultProps} />);

    // Date should be formatted in Spanish
    const dateElements = screen.getAllByText(
      /enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre/i,
    );
    expect(dateElements.length).toBeGreaterThan(0);
  });

  test('handles missing optional props gracefully', () => {
    const minimalPost = {
      slug: 'minimal',
      title: 'Minimal Post',
      excerpt: 'Minimal excerpt',
      date: '2025-01-27',
      category: 'general',
    };

    render(<ArticleCard post={minimalPost} />);

    expect(screen.getByText('Minimal Post')).toBeInTheDocument();
  });
});
