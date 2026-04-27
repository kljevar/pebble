import type React from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  /** Auto-dismiss duration in ms. 0 = no auto-dismiss. Default: 4000 */
  duration?: number;
  /** Show close button. Default: true */
  dismissible?: boolean;
  action?: ToastAction;
}

export type AddToastOptions = Omit<ToastItem, 'id'>;

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (options: AddToastOptions) => string;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export interface ToastContainerProps {
  position?: ToastPosition;
  maxToasts?: number;
  className?: string;
}

export interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
  /** Whether the container is at a bottom position — controls animation direction */
  isBottom?: boolean;
}
