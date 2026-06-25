'use client';

import SmartImage from '../SmartImage';

const RATIO_CLASS = {
  '16/10': 'image-frame--ratio-16-10',
  '16/9': 'image-frame--ratio-16-9',
  '16/11': 'image-frame--ratio-16-11',
};

/**
 * Bordered image container that never crops screenshots (object-fit: contain).
 */
export default function ImageFrame({
  src,
  alt,
  monogram,
  ratio = '16/11',
  priority = false,
  sizes,
  shadow = true,
  interactive = false,
  className = '',
  as: Component = 'div',
  ...props
}) {
  const frameClass = [
    'image-frame',
    RATIO_CLASS[ratio] || RATIO_CLASS['16/11'],
    shadow ? 'image-frame--shadow' : '',
    interactive ? 'image-frame--interactive' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={frameClass} {...props}>
      <div className="image-frame__inner">
        <SmartImage
          src={src}
          alt={alt}
          monogram={monogram}
          priority={priority}
          sizes={sizes}
        />
      </div>
    </Component>
  );
}
