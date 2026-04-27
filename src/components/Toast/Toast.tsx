import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ToastProps } from './Toast.types';
import styles from './Toast.module.css';

const DEFAULT_DURATION = 4000;
/** Must match the CSS exit animation duration */
const EXIT_MS = 200;
/** Gap between toasts — replaces flex gap so it collapses with the toast */
const WRAPPER_GAP = 8;

// ─── Icons ───────────────────────────────────────────────────────────────────

const SuccessIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const WarningIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8v.5M12 12v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// ─── Maps ─────────────────────────────────────────────────────────────────────

const ICONS = {
  success: SuccessIcon,
  error:   ErrorIcon,
  warning: WarningIcon,
  info:    InfoIcon,
} as const;

const ICON_CIRCLE_CLASS = {
  success: styles.iconCircleSuccess,
  error:   styles.iconCircleError,
  warning: styles.iconCircleWarning,
  info:    styles.iconCircleInfo,
} as const;

const PROGRESS_CLASS = {
  success: styles.progressSuccess,
  error:   styles.progressError,
  warning: styles.progressWarning,
  info:    styles.progressInfo,
} as const;

const VARIANT_LABEL = {
  success: 'Success',
  error:   'Error',
  warning: 'Warning',
  info:    'Info',
} as const;

// ─── Component ────────────────────────────────────────────────────────────────

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      variant,
      title,
      message,
      duration = DEFAULT_DURATION,
      dismissible = true,
      action,
      onDismiss,
      isBottom = false,
    },
    ref
  ) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const isExitingRef = useRef(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const startedAtRef = useRef<number>(Date.now());
    const remainingRef = useRef<number>(duration > 0 ? duration : 0);

    const handleDismiss = useCallback(() => {
      if (isExitingRef.current) return;
      isExitingRef.current = true;

      // Clear auto-dismiss timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      // Trigger CSS exit animation on the card
      setIsExiting(true);

      // Collapse the wrapper via direct DOM so remaining toasts slide up smoothly
      const wrapper = wrapperRef.current;
      if (wrapper) {
        // Freeze the current rendered height (includes WRAPPER_GAP padding)
        const h = wrapper.offsetHeight;
        wrapper.style.height = `${h}px`;
        // Enable clipping (shadow is already fading so brief clip is fine)
        wrapper.style.overflow = 'hidden';
        // Force a reflow so the browser registers the frozen height before transitioning
        void wrapper.offsetHeight;
        // Animate to zero
        wrapper.style.transition = `height ${EXIT_MS}ms ease, padding-bottom ${EXIT_MS}ms ease`;
        wrapper.style.height = '0px';
        wrapper.style.paddingBottom = '0px';
      }

      setTimeout(() => onDismiss(id), EXIT_MS + 20);
    }, [id, onDismiss]);

    const startTimer = useCallback(() => {
      if (duration === 0 || remainingRef.current <= 0) return;
      startedAtRef.current = Date.now();
      timerRef.current = setTimeout(handleDismiss, remainingRef.current);
    }, [duration, handleDismiss]);

    const pauseTimer = useCallback(() => {
      if (!timerRef.current) return;
      clearTimeout(timerRef.current);
      timerRef.current = null;
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedAtRef.current)
      );
    }, []);

    useEffect(() => {
      startTimer();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseEnter = () => {
      setIsPaused(true);
      pauseTimer();
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
      startTimer();
    };

    const Icon = ICONS[variant];

    const toastClasses = [
      styles.toast,
      styles[variant],
      isBottom ? styles.fromBottom : styles.fromTop,
      isExiting ? styles.exiting : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      /* Wrapper handles height collapse when this toast exits, pulling remaining
         toasts up smoothly. padding-bottom replaces the flex gap on the container. */
      <div
        ref={wrapperRef}
        style={{ paddingBottom: `${WRAPPER_GAP}px`, width: '100%' }}
      >
        <div
          ref={ref}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          aria-label={`${VARIANT_LABEL[variant]} notification`}
          className={toastClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Icon circle */}
          <span className={`${styles.iconCircle} ${ICON_CIRCLE_CLASS[variant]}`}>
            <Icon />
          </span>

          {/* Content */}
          <div className={styles.content}>
            {title && <p className={styles.title}>{title}</p>}
            <p className={styles.message}>{message}</p>

            {action && (
              <button
                type="button"
                className={styles.actionBtn}
                onClick={() => {
                  action.onClick();
                  handleDismiss();
                }}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Close button */}
          {dismissible && (
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleDismiss}
              aria-label="Dismiss notification"
            >
              <CloseIcon />
            </button>
          )}

          {/* Progress bar */}
          {duration > 0 && (
            <div
              className={[
                styles.progress,
                PROGRESS_CLASS[variant],
                isPaused ? styles.progressPaused : '',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ animationDuration: `${duration}ms` }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';
