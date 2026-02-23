import React from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading…', className = '' }, ref) => {
    const px = sizeMap[size];
    return (
      <svg
        ref={ref}
        className={[styles.spinner, styles[size], className].filter(Boolean).join(' ')}
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-label={label}
        role="status"
      >
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.5"
        />
        <path
          className={styles.head}
          d="M12 3a9 9 0 0 1 9 9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';
