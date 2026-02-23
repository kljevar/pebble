import React, { useState } from 'react';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt = '', name, size = 'md', status, className = '' }, ref) => {
    const [imgError, setImgError] = useState(false);

    const showImage = src && !imgError;
    const initials = name ? getInitials(name) : null;

    return (
      <div
        ref={ref}
        className={[styles.avatar, styles[size], className].filter(Boolean).join(' ')}
        aria-label={name ?? alt}
        title={name ?? alt}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || ''}
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span className={styles.initials} aria-hidden="true">
            {initials}
          </span>
        ) : (
          <svg
            className={styles.fallbackIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
          </svg>
        )}
        {status && (
          <span
            className={[styles.status, styles[`status-${status}`]].join(' ')}
            aria-label={status}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

/* ─── AvatarGroup ────────────────────────────────────────────────────────── */

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  max,
  size = 'md',
  className = '',
}) => {
  const childArray = React.Children.toArray(children);
  const visible = max ? childArray.slice(0, max) : childArray;
  const overflow = max && childArray.length > max ? childArray.length - max : 0;

  return (
    <div className={[styles.group, className].filter(Boolean).join(' ')}>
      {visible}
      {overflow > 0 && (
        <div className={[styles.avatar, styles[size], styles.overflow].join(' ')}>
          <span className={styles.initials}>+{overflow}</span>
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
