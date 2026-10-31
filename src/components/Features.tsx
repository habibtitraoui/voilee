import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Gem, Leaf, Palette, Shield, Truck, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: Gem,
    title: 'Tissus Premium',
    description: 'Sélectionnés parmi les meilleurs fournisseurs mondiaux pour un toucher soyeux et une tenue parfaite.',
  },
  {
    icon: Palette,
    title: 'Design Exclusif',
    description: 'Chaque ensemble est conçu par nos stylistes pour des combinaisons de couleurs harmonieuses et tendance.',
  },
  {
    icon: Leaf,
    title: 'Éco-Responsable',
    description: 'Produits avec des matériaux durables et un processus respectueux de l\'environnement.',
  },
  {
    icon: Shield,
    title: 'Qualité Garantie',
    description: 'Chaque pièce est soigneusement inspectée pour vous offrir une qualité irréprochable.',
  },
  {
    icon: Truck,
    title: 'Livraison Express',
    description: 'Expédition rapide dans le monde entier avec suivi en temps réel de votre commande.',
  },
  {
    icon: RefreshCw,
    title: 'Retour Gratuit',
    description: 'Satisfaite ou remboursée sous 30 jours. Essayez sans risque.',
  },
];

export default function Features() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="features" ref={ref} className="relative py-20 lg:py-32 bg-cream overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-champagne-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4"
          >
            Pourquoi Nous Choisir
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-serif font-bold text-dark mb-6"
          >
            L'Excellence dans{' '}
            <span className="gradient-text">Chaque Détail</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-dark/60 leading-relaxed"
          >
            Nous mettons tout notre savoir-faire au service de votre élégance,
            avec des ensembles pensés dans les moindres détails.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 hover:border-gold/20 transition-all duration-500 hover:shadow-xl hover:shadow-gold/5 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-champagne-50 to-champagne-100 flex items-center justify-center mb-6 group-hover:from-gold/10 group-hover:to-champagne-200 transition-all duration-500">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="text-lg font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-sm text-dark/55 leading-relaxed">{feature.description}</p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/0 to-champagne-200/0 group-hover:from-gold/[0.03] group-hover:to-champagne-200/[0.05] transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
