import type { ToastContextValue } from './Toast.types';
import { useToastContext } from './ToastContext';

/**
 * Hook to trigger and manage toasts.
 *
 * Must be used inside a <ToastProvider>.
 *
 * @example
 * const { addToast, removeToast, clearAll } = useToast();
 * addToast({ variant: 'success', title: 'Saved!', message: 'Your changes were saved.' });
 */
export const useToast = (): ToastContextValue => {
  return useToastContext();
};
