import React, { useId } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  children: React.ReactElement;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
  className = '',
}) => {
  const tooltipId = useId();

  const child = React.cloneElement(children, {
    'aria-describedby': tooltipId,
  });

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      {child}
      <div
        id={tooltipId}
        role="tooltip"
        className={[styles.tooltip, styles[placement]].join(' ')}
      >
        {content}
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </div>
  );
};

Tooltip.displayName = 'Tooltip';
