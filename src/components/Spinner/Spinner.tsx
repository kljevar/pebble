import React, { useId } from 'react';
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
    const gradId = useId().replace(/:/g, '');

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
        <defs>
          {/* Gradient goes from trailing edge (transparent) to leading edge (violet) */}
          <linearGradient id={gradId} x1="12" y1="3" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#6366f1" stopOpacity="0" />
            <stop offset="40%"  stopColor="#6366f1" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Track — full circle, pulses */}
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.5"
        />

        {/* Arc — ~25% circumference, comet gradient */}
        <path
          className={styles.arc}
          d="M12 3a9 9 0 0 1 9 9"
          strokeWidth="2.5"
          strokeLinecap="round"
          stroke={`url(#${gradId})`}
        />
      </svg>
    );
  }
);

Spinner.displayName = 'Spinner';
