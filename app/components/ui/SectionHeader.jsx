/**
 * Consistent section header primitive for page and section intros.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  titleAs: TitleTag = 'h2',
  className = '',
}) {
  const alignClass = align === 'center' ? 'section-head--center' : '';

  return (
    <header className={`section-head ${alignClass} ${className}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <TitleTag className={TitleTag === 'h1' ? 'display' : 'h-section'}>{title}</TitleTag>}
      {description && <p className="section-head__description">{description}</p>}
    </header>
  );
}
