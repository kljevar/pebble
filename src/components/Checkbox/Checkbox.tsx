import React, { useId, useEffect, useRef } from 'react';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  label?: React.ReactNode;
  indeterminate?: boolean;
  size?: CheckboxSize;
  helperText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      size = 'md',
      helperText,
      className = '',
      id: idProp,
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const ref = (forwardedRef as React.RefObject<HTMLInputElement>) ?? internalRef;

    // Apply indeterminate state (not a standard HTML attribute)
    useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <div
        className={[styles.wrapper, styles[size], disabled ? styles.disabled : '', className]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.checkboxRow}>
          <div className={styles.checkboxOuter}>
            <input
              ref={ref}
              id={id}
              type="checkbox"
              className={styles.input}
              disabled={disabled}
              {...props}
            />
            <div className={styles.checkboxBox} aria-hidden="true">
              {/* Checkmark */}
              <svg
                className={styles.checkmark}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Indeterminate dash */}
              <svg
                className={styles.dash}
                viewBox="0 0 12 12"
                fill="none"
              >
                <path
                  d="M2.5 6h7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          {label && (
            <label htmlFor={id} className={styles.label}>
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p className={styles.helperText}>{helperText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
