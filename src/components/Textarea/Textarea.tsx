import React, { useId } from 'react';
import styles from './Textarea.module.css';

export type TextareaResize = 'none' | 'vertical' | 'both';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  errorText?: string;
  resize?: TextareaResize;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorText,
      resize = 'vertical',
      className = '',
      id: idProp,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(errorText);
    const describedBy = [hasError ? errorId : '', helperText ? helperId : '']
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={[
            styles.textarea,
            hasError ? styles.error : '',
            disabled ? styles.disabled : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{ resize }}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {hasError ? (
          <p id={errorId} className={styles.errorText} role="alert">
            {errorText}
          </p>
        ) : helperText ? (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
