import { useEffect, useMemo, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { CatalogView } from './components/CatalogView';
import { CategoryStrip } from './components/CategoryStrip';
import { DepartmentQuads } from './components/DepartmentQuads';
import { DepartmentsDrawer } from './components/DepartmentsDrawer';
import { Footer } from './components/Footer';
import { HeroBanner } from './components/HeroBanner';
import { Navbar } from './components/Navbar';
import { ProductModal } from './components/ProductModal';
import {
  AccountModal,
  HelpModal,
  LocationModal,
  OrdersModal,
} from './components/StoreModals';
import { TodaysDeals } from './components/TodaysDeals';
import {
  INITIAL_ORDERS,
  PRODUCTS,
  SINGAPORE_LOCATIONS,
} from './data/catalog';
import {
  CartItem,
  DepartmentId,
  Order,
  Product,
  SingaporeLocation,
  UserAccount,
} from './types/store';

const STORAGE_KEYS = {
  cart: 'amazonsg_cart_v1',
  saved: 'amazonsg_saved_v1',
  orders: 'amazonsg_orders_v1',
  location: 'amazonsg_location_v1',
  account: 'amazonsg_account_v1',
};

const DEFAULT_CART: CartItem[] = [
  {
    product: PRODUCTS[2], // Kindle Paperwhite
    quantity: 1,
    selectedVariant: PRODUCTS[2].variants?.[0],
  },
  {
    product: PRODUCTS[6], // Amazon Fresh Organic Box
    quantity: 1,
    selectedVariant: PRODUCTS[6].variants?.[0],
  },
];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStorage<CartItem[]>(STORAGE_KEYS.cart, DEFAULT_CART)
  );
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    readStorage<string[]>(STORAGE_KEYS.saved, ['sony-wh-1000xm5'])
  );
  const [orders, setOrders] = useState<Order[]>(() =>
    readStorage<Order[]>(STORAGE_KEYS.orders, INITIAL_ORDERS)
  );
  const [location, setLocation] = useState<SingaporeLocation>(() =>
    readStorage<SingaporeLocation>(STORAGE_KEYS.location, SINGAPORE_LOCATIONS[0])
  );
  const [account, setAccount] = useState<UserAccount>(() =>
    readStorage<UserAccount>(STORAGE_KEYS.account, {
      signedIn: false,
      name: 'Adrian Chia',
      email: 'adrian.chia@example.sg',
      isPrime: false,
    })
  );

  // Navigation & filter state
  const [activeDepartment, setActiveDepartment] = useState<DepartmentId | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<DepartmentId>('all');
  const [submittedSearch, setSubmittedSearch] = useState('');

  // Modal & drawer state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartInitialCheckout, setCartInitialCheckout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [helpArticleId, setHelpArticleId] = useState<string | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // Ignore storage quota issues
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(savedIds));
    } catch {
      // Ignore
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    } catch {
      // Ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.location, JSON.stringify(location));
    } catch {
      // Ignore
    }
  }, [location]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.account, JSON.stringify(account));
    } catch {
      // Ignore
    }
  }, [account]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const featuredDeals = useMemo(
    () => PRODUCTS.filter((p) => p.isDeal).slice(0, 4),
    []
  );

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedVariant?: string
  ) => {
    const resolvedVariant = selectedVariant ?? product.variants?.[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedVariant === resolvedVariant
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: resolvedVariant }];
    });
  };

  const handleBuyNow = (
    product: Product,
    quantity = 1,
    selectedVariant?: string
  ) => {
    handleAddToCart(product, quantity, selectedVariant);
    setSelectedProduct(null);
    setCartInitialCheckout(true);
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (
    productId: string,
    selectedVariant: string | undefined,
    delta: number
  ) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedVariant === selectedVariant
          ) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (
    productId: string,
    selectedVariant: string | undefined
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedVariant === selectedVariant
          )
      )
    );
  };

  const handlePlaceOrder = (details: {
    recipientName: string;
    addressLine: string;
    postalCode: string;
    paymentMethod: string;
  }): Order => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const deliveryFee = account.isPrime || subtotal >= 40 ? 0 : 4.99;
    const total = subtotal + deliveryFee;

    const newOrder: Order = {
      id: `SG-${Math.floor(100 + Math.random() * 900)}-${Math.floor(
        1000000 + Math.random() * 9000000
      )}`,
      placedAt: new Date().toLocaleDateString('en-SG', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed — Preparing Shipment',
      deliveryLocation: `${details.recipientName} · Singapore ${details.postalCode}`,
      paymentMethod: details.paymentMethod,
      subtotal,
      deliveryFee,
      total,
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        image: item.product.image,
        price: item.product.price,
        quantity: item.quantity,
        selectedVariant: item.selectedVariant,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  const handleToggleSave = (productId: string) => {
    setSavedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectDepartment = (dept: DepartmentId) => {
    setActiveDepartment(dept);
    setSubmittedSearch('');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string, category: DepartmentId) => {
    setSubmittedSearch(query);
    setActiveDepartment(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setActiveDepartment(null);
    setSearchQuery('');
    setSubmittedSearch('');
    setSearchCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProductById = (productId: string) => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) setSelectedProduct(found);
  };

  const isCatalogView = activeDepartment !== null || submittedSearch.trim() !== '';

  return (
    <div id="top" className="min-h-screen flex flex-col bg-light-background text-light-on-background">
      <Navbar
        searchQuery={searchQuery}
        searchCategory={searchCategory}
        onSearchChange={setSearchQuery}
        onSearchCategoryChange={setSearchCategory}
        onSearchSubmit={handleSearchSubmit}
        onGoHome={handleGoHome}
        onSelectDepartment={handleSelectDepartment}
        onOpenMenuDrawer={() => setMenuOpen(true)}
        onOpenLocationModal={() => setLocationOpen(true)}
        onOpenAccountModal={() => setAccountOpen(true)}
        onOpenOrdersModal={() => setOrdersOpen(true)}
        onOpenCartDrawer={() => {
          setCartInitialCheckout(false);
          setCartOpen(true);
        }}
        onOpenHelpModal={(id) => setHelpArticleId(id)}
        cartCount={cartCount}
        location={location}
        account={account}
        activeDepartment={activeDepartment}
      />

      <main className="flex-1 pb-10">
        {isCatalogView ? (
          <CatalogView
            products={PRODUCTS}
            activeDepartment={activeDepartment ?? 'all'}
            searchQuery={submittedSearch}
            onSelectDepartment={handleSelectDepartment}
            onClearSearch={() => {
              setSearchQuery('');
              setSubmittedSearch('');
            }}
            onGoHome={handleGoHome}
            onAddToCart={(product) => handleAddToCart(product, 1)}
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <>
            <HeroBanner onSelectDepartment={handleSelectDepartment} />
            <DepartmentQuads
              account={account}
              onSelectDepartment={handleSelectDepartment}
              onSelectProductById={handleSelectProductById}
              onOpenAccountModal={() => setAccountOpen(true)}
              onOpenOrdersModal={() => setOrdersOpen(true)}
              onOpenPrimeModal={() => setHelpArticleId('prime')}
            />
            <TodaysDeals
              deals={featuredDeals}
              onAddToCart={(product) => handleAddToCart(product, 1)}
              onSelectProduct={setSelectedProduct}
              onSeeAllDeals={() => handleSelectDepartment('deals')}
            />
            <CategoryStrip onSelectDepartment={handleSelectDepartment} />
          </>
        )}
      </main>

      <Footer
        onOpenAccountModal={() => setAccountOpen(true)}
        onOpenOrdersModal={() => setOrdersOpen(true)}
        onOpenHelpModal={(id) => setHelpArticleId(id)}
      />

      {/* Interactive Drawers & Modals */}
      <DepartmentsDrawer
        open={menuOpen}
        account={account}
        onClose={() => setMenuOpen(false)}
        onSelectDepartment={handleSelectDepartment}
        onOpenAccountModal={() => setAccountOpen(true)}
        onOpenOrdersModal={() => setOrdersOpen(true)}
        onOpenHelpModal={(id) => setHelpArticleId(id)}
      />

      <ProductModal
        key={selectedProduct?.id ?? 'closed'}
        product={selectedProduct}
        location={location}
        isSaved={selectedProduct ? savedIds.includes(selectedProduct.id) : false}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleSave={handleToggleSave}
      />

      <CartDrawer
        key={cartOpen ? (cartInitialCheckout ? 'cart-checkout' : 'cart-view') : 'cart-closed'}
        open={cartOpen}
        items={cart}
        location={location}
        account={account}
        initialCheckout={cartInitialCheckout}
        onClose={() => {
          setCartOpen(false);
          setCartInitialCheckout(false);
        }}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onPlaceOrder={handlePlaceOrder}
        onOpenOrders={() => setOrdersOpen(true)}
      />

      <LocationModal
        open={locationOpen}
        location={location}
        onClose={() => setLocationOpen(false)}
        onSelectLocation={setLocation}
      />

      <AccountModal
        open={accountOpen}
        account={account}
        savedIds={savedIds}
        onClose={() => setAccountOpen(false)}
        onSignIn={(name, email) =>
          setAccount((prev) => ({ ...prev, signedIn: true, name, email }))
        }
        onSignOut={() =>
          setAccount((prev) => ({ ...prev, signedIn: false }))
        }
        onTogglePrime={() =>
          setAccount((prev) => ({ ...prev, isPrime: !prev.isPrime }))
        }
        onSelectProduct={setSelectedProduct}
        onToggleSave={handleToggleSave}
        onAddToCart={(product) => handleAddToCart(product, 1)}
      />

      <OrdersModal
        open={ordersOpen}
        orders={orders}
        onClose={() => setOrdersOpen(false)}
      />

      <HelpModal
        articleId={helpArticleId}
        isPrime={account.isPrime}
        onTogglePrime={() =>
          setAccount((prev) => ({ ...prev, isPrime: !prev.isPrime }))
        }
        onClose={() => setHelpArticleId(null)}
      />
    </div>
  );
}
