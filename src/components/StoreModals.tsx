import { FormEvent, useState } from 'react';
import { HELP_ARTICLES, PRODUCTS, SINGAPORE_LOCATIONS } from '../data/catalog';
import { Order, Product, SingaporeLocation, UserAccount } from '../types/store';
import { SmartImage } from './SmartImage';

/* 1. Singapore Delivery Location Modal */
interface LocationModalProps {
  open: boolean;
  location: SingaporeLocation;
  onClose: () => void;
  onSelectLocation: (loc: SingaporeLocation) => void;
}

export function LocationModal({
  open,
  location,
  onClose,
  onSelectLocation,
}: LocationModalProps) {
  const [customPostal, setCustomPostal] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleApplyPostal = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = customPostal.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Enter a valid 6-digit Singapore postal code.');
      return;
    }
    setError('');
    onSelectLocation({
      label: 'Singapore',
      postalCode: cleaned,
      deliveryWindow: 'Tomorrow by 10 PM',
    });
    setCustomPostal('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Choose your Singapore location"
      onClick={onClose}
    >
      <div
        className="bg-light-surface text-light-on-surface rounded-md border border-light-outline-variant max-w-md w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 bg-light-surface-container border-b border-light-outline-variant flex items-center justify-between">
          <h2 className="font-headline text-headline-sm">Choose your location</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close location modal"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-light-surface-container-high cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <p className="font-body text-body-sm text-light-on-surface-variant">
            Delivery options and 2-hour Amazon Fresh slots vary by Singapore postal code.
          </p>

          <div className="flex flex-col gap-2">
            {SINGAPORE_LOCATIONS.map((loc) => (
              <button
                key={loc.postalCode}
                type="button"
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`p-3 rounded-sm border text-left flex items-center justify-between cursor-pointer transition-colors duration-state-change ${
                  location.postalCode === loc.postalCode
                    ? 'border-light-primary bg-light-secondary-container/30'
                    : 'border-light-outline-variant hover:bg-light-surface-container-low'
                }`}
              >
                <div>
                  <p className="font-label text-label-md text-light-on-surface">{loc.label}</p>
                  <p className="font-body text-body-sm text-light-on-surface-variant">
                    Postal {loc.postalCode} · {loc.deliveryWindow}
                  </p>
                </div>
                {location.postalCode === loc.postalCode && (
                  <span className="font-label text-label-sm text-light-primary">Selected</span>
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleApplyPostal} className="pt-2 border-t border-light-outline-variant/60 flex flex-col gap-2">
            <label htmlFor="sg-postal-input" className="font-label text-label-md text-light-on-surface">
              Or enter a Singapore postal code
            </label>
            <div className="flex gap-2">
              <input
                id="sg-postal-input"
                type="text"
                maxLength={6}
                placeholder="e.g. 238801"
                value={customPostal}
                onChange={(e) => setCustomPostal(e.target.value)}
                className="flex-1 rounded-sm border border-light-outline-variant px-3 py-2 font-mono text-mono-sm focus:outline-none focus:ring-2 focus:ring-light-primary"
              />
              <button
                type="submit"
                className="rounded-sm border border-light-outline-variant bg-light-surface-container px-4 py-2 font-label text-label-md hover:bg-light-surface-container-high cursor-pointer"
              >
                Apply
              </button>
            </div>
            {error && <p className="font-body text-body-sm text-light-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

/* 2. Account & Saved Lists Modal */
interface AccountModalProps {
  open: boolean;
  account: UserAccount;
  savedIds: string[];
  onClose: () => void;
  onSignIn: (name: string, email: string) => void;
  onSignOut: () => void;
  onTogglePrime: () => void;
  onSelectProduct: (product: Product) => void;
  onToggleSave: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export function AccountModal({
  open,
  account,
  savedIds,
  onClose,
  onSignIn,
  onSignOut,
  onTogglePrime,
  onSelectProduct,
  onToggleSave,
  onAddToCart,
}: AccountModalProps) {
  const [nameInput, setNameInput] = useState(account.name || 'Adrian Chia');
  const [emailInput, setEmailInput] = useState(account.email || 'adrian.chia@example.sg');

  if (!open) return null;

  const savedProducts = PRODUCTS.filter((p) => savedIds.includes(p.id));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) return;
    onSignIn(nameInput.trim(), emailInput.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Account and Lists"
      onClick={onClose}
    >
      <div
        className="bg-light-surface text-light-on-surface rounded-md border border-light-outline-variant max-w-lg w-full overflow-hidden shadow-xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 bg-amazon-slate text-on-amazon-slate flex items-center justify-between">
          <h2 className="font-headline text-headline-sm">Account &amp; Saved Lists</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5 max-h-[80vh] overflow-y-auto">
          {account.signedIn ? (
            <div className="bg-light-surface-container-low border border-light-outline-variant/80 rounded p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-headline text-headline-sm text-light-on-surface">{account.name}</p>
                  <p className="font-body text-body-sm text-light-on-surface-variant">{account.email}</p>
                </div>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="font-body text-body-sm text-light-primary-container hover:underline cursor-pointer"
                >
                  Sign out
                </button>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-light-outline-variant/60">
                <span className="font-body text-body-sm text-light-on-surface">
                  Prime Singapore: <strong>{account.isPrime ? 'Active (30-Day Trial)' : 'Not enrolled'}</strong>
                </span>
                <button
                  type="button"
                  onClick={onTogglePrime}
                  className="rounded-full bg-amazon-gold text-on-amazon-gold px-3.5 py-1 font-label text-label-sm hover:bg-amazon-orange cursor-pointer"
                >
                  {account.isPrime ? 'Pause Trial' : 'Start Free Trial'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 border border-light-outline-variant/80 rounded p-4">
              <h3 className="font-headline text-headline-sm">Sign in to Amazon.sg</h3>
              <label className="flex flex-col gap-1">
                <span className="font-label text-label-md">Your Name</span>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="rounded-sm border border-light-outline-variant px-3 py-2 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label text-label-md">Email</span>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="rounded-sm border border-light-outline-variant px-3 py-2 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-amazon-gold text-on-amazon-gold py-2.5 font-label text-label-lg hover:bg-amazon-orange cursor-pointer"
              >
                Sign in securely
              </button>
            </form>
          )}

          {/* Saved List */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline text-headline-sm">
              Your Saved List ({savedProducts.length})
            </h3>
            {savedProducts.length === 0 ? (
              <p className="font-body text-body-sm text-light-on-surface-variant">
                No items saved yet. Click any product to save it to your list.
              </p>
            ) : (
              <ul className="divide-y divide-light-outline-variant/60 border border-light-outline-variant/60 rounded">
                {savedProducts.map((p) => (
                  <li key={p.id} className="p-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="w-14 h-14 bg-light-surface-container-low rounded-sm p-1 shrink-0 cursor-pointer"
                    >
                      <SmartImage src={p.image} alt={p.title} className="w-full h-full object-contain" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectProduct(p);
                        }}
                        className="font-title text-title-md text-light-on-surface truncate block w-full text-left hover:text-light-primary-container cursor-pointer"
                      >
                        {p.title}
                      </button>
                      <p className="font-headline text-headline-sm text-light-on-surface tabular-nums">
                        S${p.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onAddToCart(p)}
                        className="rounded-full bg-amazon-gold text-on-amazon-gold px-3 py-1 font-label text-label-sm hover:bg-amazon-orange cursor-pointer"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSave(p.id)}
                        className="font-body text-body-sm text-light-on-surface-variant hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. Returns & Orders Modal */
interface OrdersModalProps {
  open: boolean;
  orders: Order[];
  onClose: () => void;
}

export function OrdersModal({ open, orders, onClose }: OrdersModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Returns and Orders"
      onClick={onClose}
    >
      <div
        className="bg-light-surface text-light-on-surface rounded-md border border-light-outline-variant max-w-2xl w-full overflow-hidden shadow-xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 bg-amazon-slate text-on-amazon-slate flex items-center justify-between">
          <h2 className="font-headline text-headline-sm">Returns &amp; Orders ({orders.length})</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close orders modal"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4 max-h-[78vh] overflow-y-auto">
          {orders.length === 0 ? (
            <p className="font-body text-body-md text-light-on-surface-variant text-center py-8">
              You have no recent orders yet.
            </p>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="border border-light-outline-variant rounded overflow-hidden">
                <div className="bg-light-surface-container px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-body-sm border-b border-light-outline-variant/60">
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <span className="text-light-on-surface-variant block">Order placed</span>
                      <span className="font-label text-light-on-surface">{order.placedAt}</span>
                    </div>
                    <div>
                      <span className="text-light-on-surface-variant block">Total</span>
                      <span className="font-label text-light-on-surface tabular-nums">
                        S${order.total.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-light-on-surface-variant block">Ship to</span>
                      <span className="font-label text-light-on-surface">{order.deliveryLocation}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-light-on-surface-variant block">Order #{order.id}</span>
                    <span className="font-label text-light-primary">{order.status}</span>
                  </div>
                </div>
                <ul className="divide-y divide-light-outline-variant/60 p-4 flex flex-col gap-3">
                  {order.items.map((item) => (
                    <li key={`${item.productId}-${item.selectedVariant ?? 'default'}`} className="flex items-center gap-3 pt-2 first:pt-0">
                      <div className="w-14 h-14 bg-light-surface-container-low rounded-sm p-1 shrink-0">
                        <SmartImage src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-title text-title-md text-light-on-surface line-clamp-1">
                          {item.title}
                        </p>
                        <p className="font-body text-body-sm text-light-on-surface-variant tabular-nums">
                          Qty {item.quantity} · S${item.price.toFixed(2)} · {order.paymentMethod}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* 4. Help / Prime Info Modal */
interface HelpModalProps {
  articleId: string | null;
  isPrime: boolean;
  onTogglePrime: () => void;
  onClose: () => void;
}

export function HelpModal({
  articleId,
  isPrime,
  onTogglePrime,
  onClose,
}: HelpModalProps) {
  if (!articleId) return null;
  const article = HELP_ARTICLES[articleId] ?? HELP_ARTICLES.support;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onClick={onClose}
    >
      <div
        className="bg-light-surface text-light-on-surface rounded-md border border-light-outline-variant max-w-lg w-full overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3.5 bg-amazon-slate text-on-amazon-slate flex items-center justify-between">
          <h2 className="font-headline text-headline-sm">{article.title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close help dialog"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <p className="font-body text-body-md text-light-on-surface-variant">{article.subtitle}</p>
          <div className="flex flex-col gap-3">
            {article.sections.map((sec) => (
              <div key={sec.heading} className="bg-light-surface-container-low rounded p-3.5 border border-light-outline-variant/60">
                <h3 className="font-headline text-headline-sm text-light-on-surface mb-1">
                  {sec.heading}
                </h3>
                <p className="font-body text-body-sm text-light-on-surface-variant leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>

          {article.id === 'prime' && (
            <button
              type="button"
              onClick={onTogglePrime}
              className="w-full rounded-full bg-amazon-gold text-on-amazon-gold py-2.5 px-5 font-label text-label-lg hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
            >
              {isPrime ? 'Prime 30-Day Free Trial Active (Pause)' : 'Start 30-Day Free Prime Trial'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
