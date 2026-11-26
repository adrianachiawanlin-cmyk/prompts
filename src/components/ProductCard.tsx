import { useState } from 'react';
import { Product } from '../types/store';
import { SmartImage } from './SmartImage';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onSelectProduct }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="bg-light-surface text-light-on-surface p-4 rounded border border-light-outline-variant/60 flex flex-col justify-between gap-gutter-md h-full hover:border-light-outline transition-colors duration-state-change">
      <div className="flex flex-col gap-gutter-sm">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          className="bg-light-surface-container-low rounded-sm h-48 overflow-hidden p-3 flex items-center justify-center w-full cursor-pointer group"
          aria-label={`View details for ${product.title}`}
        >
          <SmartImage
            src={product.image}
            alt={product.title}
            className={`w-full h-full transition-transform duration-state-change group-hover:scale-[1.03] ${
              product.imageMode === 'cover' ? 'object-cover rounded-sm' : 'object-contain'
            }`}
          />
        </button>

        {(product.discountPercent || product.dealTag) && (
          <div className="flex items-center gap-gutter-sm min-h-[22px]">
            {product.discountPercent ? (
              <span
                role="status"
                className="inline-flex items-center rounded-sm bg-deal-red text-on-deal-red px-2 py-0.5 font-label text-label-sm"
              >
                <span>{product.discountPercent}% off</span>
              </span>
            ) : null}
            {product.dealTag ? (
              <span className="font-label text-label-sm text-deal-red">{product.dealTag}</span>
            ) : null}
          </div>
        )}

        <header className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-left cursor-pointer group"
          >
            <h3 className="font-title text-title-md text-light-on-surface line-clamp-2 group-hover:text-light-primary-container transition-colors duration-state-change">
              {product.title}
            </h3>
          </button>
          <div className="flex items-baseline gap-2 tabular-nums">
            <span className="font-headline text-headline-md text-light-on-surface">
              S${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="font-body text-body-sm text-light-on-surface-variant line-through">
                S${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </header>

        <div className="flex items-center gap-1 text-body-sm">
          <span
            className="material-symbols-outlined text-title-md text-star-amber"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            star
          </span>
          <span className="font-label text-label-md text-light-on-surface tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          <span className="font-body text-body-sm text-light-primary-container tabular-nums">
            ({product.reviewCount.toLocaleString('en-SG')})
          </span>
          {product.isPrime && (
            <span className="font-label text-label-sm text-light-primary-container ml-1">Prime</span>
          )}
        </div>

        <p className="font-body text-body-sm text-light-on-surface-variant">
          {product.deliveryEstimate}
        </p>
      </div>

      <footer className="pt-1">
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full rounded-full py-2 px-4 font-label text-label-md transition-colors duration-state-change cursor-pointer ${
            justAdded
              ? 'bg-light-primary text-light-on-primary'
              : 'bg-amazon-gold text-on-amazon-gold hover:bg-amazon-orange'
          }`}
        >
          <span>{justAdded ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>
      </footer>
    </article>
  );
}
