export type DepartmentId =
  | 'all'
  | 'deals'
  | 'fresh'
  | 'electronics'
  | 'computers'
  | 'books'
  | 'toys'
  | 'baby'
  | 'home'
  | 'dvds';

export interface Product {
  id: string;
  title: string;
  brand: string;
  department: Exclude<DepartmentId, 'all' | 'deals'>;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  dealTag?: string;
  isDeal?: boolean;
  isPrime: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  imageMode?: 'contain' | 'cover';
  deliveryEstimate: string;
  description: string;
  variants?: string[];
  specs: Array<{ label: string; value: string }>;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface OrderItemSummary {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  placedAt: string;
  status: 'Confirmed — Preparing Shipment' | 'Out for Delivery' | 'Delivered';
  deliveryLocation: string;
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  items: OrderItemSummary[];
}

export interface SingaporeLocation {
  label: string;
  postalCode: string;
  deliveryWindow: string;
}

export interface UserAccount {
  signedIn: boolean;
  name: string;
  email: string;
  isPrime: boolean;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  targetDepartment: DepartmentId;
  image: string;
}

export interface HelpArticle {
  id: string;
  title: string;
  subtitle: string;
  sections: Array<{ heading: string; body: string }>;
}
