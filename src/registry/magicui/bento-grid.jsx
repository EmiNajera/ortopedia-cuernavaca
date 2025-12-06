import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const BentoCard = ({
  className,
  name,
  description,
  href,
  cta,
  icon: Icon,
  background,
  rowSpan,
  colSpan,
  children,
}) => {
  return (
    <motion.div
      style={{
        gridRow: `span ${rowSpan || 1}`,
        gridColumn: `span ${colSpan || 1}`,
      }}
      className={cn(
        'group relative col-span-1 flex overflow-hidden rounded-xl border border-transparent bg-white [background:linear-gradient(to_bottom_right,var(--white),var(--white))] [border:1px_solid_rgba(255,255,255,.1)] shadow-xl transition-all duration-300 dark:bg-neutral-900',
        'hover:shadow-2xl',
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <>
          <div className="relative z-10 flex min-h-[300px] flex-col justify-between gap-4 p-8">
            {Icon && <Icon className="h-8 w-8 text-neutral-600 dark:text-neutral-300" />}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-700 dark:text-neutral-200">{name}</h3>
              <p className="max-w-xs text-sm font-normal text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
            {href && (
              <a
                href={href}
                className="group/link flex items-center gap-2 text-xs font-bold text-neutral-600 transition-transform duration-300 hover:translate-x-1 dark:text-neutral-400"
              >
                {cta}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 3.5L3.5 8.5M3.5 3.5H8.5V8.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          {background}
        </>
      )}
    </motion.div>
  );
};

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn('grid w-full grid-cols-1 gap-4 md:grid-cols-3', className)}>{children}</div>
  );
};
