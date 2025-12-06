import { useLayoutEffect, useRef, useCallback } from 'react';

/**
 * ScrollStackItem - Individual item in the scroll stack
 */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 my-4 p-8 sm:p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform bg-white border border-gray-100 ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d',
    }}
  >
    {children}
  </div>
);

/**
 * ScrollStack - Simplified and robust scroll stacking component
 */
const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
}) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const basePositionsRef = useRef([]);
  const rafRef = useRef(null);
  const isInitializedRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const updateTransforms = useCallback(() => {
    if (!cardsRef.current.length || !containerRef.current || !isInitializedRef.current) return;

    const scrollTop = useWindowScroll
      ? window.scrollY || window.pageYOffset
      : containerRef.current.scrollTop;

    const viewportHeight = useWindowScroll ? window.innerHeight : containerRef.current.clientHeight;

    const stackStart = parsePercentage(stackPosition, viewportHeight);
    const stackEnd = parsePercentage(scaleEndPosition, viewportHeight);

    // Get first card's base position for reference
    const firstCardBase = basePositionsRef.current[0];
    if (!firstCardBase) return;

    const firstCardBaseTop = firstCardBase.top;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const basePos = basePositionsRef.current[i];
      if (!basePos) return;

      // Get each card's current viewport position
      const cardRect = card.getBoundingClientRect();
      const cardViewportTop = cardRect.top;

      // Each card has its own progress based on its individual position
      // Cards stack sequentially: each card starts stacking when it reaches stackStart
      let cardProgress = 0;

      if (cardViewportTop > stackStart) {
        // Card hasn't reached stack position yet - no stacking
        cardProgress = 0;
      } else if (cardViewportTop <= stackEnd) {
        // Card has reached or passed end position - fully stacked
        cardProgress = 1;
      } else {
        // Card is between start and end - interpolate gradually
        const range = stackStart - stackEnd;
        if (range > 0) {
          cardProgress = (stackStart - cardViewportTop) / range;
        }
      }

      cardProgress = Math.max(0, Math.min(1, cardProgress));

      // Calculate where this card should stack (relative to first card's position)
      // When stacked, cards should be at firstCardBaseTop position with offset
      const stackTargetY = firstCardBaseTop + itemStackDistance * i;

      // Interpolate from original position to stack position based on THIS card's progress
      const originalY = basePos.top;
      const currentY = originalY + (stackTargetY - originalY) * cardProgress;

      // Calculate translateY (how much to move from original position)
      const translateY = currentY - originalY;

      // Calculate scale - gradual scaling based on this card's progress
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - cardProgress * (1 - targetScale);

      // Calculate rotation
      const rotation = rotationAmount ? i * rotationAmount * cardProgress : 0;

      // Calculate blur - only apply to cards that are already stacked (behind others)
      // A card gets blur if cards above it are stacking
      let blur = 0;
      if (blurAmount && i > 0) {
        // Check if any card above this one is stacking
        let cardsAboveStacking = 0;
        for (let j = 0; j < i; j++) {
          const aboveCard = cardsRef.current[j];
          if (aboveCard) {
            const aboveRect = aboveCard.getBoundingClientRect();
            const aboveTop = aboveRect.top;
            if (aboveTop <= stackStart) {
              cardsAboveStacking++;
            }
          }
        }
        if (cardsAboveStacking > 0) {
          blur = cardsAboveStacking * blurAmount * 0.3;
        }
      }

      // Apply transforms
      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      const filter = blur > 0 ? `blur(${blur}px)` : '';

      card.style.transform = transform;
      card.style.filter = filter;
      card.style.opacity = '1'; // Ensure cards are not transparent
    });
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    parsePercentage,
  ]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateTransforms);
  }, [updateTransforms]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card'));
    if (cards.length === 0) return;

    cardsRef.current = cards;

    // Setup card styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    // Cache base positions after layout
    const cachePositions = () => {
      basePositionsRef.current = cards.map((card) => {
        if (!card) return null;
        const rect = card.getBoundingClientRect();
        return {
          top: useWindowScroll ? rect.top + (window.scrollY || window.pageYOffset) : card.offsetTop,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        };
      });

      isInitializedRef.current = true;
      updateTransforms();
    };

    // Wait for layout to complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        cachePositions();
      });
    });

    // Setup scroll listener
    const scrollTarget = useWindowScroll ? window : container;
    scrollTarget.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      cardsRef.current = [];
      basePositionsRef.current = [];
      isInitializedRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    handleScroll,
    updateTransforms,
  ]);

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-hidden ${className}`.trim();

  return (
    <div className={containerClassName} ref={containerRef} data-scroll-stack>
      <div className="scroll-stack-inner pt-[5vh] px-4 sm:px-8 md:px-12 lg:px-20 pb-[20vh] min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
