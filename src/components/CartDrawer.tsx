import { FormEvent, useState } from 'react';
import { CartItem, Order, SingaporeLocation, UserAccount } from '../types/store';
import { SmartImage } from './SmartImage';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  location: SingaporeLocation;
  account: UserAccount;
  initialCheckout?: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, selectedVariant: string | undefined, delta: number) => void;
  onRemoveItem: (productId: string, selectedVariant: string | undefined) => void;
  onPlaceOrder: (details: {
    recipientName: string;
    addressLine: string;
    postalCode: string;
    paymentMethod: string;
  }) => Order;
  onOpenOrders: () => void;
}

export function CartDrawer({
  open,
  items,
  location,
  account,
  initialCheckout = false,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onOpenOrders,
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>(
    initialCheckout ? 'checkout' : 'cart'
  );
  const [recipientName, setRecipientName] = useState(
    account.signedIn ? account.name : 'Adrian Chia'
  );
  const [addressLine, setAddressLine] = useState('10 Bayfront Avenue, Tower 2 #14-08');
  const [postalCode, setPostalCode] = useState(location.postalCode);
  const [paymentMethod, setPaymentMethod] = useState('PayNow QR');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  if (!open) return null;

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeDelivery = account.isPrime || subtotal >= 40 || subtotal === 0;
  const deliveryFee = freeDelivery ? 0 : 4.99;
  const total = subtotal + deliveryFee;
  const remainingForFree = Math.max(0, 40 - subtotal);

  const handleClose = () => {
    setStep('cart');
    setConfirmedOrder(null);
    onClose();
  };

  const handleSubmitOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!items.length) return;
    const order = onPlaceOrder({
      recipientName: recipientName.trim() || 'Singapore Customer',
      addressLine: addressLine.trim() || location.label,
      postalCode: postalCode.trim() || location.postalCode,
      paymentMethod,
    });
    setConfirmedOrder(order);
    setStep('confirmed');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
      onClick={handleClose}
    >
      <aside
        className="bg-light-surface text-light-on-surface w-full max-w-md h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-5 py-4 bg-amazon-navy text-on-amazon-navy flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-headline-md text-amazon-amber" aria-hidden="true">
              shopping_cart
            </span>
            <h2 className="font-headline text-headline-md">
              {step === 'cart' && `Shopping Cart (${totalCount})`}
              {step === 'checkout' && 'Singapore Checkout'}
              {step === 'confirmed' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close cart"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        {/* Confirmed Order Receipt */}
        {step === 'confirmed' && confirmedOrder ? (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
            <div className="bg-light-secondary-container/40 border border-light-primary/30 rounded p-4 flex items-start gap-3">
              <span
                className="material-symbols-outlined text-headline-lg text-light-primary shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                check_circle
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="font-headline text-headline-sm text-light-on-surface">
                  Order #{confirmedOrder.id} Confirmed — Preparing Shipment
                </h3>
                <p className="font-body text-body-sm text-light-on-surface-variant">
                  Delivering to {confirmedOrder.deliveryLocation} · Paid via {confirmedOrder.paymentMethod}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="font-label text-label-lg text-light-on-surface">Order Summary</h4>
              <ul className="divide-y divide-light-outline-variant/60 border border-light-outline-variant/60 rounded">
                {confirmedOrder.items.map((item) => (
                  <li key={`${item.productId}-${item.selectedVariant ?? 'default'}`} className="p-3 flex gap-3 items-center">
                    <div className="w-12 h-12 bg-light-surface-container-low rounded-sm p-1 shrink-0">
                      <SmartImage src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-title text-title-md text-light-on-surface truncate">{item.title}</p>
                      <p className="font-body text-body-sm text-light-on-surface-variant tabular-nums">
                        Qty {item.quantity} · S${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-headline text-headline-sm pt-2 tabular-nums">
                <span>Total Paid (incl. GST)</span>
                <span>S${confirmedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                  onOpenOrders();
                }}
                className="w-full rounded-full bg-amazon-gold text-on-amazon-gold py-2.5 px-5 font-label text-label-lg hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
              >
                View Order in Returns &amp; Orders
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="w-full rounded-full border border-light-outline-variant py-2.5 px-5 font-label text-label-md text-light-on-surface hover:bg-light-surface-container cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : step === 'checkout' ? (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="self-start inline-flex items-center gap-1 font-body text-body-sm text-light-primary-container hover:underline cursor-pointer"
            >
              <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                arrow_back
              </span>
              Back to Cart
            </button>

            <div className="flex flex-col gap-3 border border-light-outline-variant/80 rounded p-4 bg-light-surface-container-low">
              <h3 className="font-headline text-headline-sm">1. Singapore Delivery Address</h3>
              <label className="flex flex-col gap-1">
                <span className="font-label text-label-md text-light-on-surface">Full Name</span>
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="rounded-sm border border-light-outline-variant bg-light-surface px-3 py-2 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label text-label-md text-light-on-surface">Street &amp; Unit No.</span>
                <input
                  type="text"
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="rounded-sm border border-light-outline-variant bg-light-surface px-3 py-2 font-body text-body-md focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label text-label-md text-light-on-surface">Singapore Postal Code</span>
                <input
                  type="text"
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="rounded-sm border border-light-outline-variant bg-light-surface px-3 py-2 font-mono text-mono-sm focus:outline-none focus:ring-2 focus:ring-light-primary"
                />
              </label>
            </div>

            <div className="flex flex-col gap-2.5 border border-light-outline-variant/80 rounded p-4 bg-light-surface-container-low">
              <h3 className="font-headline text-headline-sm">2. Payment Method</h3>
              {['PayNow QR', 'Visa / Mastercard (SGD)', '0% Instalment Plan (6 Months)'].map((method) => (
                <label
                  key={method}
                  className={`flex items-center gap-2.5 p-2.5 rounded-sm border cursor-pointer ${
                    paymentMethod === method
                      ? 'border-light-primary bg-light-surface'
                      : 'border-light-outline-variant/60 bg-light-surface'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="text-light-primary focus:ring-light-primary"
                  />
                  <span className="font-body text-body-md text-light-on-surface">{method}</span>
                </label>
              ))}
            </div>

            <div className="border-t border-light-outline-variant pt-3 flex flex-col gap-1.5 text-body-sm tabular-nums mt-auto">
              <div className="flex justify-between">
                <span className="text-light-on-surface-variant">Items ({totalCount}):</span>
                <span>S${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-light-on-surface-variant">Singapore Delivery:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `S$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-headline text-headline-md text-deal-red pt-1 border-t border-light-outline-variant/60">
                <span>Order Total:</span>
                <span>S${total.toFixed(2)}</span>
              </div>
              <button
                type="submit"
                className="mt-3 w-full rounded-full bg-amazon-gold text-on-amazon-gold py-2.5 px-5 font-label text-label-lg hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
              >
                Place Your Order (S${total.toFixed(2)})
              </button>
            </div>
          </form>
        ) : (
          /* Cart Items List */
          <>
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 gap-3">
                  <span className="material-symbols-outlined text-5xl text-light-on-surface-variant/60" aria-hidden="true">
                    remove_shopping_cart
                  </span>
                  <h3 className="font-headline text-headline-md">Your Amazon.sg Cart is empty</h3>
                  <p className="font-body text-body-md text-light-on-surface-variant max-w-xs">
                    Browse Today&apos;s Deals or shop Electronics, Amazon Fresh, Books, and more.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-2 rounded-full bg-amazon-gold text-on-amazon-gold px-6 py-2 font-label text-label-md hover:bg-amazon-orange cursor-pointer"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Free Delivery Notice */}
                  <div className="bg-light-surface-container-low border border-light-outline-variant/60 rounded p-3 text-body-sm flex items-start gap-2">
                    <span
                      className="material-symbols-outlined text-headline-sm text-light-primary shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      {freeDelivery ? 'check_circle' : 'local_shipping'}
                    </span>
                    <p className="text-light-on-surface">
                      {freeDelivery ? (
                        <>
                          Your order qualifies for <strong className="text-light-primary">FREE Singapore Delivery</strong>.
                        </>
                      ) : (
                        <>
                          Add <strong className="tabular-nums">S${remainingForFree.toFixed(2)}</strong> more of eligible items for FREE delivery.
                        </>
                      )}
                    </p>
                  </div>

                  <ul className="divide-y divide-light-outline-variant/60">
                    {items.map((item) => (
                      <li
                        key={`${item.product.id}-${item.selectedVariant ?? 'default'}`}
                        className="py-4 flex gap-3"
                      >
                        <div className="w-20 h-20 bg-light-surface-container-low rounded-sm p-2 shrink-0 flex items-center justify-center">
                          <SmartImage
                            src={item.product.image}
                            alt={item.product.title}
                            className={`w-full h-full ${
                              item.product.imageMode === 'cover' ? 'object-cover rounded-sm' : 'object-contain'
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                          <h3 className="font-title text-title-md text-light-on-surface line-clamp-2">
                            {item.product.title}
                          </h3>
                          {item.selectedVariant && (
                            <span className="font-body text-body-sm text-light-on-surface-variant">
                              Option: {item.selectedVariant}
                            </span>
                          )}
                          <div className="flex items-baseline gap-2 tabular-nums">
                            <span className="font-headline text-headline-sm text-light-on-surface">
                              S${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            {item.product.isPrime && (
                              <span className="font-label text-label-sm text-light-primary-container">
                                Prime
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 pt-1">
                            <div className="inline-flex items-center border border-light-outline-variant rounded-sm bg-light-surface-container-low">
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.selectedVariant, -1)
                                }
                                aria-label="Decrease quantity"
                                className="px-2 py-0.5 font-label text-label-md hover:bg-light-surface-container cursor-pointer"
                              >
                                −
                              </button>
                              <span className="px-2.5 py-0.5 font-label text-label-md tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.selectedVariant, 1)
                                }
                                aria-label="Increase quantity"
                                className="px-2 py-0.5 font-label text-label-md hover:bg-light-surface-container cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id, item.selectedVariant)}
                              className="font-body text-body-sm text-light-primary-container hover:underline cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-light-outline-variant p-5 bg-light-surface-container-low flex flex-col gap-3">
                <div className="flex items-baseline justify-between tabular-nums">
                  <span className="font-body text-body-md text-light-on-surface">
                    Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'}):
                  </span>
                  <span className="font-headline text-headline-md text-light-on-surface">
                    S${subtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPostalCode(location.postalCode);
                    setStep('checkout');
                  }}
                  className="w-full rounded-full bg-amazon-gold text-on-amazon-gold py-2.5 px-5 font-label text-label-lg hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}
