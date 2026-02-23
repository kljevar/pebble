import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'bordered' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hoverable?: boolean;
  clickable?: boolean;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader: React.FC<CardSectionProps> = ({ children, className = '', ...props }) => (
  <div className={[styles.header, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardHeader.displayName = 'Card.Header';

const CardBody: React.FC<CardSectionProps> = ({ children, className = '', ...props }) => (
  <div className={[styles.body, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardBody.displayName = 'Card.Body';

const CardFooter: React.FC<CardSectionProps> = ({ children, className = '', ...props }) => (
  <div className={[styles.footer, className].filter(Boolean).join(' ')} {...props}>
    {children}
  </div>
);
CardFooter.displayName = 'Card.Footer';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hoverable = false,
      clickable = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    const classes = [
      styles.card,
      styles[variant],
      hoverable ? styles.hoverable : '',
      clickable ? styles.clickable : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
) as React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
};

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
