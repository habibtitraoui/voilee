import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const IMAGE_SRC = 'https://images.pexels.com/photos/34993907/pexels-photo-34993907.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

const benefits = [
  'Ensemble complet hijab + sous-hijab assorti',
  'Tissu respirant et anti-froissement',
  'Couleurs résistantes aux lavages',
  'Coupe universelle adaptée à toutes les morphologies',
  'Emballage cadeau élégant inclus',
  'Guide de style personnalisé offert',
];

export default function Benefits() {
  const { ref, isVisible } = useScrollReveal();
  const { buyNow } = useCart();
  const signatureProduct = products.find((p) => p.id === 'perle') ?? products[0];

  return (
    <section ref={ref} className="relative py-20 lg:py-32 bg-cream overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-dark/10">
              <img
                src={IMAGE_SRC}
                alt="Femme élégante portant un ensemble de hijab VOILÉE"
                className="w-full h-[450px] lg:h-[600px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 via-transparent to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl border-2 border-gold/20" />

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-4 sm:bottom-6 sm:-right-6 glass rounded-2xl p-5 shadow-xl max-w-[200px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌿</span>
                <p className="text-xs font-medium text-dark/50">Eco-Friendly</p>
              </div>
              <p className="text-sm font-semibold text-dark">
                Matériaux durables & responsables
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4"
            >
              Les Avantages
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl lg:text-5xl font-serif font-bold text-dark mb-6"
            >
              Tout Ce Dont Vous{' '}
              <span className="gradient-text">Avez Besoin</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-dark/60 leading-relaxed mb-8"
            >
              Nos ensembles de hijab sont conçus pour simplifier votre routine
              tout en vous garantissant un style impeccable à chaque instant.
            </motion.p>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-gold to-champagne-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform">
                    <Check size={14} className="text-white" />
                  </div>
                  <p className="text-dark/70 font-medium">{benefit}</p>
                </motion.div>
              ))}
            </div>

            <motion.button
              onClick={() => buyNow(signatureProduct, signatureProduct.colors[0])}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-dark text-white font-medium rounded-full hover:bg-dark-light transition-all duration-300 hover:shadow-xl hover:shadow-dark/20 hover:-translate-y-0.5"
            >
              Commander Maintenant
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
