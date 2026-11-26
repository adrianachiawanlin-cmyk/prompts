import { useState } from 'react';
import { Product, SingaporeLocation } from '../types/store';
import { SmartImage } from './SmartImage';

interface ProductModalProps {
  product: Product | null;
  location: SingaporeLocation;
  isSaved: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariant?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedVariant?: string) => void;
  onToggleSave: (productId: string) => void;
}

export function ProductModal({
  product,
  location,
  isSaved,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleSave,
}: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product?.variants?.[0] ?? ''
  );
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  if (!product) return null;

  const activeVariant =
    selectedVariant && product.variants?.includes(selectedVariant)
      ? selectedVariant
      : product.variants?.[0];

  const handleAdd = () => {
    onAddToCart(product, quantity, activeVariant);
    setAddedFeedback(true);
    window.setTimeout(() => setAddedFeedback(false), 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
      onClick={onClose}
    >
      <div
        className="bg-light-surface text-light-on-surface rounded-md border border-light-outline-variant max-w-4xl w-full overflow-hidden shadow-xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 bg-amazon-slate text-on-amazon-slate">
          <span className="font-label text-label-md truncate">
            {product.brand} · {product.categoryLabel}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="inline-flex items-center justify-center w-8 h-8 rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 max-h-[82vh] overflow-y-auto">
          {/* Left Gallery */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="bg-light-surface-container-low rounded border border-light-outline-variant/60 h-72 sm:h-80 p-4 flex items-center justify-center">
              <SmartImage
                src={product.image}
                alt={product.title}
                className={`w-full h-full ${
                  product.imageMode === 'cover' ? 'object-cover rounded-sm' : 'object-contain'
                }`}
              />
            </div>

            <div className="bg-light-surface-container-low rounded border border-light-outline-variant/60 p-3 flex flex-col gap-2">
              <span className="font-label text-label-md text-light-on-surface">
                Key Specifications
              </span>
              <dl className="grid grid-cols-1 gap-1.5 text-body-sm">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-2 border-b border-light-outline-variant/40 pb-1 last:border-none last:pb-0">
                    <dt className="text-light-on-surface-variant">{spec.label}</dt>
                    <dd className="font-label text-light-on-surface text-right">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Right Purchase Module */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div>
              <p className="font-label text-label-md text-light-primary-container mb-1">
                Visit the {product.brand} Store
              </p>
              <h2 id="pdp-title" className="font-headline text-headline-lg text-light-on-surface text-balance">
                {product.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 text-body-md border-b border-light-outline-variant/60 pb-3">
              <div className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-headline-sm text-star-amber"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  star
                </span>
                <span className="font-label text-label-lg tabular-nums">{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-light-primary-container tabular-nums">
                {product.reviewCount.toLocaleString('en-SG')} ratings
              </span>
              {product.isPrime && (
                <>
                  <span aria-hidden="true" className="text-light-outline">·</span>
                  <span className="font-label text-label-md text-light-primary-container">Prime</span>
                </>
              )}
            </div>

            {/* Pricing */}
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2.5 tabular-nums">
                {product.discountPercent && (
                  <span className="font-headline text-headline-md text-deal-red">
                    -{product.discountPercent}%
                  </span>
                )}
                <span className="font-display text-display-lg-mobile text-light-on-surface">
                  S${product.price.toFixed(2)}
                </span>
              </div>
              {product.originalPrice && (
                <p className="font-body text-body-sm text-light-on-surface-variant tabular-nums">
                  List Price:{' '}
                  <span className="line-through">S${product.originalPrice.toFixed(2)}</span>
                </p>
              )}
              <p className="font-body text-body-sm text-light-on-surface-variant">
                Includes GST · PayNow, Visa/Mastercard &amp; 0% Instalments available
              </p>
            </div>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="font-body text-body-sm text-light-on-surface-variant">
                  Option: <strong className="text-light-on-surface">{activeVariant}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-1.5 rounded-sm border font-label text-label-md transition-colors duration-state-change cursor-pointer ${
                        activeVariant === variant
                          ? 'border-light-primary bg-light-secondary-container/40 text-light-primary'
                          : 'border-light-outline-variant bg-light-surface text-light-on-surface hover:bg-light-surface-container-low'
                      }`}
                    >
                      {variant}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="font-body text-body-md text-light-on-surface leading-relaxed">
              {product.description}
            </p>

            {/* Contiguous Delivery & Purchase Box */}
            <div className="bg-light-surface-container-low rounded border border-light-outline-variant/80 p-4 flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-headline-sm text-light-primary-container mt-0.5" aria-hidden="true">
                  local_shipping
                </span>
                <div className="text-body-sm">
                  <p className="font-label text-light-on-surface">{product.deliveryEstimate}</p>
                  <p className="text-light-on-surface-variant">
                    Delivering to {location.label} ({location.postalCode})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-label text-label-md text-light-primary">In Stock</span>
                <div className="flex items-center border border-light-outline-variant rounded-sm bg-light-surface">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="px-2.5 py-1 hover:bg-light-surface-container cursor-pointer font-label"
                  >
                    −
                  </button>
                  <span className="px-3 py-1 font-label text-label-md tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    aria-label="Increase quantity"
                    className="px-2.5 py-1 hover:bg-light-surface-container cursor-pointer font-label"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 rounded-full py-2.5 px-5 font-label text-label-lg transition-colors duration-state-change cursor-pointer ${
                    addedFeedback
                      ? 'bg-light-primary text-light-on-primary'
                      : 'bg-amazon-gold text-on-amazon-gold hover:bg-amazon-orange'
                  }`}
                >
                  {addedFeedback ? 'Added to Cart' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  onClick={() => onBuyNow(product, quantity, activeVariant)}
                  className="flex-1 rounded-full bg-amazon-orange text-on-amazon-orange py-2.5 px-5 font-label text-label-lg hover:brightness-95 transition-all duration-state-change cursor-pointer"
                >
                  Buy Now
                </button>
              </div>

              <button
                type="button"
                onClick={() => onToggleSave(product.id)}
                className="self-start inline-flex items-center gap-1.5 font-body text-body-sm text-light-primary-container hover:underline cursor-pointer pt-1"
              >
                <span
                  className="material-symbols-outlined text-title-md"
                  style={{ fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  aria-hidden="true"
                >
                  bookmark
                </span>
                <span>{isSaved ? 'Saved in Your Lists' : 'Add to List'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
