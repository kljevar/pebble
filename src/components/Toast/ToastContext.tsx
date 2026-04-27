import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { AddToastOptions, ToastContextValue, ToastItem, ToastProviderProps } from './Toast.types';
import { ToastContainer } from './ToastContainer';

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;
const generateId = (): string => `pb-toast-${Date.now()}-${++idCounter}`;

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  // Keep a ref in sync so callbacks always see the latest list
  const toastsRef = useRef<ToastItem[]>([]);
  toastsRef.current = toasts;

  const addToast = useCallback((options: AddToastOptions): string => {
    const id = generateId();
    const newToast: ToastItem = { ...options, id };

    setToasts((prev) => {
      const next = [...prev, newToast];
      return next.length > maxToasts ? next.slice(next.length - maxToasts) : next;
    });

    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, addToast, removeToast, clearAll }),
    [toasts, addToast, removeToast, clearAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position={position} maxToasts={maxToasts} />
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

/** Internal — use useToast() publicly instead */
export const useToastContext = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return ctx;
};

export { ToastContext };
