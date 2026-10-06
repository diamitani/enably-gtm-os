import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

const SIZES = {
  sm: { icon: 26, text: 'text-[15px]' },
  md: { icon: 32, text: 'text-lg' },
  lg: { icon: 44, text: 'text-2xl' },
  xl: { icon: 64, text: 'text-4xl' },
};

/**
 * 6th Agent mark: a hexagon (the team / workspace) holding a "6" drawn as a single
 * continuous stroke that terminates in a node (the sixth member: your agent).
 * Geometry is on a 64 grid so it stays crisp at 16px favicon size.
 */
export const LogoMark: React.FC<{ size?: number; mono?: boolean; className?: string }> = ({
  size = 32,
  mono = false,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="6th Agent"
    className={`shrink-0 ${className}`}
  >
    <path
      d="M32 3.5 56.7 17.75v28.5L32 60.5 7.3 46.25v-28.5L32 3.5Z"
      fill={mono ? 'currentColor' : '#0B0B0C'}
    />
    <path
      d="M40.5 18.5c-9.5-1.2-17 4.6-17 15.5 0 6.6 3.9 11 9.6 11 5.4 0 9.4-3.9 9.4-9.2 0-5.1-3.7-8.6-8.7-8.6-4.4 0-7.9 2.6-9.2 6.6"
      stroke="#FFFFFF"
      strokeWidth="4.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="40.5" cy="18.5" r="4.2" fill={mono ? '#FFFFFF' : '#2F54EB'} />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const s = SIZES[size];

  if (variant === 'icon') return <LogoMark size={s.icon} className={className} />;

  const wordmark = (
    <span className={`font-semibold tracking-[-0.02em] text-ink ${s.text}`}>
      6th<span className="text-ink-muted font-medium"> Agent</span>
    </span>
  );

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
        <LogoMark size={s.icon} />
        {wordmark}
        {showTagline && <span className="text-xs text-ink-muted">Agent teams, managed.</span>}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LogoMark size={s.icon} mono={variant === 'mono'} />
      <div className="flex flex-col leading-tight">
        {wordmark}
        {showTagline && <span className="text-[11px] text-ink-muted">Agent teams, managed.</span>}
      </div>
    </div>
  );
};
