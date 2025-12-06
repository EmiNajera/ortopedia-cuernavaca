import { renderHook, act } from '@testing-library/react';
import { useProfessionalBlog } from '../src/hooks/useProfessionalBlog';

// Mock useNotifications
jest.mock('../src/features/blog/components/ProfessionalNotifications', () => ({
  useNotifications: () => ({
    showLikeNotification: jest.fn(),
    showBookmarkNotification: jest.fn(),
    showShareNotification: jest.fn(),
  }),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigator.share and clipboard
Object.defineProperty(navigator, 'share', {
  writable: true,
  value: jest.fn(),
});

Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: jest.fn(),
  },
});

describe('useProfessionalBlog', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    expect(result.current.darkMode).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.favorites).toEqual([]);
    expect(result.current.bookmarks).toEqual([]);
    expect(result.current.readingHistory).toEqual([]);
  });

  test('loads preferences from localStorage', () => {
    localStorageMock.setItem('darkMode', 'true');
    localStorageMock.setItem('favorites', JSON.stringify(['post-1', 'post-2']));
    localStorageMock.setItem('bookmarks', JSON.stringify(['post-3']));
    localStorageMock.setItem('readingHistory', JSON.stringify([{ slug: 'post-1' }]));

    const { result } = renderHook(() => useProfessionalBlog());

    expect(result.current.darkMode).toBe(true);
    expect(result.current.favorites).toEqual(['post-1', 'post-2']);
    expect(result.current.bookmarks).toEqual(['post-3']);
    expect(result.current.readingHistory).toEqual([{ slug: 'post-1' }]);
  });

  test('toggles dark mode', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');

    act(() => {
      result.current.toggleDarkMode();
    });

    expect(result.current.darkMode).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('toggles favorite', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleFavorite('post-1');
    });

    expect(result.current.favorites).toContain('post-1');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(['post-1']));

    act(() => {
      result.current.toggleFavorite('post-1');
    });

    expect(result.current.favorites).not.toContain('post-1');
  });

  test('toggles bookmark', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleBookmark('post-1');
    });

    expect(result.current.bookmarks).toContain('post-1');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify(['post-1']));

    act(() => {
      result.current.toggleBookmark('post-1');
    });

    expect(result.current.bookmarks).not.toContain('post-1');
  });

  test('adds to reading history', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const post = { slug: 'post-1', title: 'Test Post' };

    act(() => {
      result.current.addToReadingHistory(post);
    });

    expect(result.current.readingHistory).toContainEqual(post);
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  test('limits reading history to 10 items', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    // Add 12 items
    for (let i = 1; i <= 12; i++) {
      act(() => {
        result.current.addToReadingHistory({ slug: `post-${i}`, title: `Post ${i}` });
      });
    }

    expect(result.current.readingHistory.length).toBe(10);
    expect(result.current.readingHistory[0].slug).toBe('post-12'); // Most recent first
  });

  test('removes duplicate from reading history', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const post = { slug: 'post-1', title: 'Test Post' };

    act(() => {
      result.current.addToReadingHistory(post);
      result.current.addToReadingHistory(post);
    });

    const history = result.current.readingHistory.filter((p) => p.slug === 'post-1');
    expect(history.length).toBe(1);
  });

  test('shares post using navigator.share when available', async () => {
    const mockShare = jest.fn().mockResolvedValue(undefined);
    navigator.share = mockShare;

    const { result } = renderHook(() => useProfessionalBlog());

    const post = {
      title: 'Test Post',
      excerpt: 'Test excerpt',
      slug: 'test-post',
    };

    // Mock window.location.href
    delete window.location;
    window.location = { href: 'https://example.com/blog/test-post' };

    await act(async () => {
      await result.current.sharePost(post);
    });

    expect(mockShare).toHaveBeenCalledWith({
      title: 'Test Post',
      text: 'Test excerpt',
      url: 'https://example.com/blog/test-post',
    });
  });

  test('falls back to clipboard when navigator.share is not available', async () => {
    navigator.share = undefined;

    const { result } = renderHook(() => useProfessionalBlog());

    const post = {
      title: 'Test Post',
      excerpt: 'Test excerpt',
      slug: 'test-post',
    };

    delete window.location;
    window.location = { href: 'https://example.com/blog/test-post' };

    await act(async () => {
      await result.current.sharePost(post);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://example.com/blog/test-post',
    );
  });

  test('formats date correctly', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const formatted = result.current.formatDate('2025-01-27');

    expect(formatted).toContain('enero');
    expect(formatted).toContain('2025');
    expect(formatted).toContain('27');
  });

  test('calculates reading time correctly', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const content = 'palabra '.repeat(200); // 200 words
    const readingTime = result.current.getReadingTime(content);

    expect(readingTime).toBe('1 min de lectura');
  });

  test('returns correct category color', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const color = result.current.getCategoryColor('tecnologia');

    expect(color).toHaveProperty('bg');
    expect(color).toHaveProperty('text');
    expect(color).toHaveProperty('badge');
  });

  test('returns default color for unknown category', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    const color = result.current.getCategoryColor('unknown');

    expect(color).toHaveProperty('bg');
    expect(color.bg).toContain('purple'); // Default is tecnologia
  });

  test('checks if post is favorite', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleFavorite('post-1');
    });

    expect(result.current.isFavorite('post-1')).toBe(true);
    expect(result.current.isFavorite('post-2')).toBe(false);
  });

  test('checks if post is bookmarked', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleBookmark('post-1');
    });

    expect(result.current.isBookmarked('post-1')).toBe(true);
    expect(result.current.isBookmarked('post-2')).toBe(false);
  });

  test('saves preferences to localStorage on changes', () => {
    const { result } = renderHook(() => useProfessionalBlog());

    act(() => {
      result.current.toggleDarkMode();
      result.current.toggleFavorite('post-1');
      result.current.toggleBookmark('post-2');
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith('darkMode', 'true');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify(['post-1']));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('bookmarks', JSON.stringify(['post-2']));
  });
});
