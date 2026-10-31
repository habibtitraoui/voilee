import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';

function ProductCard({ product, index, isVisible }: { product: Product; index: number; isVisible: boolean }) {
  const { addToCart, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimeout.current) clearTimeout(addedTimeout.current);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, 1);
    setJustAdded(true);
    openCart();
    if (addedTimeout.current) clearTimeout(addedTimeout.current);
    addedTimeout.current = setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12 }}
      className="group"
    >
      {/* Image */}
      <div className="relative rounded-2xl overflow-hidden mb-4 img-hover-zoom">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[380px] sm:h-[420px] object-cover"
          loading="lazy"
        />

        {/* Tag */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-dark">
          {product.tag}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWishlisted((w) => !w)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-dark/40 hover:text-rose-500 transition-colors"
          aria-label={`Ajouter ${product.name} aux favoris`}
        >
          <Heart size={18} className={wishlisted ? 'fill-rose-500 text-rose-500' : ''} />
        </button>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, j) => (
            <Star key={j} size={12} className="fill-gold text-gold" />
          ))}
          <span className="text-xs text-dark/40 ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-dark mb-1 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-dark">{product.price}€</span>
          <span className="text-sm text-dark/40 line-through">{product.originalPrice}€</span>
        </div>

        {/* Colors */}
        <div className="flex gap-2 mt-3">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border-2 shadow-sm hover:scale-125 transition-transform ${
                selectedColor === color ? 'border-gold ring-2 ring-gold/30' : 'border-white'
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Choisir la couleur ${color} pour ${product.name}`}
              aria-pressed={selectedColor === color}
              title={`Couleur ${color}`}
            />
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="mt-4 w-full py-3 rounded-xl bg-dark text-white text-sm font-medium flex items-center justify-center gap-2 hover:bg-dark-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold transition-colors"
          aria-live="polite"
          aria-atomic="true"
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2"
              >
                <Check size={16} /> Ajouté au panier
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center gap-2"
              >
                <ShoppingBag size={16} />
                Ajouter au panier
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="collection" ref={ref} className="relative py-20 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4"
          >
            Notre Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-serif font-bold text-dark mb-6"
          >
            Ensembles{' '}
            <span className="gradient-text">Signature</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-dark/60 leading-relaxed"
          >
            Chaque ensemble est une pièce unique, associant hijab et sous-hijab
            parfaitement coordonnés pour un look complet et raffiné.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
