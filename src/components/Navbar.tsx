import { FormEvent, useState } from 'react';
import { DepartmentId, SingaporeLocation, UserAccount } from '../types/store';

interface NavbarProps {
  searchQuery: string;
  searchCategory: DepartmentId;
  onSearchChange: (query: string) => void;
  onSearchCategoryChange: (category: DepartmentId) => void;
  onSearchSubmit: (query: string, category: DepartmentId) => void;
  onGoHome: () => void;
  onSelectDepartment: (dept: DepartmentId) => void;
  onOpenMenuDrawer: () => void;
  onOpenLocationModal: () => void;
  onOpenAccountModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenCartDrawer: () => void;
  onOpenHelpModal: (articleId: string) => void;
  cartCount: number;
  location: SingaporeLocation;
  account: UserAccount;
  activeDepartment: DepartmentId | null;
}

const SUB_NAV_ITEMS: Array<{ id: DepartmentId; label: string; hideBelowXl?: boolean }> = [
  { id: 'fresh', label: 'Amazon Fresh' },
  { id: 'deals', label: "Today's Deals" },
  { id: 'electronics', label: 'Electronics' },
  { id: 'computers', label: 'Computers' },
  { id: 'books', label: 'Books' },
  { id: 'toys', label: 'Toys & Games' },
  { id: 'baby', label: 'Baby' },
  { id: 'dvds', label: 'DVDs', hideBelowXl: true },
];

export function Navbar({
  searchQuery,
  searchCategory,
  onSearchChange,
  onSearchCategoryChange,
  onSearchSubmit,
  onGoHome,
  onSelectDepartment,
  onOpenMenuDrawer,
  onOpenLocationModal,
  onOpenAccountModal,
  onOpenOrdersModal,
  onOpenCartDrawer,
  onOpenHelpModal,
  cartCount,
  location,
  account,
  activeDepartment,
}: NavbarProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery, searchCategory);
  };

  return (
    <header className="bg-amazon-navy text-on-amazon-navy sticky top-0 z-40">
      <div className="max-w-[1440px] mx-auto px-page-margin py-gutter-sm flex items-center gap-gutter-lg">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-1 px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change shrink-0 cursor-pointer text-left"
          aria-label="Amazon.sg Home"
        >
          <div className="flex flex-col leading-none">
            <div className="flex items-baseline">
              <span className="font-headline text-headline-md tracking-tight text-on-amazon-navy">
                amazon
              </span>
              <span className="font-label text-label-md text-amazon-amber">.sg</span>
            </div>
            <svg width="72" height="10" viewBox="0 0 72 10" fill="none" aria-hidden="true" className="-mt-0.5">
              <path
                d="M4 2.5C20 9.5 46 9.5 64 2.5"
                stroke="#FEBD69"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M60 1.5L65.5 2.5L63.5 7.5"
                stroke="#FEBD69"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Deliver To Singapore */}
        <button
          type="button"
          onClick={onOpenLocationModal}
          className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change text-left shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-headline-sm text-on-amazon-navy mt-1" aria-hidden="true">
            location_on
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-body text-label-sm text-on-amazon-navy/80">Deliver to</span>
            <span className="font-label text-label-md text-on-amazon-navy whitespace-nowrap">
              Singapore {location.postalCode}
            </span>
          </div>
        </button>

        {/* Global Searchbar */}
        <div className="flex-1 min-w-0">
          <form
            role="search"
            onSubmit={handleSubmit}
            className="flex items-stretch w-full rounded-sm overflow-hidden bg-light-surface text-light-on-surface focus-within:ring-2 focus-within:ring-amazon-orange"
          >
            <label htmlFor="nav-search-category" className="sr-only">
              Search category
            </label>
            <select
              id="nav-search-category"
              value={searchCategory}
              onChange={(e) => onSearchCategoryChange(e.target.value as DepartmentId)}
              className="hidden sm:block border-0 border-r border-light-outline-variant bg-light-surface-container text-light-on-surface-variant font-body text-body-sm pl-3 pr-7 py-2 focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="electronics">Electronics</option>
              <option value="computers">Computers</option>
              <option value="books">Books</option>
              <option value="toys">Toys &amp; Games</option>
              <option value="baby">Baby</option>
              <option value="fresh">Amazon Fresh</option>
              <option value="home">Home &amp; Kitchen</option>
            </select>
            <input
              id="search-input-01"
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search Amazon.sg"
              placeholder="Search Amazon.sg for electronics, books, groceries..."
              className="flex-1 min-w-0 border-0 bg-light-surface text-light-on-surface placeholder:text-light-on-surface-variant px-3 py-2 font-body text-body-md focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Go"
              className="bg-amazon-amber text-on-amazon-amber px-4 flex items-center justify-center hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
            >
              <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
                search
              </span>
            </button>
          </form>
        </div>

        {/* Language / Country */}
        <div className="relative hidden lg:block shrink-0">
          <button
            type="button"
            onClick={() => setLangMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change cursor-pointer"
            aria-expanded={langMenuOpen}
          >
            <span className="font-label text-label-md text-on-amazon-navy whitespace-nowrap">SG · EN</span>
            <span className="material-symbols-outlined text-body-sm text-on-amazon-navy/80" aria-hidden="true">
              expand_more
            </span>
          </button>
          {langMenuOpen && (
            <div className="absolute right-0 mt-1 w-60 rounded bg-light-surface text-light-on-surface border border-light-outline-variant shadow-lg p-4 z-50">
              <p className="font-headline text-headline-sm mb-1">Singapore Storefront</p>
              <p className="font-body text-body-sm text-light-on-surface-variant mb-3">
                You are shopping on Amazon.sg in English with prices in SGD (S$).
              </p>
              <button
                type="button"
                onClick={() => {
                  setLangMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full text-left font-body text-body-sm text-light-primary-container hover:underline cursor-pointer"
              >
                Change delivery postal code ({location.postalCode})
              </button>
            </div>
          )}
        </div>

        {/* Account & Lists */}
        <button
          type="button"
          onClick={onOpenAccountModal}
          className="hidden sm:flex flex-col px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change leading-tight shrink-0 text-left cursor-pointer"
        >
          <span className="font-body text-label-sm text-on-amazon-navy/80 truncate max-w-[120px]">
            {account.signedIn ? `Hello, ${account.name.split(' ')[0]}` : 'Hello, sign in'}
          </span>
          <span className="font-label text-label-md text-on-amazon-navy flex items-center gap-0.5 whitespace-nowrap">
            Account &amp; Lists
            <span className="material-symbols-outlined text-body-sm" aria-hidden="true">
              expand_more
            </span>
          </span>
        </button>

        {/* Returns & Orders */}
        <button
          type="button"
          onClick={onOpenOrdersModal}
          className="hidden lg:flex flex-col px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change leading-tight shrink-0 text-left cursor-pointer"
        >
          <span className="font-body text-label-sm text-on-amazon-navy/80">Returns</span>
          <span className="font-label text-label-md text-on-amazon-navy whitespace-nowrap">&amp; Orders</span>
        </button>

        {/* Cart */}
        <button
          type="button"
          onClick={onOpenCartDrawer}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-transparent hover:border-on-amazon-navy/60 transition-colors duration-state-change shrink-0 cursor-pointer"
          aria-label={`Shopping Cart with ${cartCount} items`}
        >
          <div className="relative flex items-center">
            <span className="material-symbols-outlined text-headline-lg text-on-amazon-navy" aria-hidden="true">
              shopping_cart
            </span>
            <span
              id="cart-count-badge"
              role="status"
              className="-ml-2 -mt-4 inline-flex items-center justify-center rounded-full bg-amazon-orange text-on-amazon-orange px-1.5 py-0.5 font-label text-label-sm tabular-nums min-w-[20px]"
            >
              <span>{cartCount}</span>
            </span>
          </div>
          <span className="font-label text-label-md text-on-amazon-navy mt-2">Cart</span>
        </button>
      </div>

      {/* Sub-Navigation Bar */}
      <nav aria-label="Primary categories" className="bg-amazon-slate text-on-amazon-slate">
        <div className="max-w-[1440px] mx-auto px-page-margin py-1.5 flex items-center justify-between gap-gutter-lg overflow-x-auto">
          <div className="flex items-center gap-gutter-md whitespace-nowrap">
            <button
              type="button"
              onClick={onOpenMenuDrawer}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-slate/60 font-label text-label-md text-on-amazon-slate cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
                menu
              </span>
              <span>All</span>
            </button>

            {SUB_NAV_ITEMS.slice(0, 2).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDepartment(item.id)}
                className={`px-2 py-1 rounded-sm border transition-colors duration-state-change font-body text-body-md cursor-pointer shrink-0 ${
                  activeDepartment === item.id
                    ? 'border-amazon-amber text-amazon-amber'
                    : 'border-transparent text-on-amazon-slate hover:border-on-amazon-slate/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onOpenHelpModal('prime')}
              className="px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-slate/60 font-body text-body-md text-on-amazon-slate cursor-pointer shrink-0"
            >
              Prime
            </button>

            {SUB_NAV_ITEMS.slice(2).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectDepartment(item.id)}
                className={`${item.hideBelowXl ? 'hidden xl:inline-block' : ''} px-2 py-1 rounded-sm border transition-colors duration-state-change font-body text-body-md cursor-pointer shrink-0 ${
                  activeDepartment === item.id
                    ? 'border-amazon-amber text-amazon-amber'
                    : 'border-transparent text-on-amazon-slate hover:border-on-amazon-slate/60'
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => onOpenHelpModal('support')}
              className="hidden xl:inline-block px-2 py-1 rounded-sm border border-transparent hover:border-on-amazon-slate/60 font-body text-body-md text-on-amazon-slate cursor-pointer shrink-0"
            >
              Customer Service
            </button>
          </div>

          <button
            type="button"
            onClick={() => onOpenHelpModal('shipping')}
            className="hidden lg:flex items-center gap-1.5 font-label text-label-md text-amazon-amber hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-sm" aria-hidden="true">
              local_shipping
            </span>
            <span>Free delivery on orders over S$40</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
