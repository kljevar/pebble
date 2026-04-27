import React, { useContext } from 'react';
import { createPortal } from 'react-dom';
import type { ToastContainerProps, ToastPosition } from './Toast.types';
import { ToastContext } from './ToastContext';
import { Toast } from './Toast';
import styles from './Toast.module.css';

const POSITION_CLASS: Record<ToastPosition, string> = {
  'top-left':      styles.topLeft,
  'top-center':    styles.topCenter,
  'top-right':     styles.topRight,
  'bottom-left':   styles.bottomLeft,
  'bottom-center': styles.bottomCenter,
  'bottom-right':  styles.bottomRight,
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  className = '',
}) => {
  const ctx = useContext(ToastContext);

  // ToastContainer can be rendered standalone (outside a provider) — no-op if no context
  if (!ctx) return null;

  const { toasts, removeToast } = ctx;
  const isBottom = position.startsWith('bottom');

  const containerClasses = [
    styles.container,
    POSITION_CLASS[position],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={containerClasses}
      aria-label="Notifications"
      aria-live="polite"
      aria-relevant="additions removals"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onDismiss={removeToast}
          isBottom={isBottom}
        />
      ))}
    </div>,
    document.body
  );
};

ToastContainer.displayName = 'ToastContainer';
