// React import not required for new JSX transform

type Props = {
  src: string;
  alt?: string;
  /** if provided, component will render a fixed square size in px */
  size?: number;
  /** object-fit strategy: 'cover' (default for decorative/background-like) or 'contain' (default for icons/photos) */
  fit?: 'cover' | 'contain';
  className?: string;
};

/**
 * ResponsiveImage
 * - Default behaviour: fluid image that fills its container (width:100%, height:auto) with object-fit set by `fit`.
 * - If `size` is provided, it renders a fixed square box (size x size px) useful for icons.
 */
export default function ResponsiveImage({ src, alt = '', size, fit = 'contain', className = '' }: Props) {
  if (size) {
    return (
      <div
        style={{ width: size, height: size, display: 'inline-block', overflow: 'hidden' }}
        className={className}
        aria-hidden={alt === ''}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: fit }}
          onLoad={() => {}}
        />
      </div>
    );
  }

  // fluid responsive image
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      style={{ width: '100%', height: 'auto', objectFit: fit }}
      onLoad={() => {}}
    />
  );
}
