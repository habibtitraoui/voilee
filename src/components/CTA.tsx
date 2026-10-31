import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { featuredProduct } from '../data/products';

export default function CTA() {
  const { ref, isVisible } = useScrollReveal();
  const { buyNow } = useCart();

  return (
    <section ref={ref} className="relative py-20 lg:py-32 bg-cream overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-gold/10 via-champagne-200/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
        >
          <Gift size={14} className="text-gold" />
          <span className="text-xs font-medium text-gold tracking-wider uppercase">
            Offre limitée — -35% sur tout
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold text-dark mb-6 leading-tight"
        >
          Prête à Sublimer{' '}
          <span className="gradient-text">Votre Style</span> ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg text-dark/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Rejoignez plus de 2 500 femmes qui ont transformé leur style quotidien
          avec nos ensembles de hijab premium. Commandez aujourd'hui et bénéficiez
          de la livraison gratuite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => buyNow(featuredProduct, featuredProduct.colors[0])}
            className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-dark text-white font-semibold rounded-full hover:bg-dark-light transition-all duration-300 hover:shadow-2xl hover:shadow-dark/30 hover:-translate-y-1"
          >
            Commander Maintenant
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#collection"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-dark font-semibold rounded-full border border-dark/10 hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            Voir la Collection
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {[
            { icon: '🔒', text: 'Paiement sécurisé' },
            { icon: '🚚', text: 'Livraison gratuite' },
            { icon: '↩️', text: 'Retour 30 jours' },
            { icon: '💎', text: 'Qualité premium' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2">
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm text-dark/50 font-medium">{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
