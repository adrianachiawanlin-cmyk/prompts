import { useEffect, useState } from 'react';
import { Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface TodaysDealsProps {
  deals: Product[];
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onSeeAllDeals: () => void;
}

function formatSeconds(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export function TodaysDeals({
  deals,
  onAddToCart,
  onSelectProduct,
  onSeeAllDeals,
}: TodaysDealsProps) {
  // Starts at 08:42:15 matching the Stitch design HTML
  const [secondsLeft, setSecondsLeft] = useState(8 * 3600 + 42 * 60 + 15);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 8 * 3600 + 42 * 60 + 15));
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="deals" aria-label="Today's Deals" className="max-w-[1440px] mx-auto px-page-margin mt-section">
      <div className="bg-light-surface rounded p-5 border border-light-outline-variant/60 flex flex-col gap-gutter-lg">
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-gutter-md">
            <h2 className="font-headline text-headline-lg text-light-on-surface">Today&apos;s Deals</h2>
            <span className="font-mono text-mono-sm text-deal-red tabular-nums">
              Ends in {formatSeconds(secondsLeft)}
            </span>
          </div>
          <button
            type="button"
            onClick={onSeeAllDeals}
            className="font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
          >
            See all deals
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch">
          {deals.map((deal) => (
            <ProductCard
              key={deal.id}
              product={deal}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
