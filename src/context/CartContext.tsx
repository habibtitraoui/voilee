import { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  key: string;
  product: Product;
  color: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  addToCart: (product: Product, color: string, quantity?: number) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  buyNow: (product: Product, color: string) => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 60;
const SHIPPING_FEE = 4.9;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const addToCart = (product: Product, color: string, quantity = 1) => {
    const key = `${product.id}-${color}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { key, product, color, quantity }];
    });
  };

  const removeFromCart = (key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);
  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };
  const closeCheckout = () => setCheckoutOpen(false);

  const buyNow = (product: Product, color: string) => {
    addToCart(product, color, 1);
    openCheckout();
  };

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const value: CartContextValue = {
    items,
    isCartOpen,
    isCheckoutOpen,
    itemCount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    buyNow,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export { FREE_SHIPPING_THRESHOLD };
