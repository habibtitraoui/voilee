import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, FREE_SHIPPING_THRESHOLD } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
    openCheckout,
  } = useCart();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-dark/50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] bg-cream shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Panier"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-dark/5">
              <h2 className="font-serif text-xl font-bold text-dark flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold" />
                Votre Panier
                {items.length > 0 && (
                  <span className="text-sm font-sans font-normal text-dark/40">
                    ({items.reduce((s, i) => s + i.quantity, 0)})
                  </span>
                )}
              </h2>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-dark/5 transition-colors"
                aria-label="Fermer le panier"
              >
                <X size={20} className="text-dark/60" />
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty state */
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-champagne-100 flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-gold" />
                </div>
                <p className="text-dark font-semibold mb-2">Votre panier est vide</p>
                <p className="text-sm text-dark/50 mb-6">
                  Découvrez notre collection et ajoutez vos ensembles préférés.
                </p>
                <a
                  href="#collection"
                  onClick={closeCart}
                  className="px-6 py-3 bg-dark text-white text-sm font-medium rounded-full hover:bg-dark-light transition-colors"
                >
                  Voir la Collection
                </a>
              </div>
            ) : (
              <>
                {/* Free shipping progress */}
                <div className="px-6 py-4 bg-gold/5 border-b border-gold/10">
                  {remainingForFreeShipping > 0 ? (
                    <p className="text-xs text-dark/60 mb-2">
                      Plus que{' '}
                      <span className="font-bold text-gold">
                        {remainingForFreeShipping.toFixed(2)}€
                      </span>{' '}
                      pour la livraison gratuite !
                    </p>
                  ) : (
                    <p className="text-xs text-dark/60 mb-2 font-medium">
                      🎉 Livraison gratuite débloquée !
                    </p>
                  )}
                  <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%`,
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-gold to-champagne-400"
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.key}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-4 pb-4 border-b border-dark/5"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-xl flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-semibold text-dark truncate">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.key)}
                              className="p-1 text-dark/30 hover:text-rose-500 transition-colors flex-shrink-0"
                              aria-label="Supprimer l'article"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5 mt-1 mb-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-dark/10"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-dark/40">Coloris sélectionné</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 border border-dark/10 rounded-full px-1">
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center text-dark/60 hover:text-gold transition-colors"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="text-sm font-medium text-dark w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center text-dark/60 hover:text-gold transition-colors"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-dark">
                              {(item.product.price * item.quantity).toFixed(2)}€
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer / Summary */}
                <div className="px-6 py-5 border-t border-dark/5 bg-white">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-dark/60">
                      <span>Sous-total</span>
                      <span>{subtotal.toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-sm text-dark/60">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-dark pt-2 border-t border-dark/5">
                      <span>Total</span>
                      <span className="gradient-text">{total.toFixed(2)}€</span>
                    </div>
                  </div>
                  <button
                    onClick={openCheckout}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-dark text-white font-semibold rounded-full hover:bg-dark-light transition-all duration-300 hover:shadow-lg hover:shadow-dark/20"
                  >
                    Passer la Commande
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
