import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { featuredProduct } from '../data/products';

const HERO_IMAGE = 'https://images.pexels.com/photos/36211850/pexels-photo-36211850.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

export default function Hero() {
  const { buyNow } = useCart();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream">
      {/* Ambient background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-champagne-200/30 rounded-full blur-3xl glow-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl glow-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gold/20 mb-6"
            >
              <Sparkles size={14} className="text-gold" />
              <span className="text-xs font-medium text-dark/70 tracking-wider uppercase">
                Nouvelle Collection 2025
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-dark leading-[1.1] mb-6"
            >
              Élégance{' '}
              <span className="gradient-text">Redéfinie</span>
              <br />
              Pour Chaque Jour
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-dark/60 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Découvrez nos ensembles de hijab confectionnés avec des tissus premium,
              pensés pour sublimer votre style au quotidien avec grâce et modernité.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => buyNow(featuredProduct, featuredProduct.colors[0])}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark text-white font-medium rounded-full hover:bg-dark-light transition-all duration-300 hover:shadow-xl hover:shadow-dark/20 hover:-translate-y-0.5"
              >
                Commander Maintenant
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#collection"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-dark/15 text-dark font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300 hover:-translate-y-0.5"
              >
                En Savoir Plus
              </a>
            </motion.div>

            {/* Social proof mini */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-cream bg-gradient-to-br from-champagne-200 to-champagne-400 flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-dark/60">
                  <span className="font-semibold text-dark">2,500+</span> clientes satisfaites
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto max-w-md lg:max-w-full">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-gold/20 via-champagne-200/20 to-gold/10 blur-2xl" />

              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-dark/10">
                <img
                  src={HERO_IMAGE}
                  alt="Femme portant un ensemble de hijab premium VOILÉE"
                  className="w-full h-[500px] sm:h-[600px] lg:h-[650px] object-cover"
                  loading="eager"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/20 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-champagne-500 flex items-center justify-center">
                    <span className="text-white text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-xs text-dark/50 font-medium">Tissu Premium</p>
                    <p className="text-sm font-bold text-dark">100% Qualité</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating price tag */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-2 -right-2 sm:top-8 sm:-right-6 glass rounded-2xl p-4 shadow-xl"
              >
                <p className="text-xs text-dark/50 font-medium">À partir de</p>
                <p className="text-2xl font-serif font-bold gradient-text">{featuredProduct.price}€</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
