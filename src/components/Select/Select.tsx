import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  placeholder?: string;
  size?: SelectSize;
}

interface ParsedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

function parseOptions(children: React.ReactNode): ParsedOption[] {
  return React.Children.toArray(children)
    .filter(
      (child): child is React.ReactElement =>
        React.isValidElement(child) && child.type === 'option' && !child.props.disabled
    )
    .map(child => ({
      value: String(child.props.value ?? ''),
      label: String(child.props.children ?? ''),
      disabled: Boolean(child.props.disabled),
    }))
    .filter(opt => opt.value !== '');
}

function parsePlaceholderFromChildren(children: React.ReactNode): string | undefined {
  const opt = React.Children.toArray(children).find(
    (child): child is React.ReactElement =>
      React.isValidElement(child) &&
      child.type === 'option' &&
      (child.props.value === '' || child.props.value == null) &&
      child.props.disabled
  );
  return opt ? String(opt.props.children) : undefined;
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      helperText,
      errorText,
      placeholder,
      size = 'md',
      className = '',
      id: idProp,
      disabled,
      value: controlledValue,
      defaultValue,
      onChange,
      children,
    },
    ref
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const listboxId = `${id}-listbox`;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasError = Boolean(errorText);
    const options = parseOptions(children);
    const resolvedPlaceholder =
      placeholder ?? parsePlaceholderFromChildren(children) ?? 'Select…';

    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(
      String(defaultValue ?? controlledValue ?? '')
    );

    const selectedValue =
      controlledValue !== undefined ? String(controlledValue) : internalValue;
    const selectedOption = options.find(o => o.value === selectedValue);

    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    const mergedRef = (node: HTMLButtonElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
    };

    useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (e: PointerEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('pointerdown', handlePointerDown);
      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [isOpen]);

    const handleSelect = useCallback(
      (value: string) => {
        if (controlledValue === undefined) setInternalValue(value);
        setIsOpen(false);
        triggerRef.current?.focus();
        onChange?.({ target: { value } } as React.ChangeEvent<HTMLSelectElement>);
      },
      [controlledValue, onChange]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          setIsOpen(prev => !prev);
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) { setIsOpen(true); break; }
          const idx = options.findIndex(o => o.value === selectedValue);
          const next = options.slice(idx + 1).find(o => !o.disabled);
          if (next) handleSelect(next.value);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) { setIsOpen(true); break; }
          const idx = options.findIndex(o => o.value === selectedValue);
          const prev = options.slice(0, idx).reverse().find(o => !o.disabled);
          if (prev) handleSelect(prev.value);
          break;
        }
        case 'Tab':
          setIsOpen(false);
          break;
      }
    };

    const describedBy =
      [hasError ? errorId : '', helperText ? helperId : ''].filter(Boolean).join(' ') ||
      undefined;

    return (
      <div ref={containerRef} className={[styles.wrapper, isOpen ? styles.wrapperOpen : '', className].filter(Boolean).join(' ')}>
        {label && (
          <label id={`${id}-label`} htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <div className={styles.triggerWrapper}>
          <button
            ref={mergedRef}
            type="button"
            id={id}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-describedby={describedBy}
            aria-invalid={hasError || undefined}
            disabled={disabled}
            className={[
              styles.trigger,
              styles[size],
              hasError ? styles.error : '',
              disabled ? styles.disabled : '',
              isOpen ? styles.open : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => !disabled && setIsOpen(prev => !prev)}
            onKeyDown={handleKeyDown}
          >
            <span className={selectedOption ? styles.triggerValue : styles.triggerPlaceholder}>
              {selectedOption?.label ?? resolvedPlaceholder}
            </span>
            <span
              className={[styles.chevron, isOpen ? styles.chevronOpen : '']
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={label ? `${id}-label` : undefined}
              className={styles.dropdown}
            >
            {options.map(option => {
              const isSelected = option.value === selectedValue;
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                  className={[
                    styles.option,
                    isSelected ? styles.optionSelected : '',
                    option.disabled ? styles.optionDisabled : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onPointerDown={e => {
                    e.preventDefault();
                    if (!option.disabled) handleSelect(option.value);
                  }}
                >
                  <span className={styles.optionLabel}>{option.label}</span>
                  {isSelected && (
                    <span className={styles.checkmark} aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                  )}
                </li>
              );
            })}
            </ul>
          )}
        </div>

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

Select.displayName = 'Select';
