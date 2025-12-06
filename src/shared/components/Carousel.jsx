import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'motion/react';

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

const DEFAULT_ITEMS = [];

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const carouselItems = loop ? [...items, items[0]] : items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round
          ? 'rounded-full border border-white bg-white shadow-lg'
          : 'rounded-[24px] border border-gray-200 bg-white shadow-lg'
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });

          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col overflow-hidden cursor-grab active:cursor-grabbing ${
                round
                  ? 'items-center justify-center text-center bg-white border-0'
                  : 'items-start justify-between bg-white border border-gray-200 rounded-[16px]'
              }`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : '100%',
                rotateY,
                ...(round && { borderRadius: '50%' }),
              }}
              transition={effectiveTransition}
            >
              {/* Imagen superior si existe */}
              {item.image && (
                <div className="relative w-full h-40 overflow-hidden">
                  <Image src={item.image} alt={item.title || ''} fill className="object-cover" />
                </div>
              )}

              {/* Contenido */}
              <div
                className={
                  round
                    ? 'p-4 flex-1 flex flex-col items-center justify-center'
                    : 'p-5 flex-1 flex flex-col'
                }
              >
                {!item.image && item.icon && (
                  <div className="mb-3">
                    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-blue-600 text-white">
                      {item.icon}
                    </span>
                  </div>
                )}
                {item.title && (
                  <div className="mb-1 font-semibold text-base text-gray-900">{item.title}</div>
                )}
                {item.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div
        className={`flex w-full justify-center ${
          round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index ? 'bg-blue-600' : 'bg-blue-200'
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
