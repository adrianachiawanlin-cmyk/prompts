import { useMemo, useState } from 'react';
import { DEPARTMENT_LABELS } from '../data/catalog';
import { DepartmentId, Product } from '../types/store';
import { ProductCard } from './ProductCard';

interface CatalogViewProps {
  products: Product[];
  activeDepartment: DepartmentId;
  searchQuery: string;
  onSelectDepartment: (dept: DepartmentId) => void;
  onClearSearch: () => void;
  onGoHome: () => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const FILTER_TABS: DepartmentId[] = [
  'all',
  'deals',
  'electronics',
  'computers',
  'fresh',
  'books',
  'toys',
  'baby',
  'home',
];

export function CatalogView({
  products,
  activeDepartment,
  searchQuery,
  onSelectDepartment,
  onClearSearch,
  onGoHome,
  onAddToCart,
  onSelectProduct,
}: CatalogViewProps) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [primeOnly, setPrimeOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      if (activeDepartment === 'deals' && !item.isDeal) return false;
      if (
        activeDepartment !== 'all' &&
        activeDepartment !== 'deals' &&
        item.department !== activeDepartment
      ) {
        return false;
      }
      if (primeOnly && !item.isPrime) return false;
      if (q) {
        const hay = `${item.title} ${item.brand} ${item.categoryLabel} ${item.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, activeDepartment, searchQuery, primeOnly, sortBy]);

  return (
    <section className="max-w-[1440px] mx-auto px-page-margin py-section flex flex-col gap-gutter-lg">
      {/* Breadcrumb & Title Header */}
      <div className="bg-light-surface rounded p-5 border border-light-outline-variant/60 flex flex-col gap-gutter-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-body-sm text-light-on-surface-variant">
              <button
                type="button"
                onClick={onGoHome}
                className="text-light-primary-container hover:underline cursor-pointer"
              >
                Home Storefront
              </button>
              <span aria-hidden="true">/</span>
              <span>{DEPARTMENT_LABELS[activeDepartment]}</span>
            </div>
            <h1 className="font-headline text-headline-lg text-light-on-surface">
              {searchQuery.trim()
                ? `Results for "${searchQuery.trim()}"`
                : DEPARTMENT_LABELS[activeDepartment]}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 text-body-sm text-light-on-surface cursor-pointer select-none">
              <input
                type="checkbox"
                checked={primeOnly}
                onChange={(e) => setPrimeOnly(e.target.checked)}
                className="rounded border-light-outline text-light-primary focus:ring-light-primary"
              />
              <span className="font-label text-label-md text-light-primary-container">Prime Eligible</span>
            </label>

            <div className="flex items-center gap-2">
              <label htmlFor="catalog-sort" className="font-body text-body-sm text-light-on-surface-variant">
                Sort by:
              </label>
              <select
                id="catalog-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-sm border border-light-outline-variant bg-light-surface-container-low px-3 py-1.5 font-body text-body-sm text-light-on-surface focus:outline-none focus:ring-2 focus:ring-light-primary cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Department Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
          {FILTER_TABS.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => onSelectDepartment(dept)}
              className={`px-3 py-1.5 rounded-sm font-label text-label-md whitespace-nowrap shrink-0 transition-colors duration-state-change cursor-pointer ${
                activeDepartment === dept
                  ? 'bg-amazon-slate text-on-amazon-slate'
                  : 'bg-light-surface-container text-light-on-surface hover:bg-light-surface-container-high'
              }`}
            >
              {DEPARTMENT_LABELS[dept]}
            </button>
          ))}
          {searchQuery.trim() && (
            <button
              type="button"
              onClick={onClearSearch}
              className="px-3 py-1.5 rounded-sm border border-light-outline-variant text-light-primary-container font-label text-label-md whitespace-nowrap shrink-0 hover:bg-light-surface-container-low cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>
      </div>

      {/* Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-light-surface rounded p-10 border border-light-outline-variant/60 text-center flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-light-on-surface-variant" aria-hidden="true">
            search_off
          </span>
          <h2 className="font-headline text-headline-md text-light-on-surface">
            No matching items found
          </h2>
          <p className="font-body text-body-md text-light-on-surface-variant max-w-md">
            Try clearing your search filter or exploring all departments on Amazon.sg.
          </p>
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                onClearSearch();
                onSelectDepartment('all');
                setPrimeOnly(false);
              }}
              className="rounded-full bg-amazon-gold text-on-amazon-gold px-5 py-2 font-label text-label-md hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
            >
              View All Products
            </button>
            <button
              type="button"
              onClick={onGoHome}
              className="rounded-full border border-light-outline-variant px-5 py-2 font-label text-label-md text-light-on-surface hover:bg-light-surface-container transition-colors duration-state-change cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-lg items-stretch">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
