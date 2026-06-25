import Link from 'next/link';

const VARIANT_CLASS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
};

const SIZE_CLASS = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

/**
 * Design system button primitive.
 * Wraps native <button> or Next.js <Link> when href is provided.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  className = '',
  icon,
  showArrow = false,
  type = 'button',
  ...props
}) {
  const classes = [
    'btn',
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    SIZE_CLASS[size] || '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon}
      {children}
      {showArrow && (
        <svg
          className="arrow btn__arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      )}
    </>
  );

  if (href) {
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
