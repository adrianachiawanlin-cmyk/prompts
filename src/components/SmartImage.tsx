import { useState } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SmartImage({ src, alt, className = '' }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-light-surface-container text-light-on-surface-variant p-4 text-center ${className}`}
      >
        <span className="material-symbols-outlined text-headline-lg mb-1 opacity-70" aria-hidden="true">
          inventory_2
        </span>
        <span className="font-body text-body-sm line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
