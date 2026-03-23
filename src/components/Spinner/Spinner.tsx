import React, { useId } from 'react';
import styles from './Spinner.module.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type SpinnerColor = 'indigo' | 'white';

export interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
  color?: SpinnerColor;
}

const sizeMap: Record<SpinnerSize, number> = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading…', className = '', color = 'indigo' }, ref) => {
    const px = sizeMap[size];
    const gradId = useId().replace(/:/g, '');

    const isWhite = color === 'white';
    const stopFrom  = isWhite ? 'rgba(255,255,255,0)'   : '#6366f1';
    const stopMid   = isWhite ? 'rgba(255,255,255,0.9)' : '#6366f1';
    const stopTo    = isWhite ? 'rgba(255,255,255,0.9)' : '#a855f7';
    const trackColor = isWhite ? 'rgba(255,255,255,0.25)' : undefined;

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
          {/* Gradient goes from trailing edge (transparent) to leading edge */}
          <linearGradient id={gradId} x1="12" y1="3" x2="21" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={stopFrom} stopOpacity="1" />
            <stop offset="40%"  stopColor={stopMid}  stopOpacity="1" />
            <stop offset="100%" stopColor={stopTo}   stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Track — full circle, pulses */}
        <circle
          className={styles.track}
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.5"
          style={trackColor ? { stroke: trackColor } : undefined}
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
