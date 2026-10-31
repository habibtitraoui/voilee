import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Amira K.',
    location: 'Paris, France',
    rating: 5,
    text: "La qualité du tissu est incroyable ! C'est doux, léger et ça ne glisse pas. J'ai commandé 3 ensembles et je suis totalement satisfaite. Le packaging est aussi magnifique.",
    avatar: 'A',
    verified: true,
  },
  {
    name: 'Fatima Z.',
    location: 'Bruxelles, Belgique',
    rating: 5,
    text: "Enfin un hijab qui tient toute la journée sans avoir besoin d'épingles ! Les couleurs sont exactement comme sur les photos. Je recommande à toutes mes amies.",
    avatar: 'F',
    verified: true,
  },
  {
    name: 'Sarah M.',
    location: 'Montréal, Canada',
    rating: 5,
    text: "J'ai offert un ensemble à ma sœur et elle a adoré. Le packaging cadeau est sublime et la qualité est au rendez-vous. Livraison rapide même au Canada !",
    avatar: 'S',
    verified: true,
  },
  {
    name: 'Nour H.',
    location: 'Lyon, France',
    rating: 5,
    text: "Ces ensembles ont changé ma routine matinale. Plus besoin de chercher des combinaisons, tout est déjà parfaitement assorti. C'est un gain de temps précieux !",
    avatar: 'N',
    verified: true,
  },
  {
    name: 'Yasmin B.',
    location: 'Genève, Suisse',
    rating: 5,
    text: "Le tissu est respirant et parfait pour toutes les saisons. J'ai essayé beaucoup de marques mais VOILÉE est clairement au-dessus. La qualité premium se sent immédiatement.",
    avatar: 'Y',
    verified: true,
  },
  {
    name: 'Layla R.',
    location: 'Casablanca, Maroc',
    rating: 5,
    text: "Les couleurs sont magnifiques et ne décolorent pas au lavage. Après 6 mois d'utilisation, mes ensembles sont toujours comme neufs. Excellent rapport qualité-prix.",
    avatar: 'L',
    verified: true,
  },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="testimonials" ref={ref} className="relative py-20 lg:py-32 bg-dark overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-champagne-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4"
          >
            Avis Clients
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-serif font-bold text-white mb-6"
          >
            Ce Que Disent Nos{' '}
            <span className="gradient-text">Clientes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 leading-relaxed"
          >
            Plus de 2 500 femmes ont déjà adopté nos ensembles.
            Découvrez leurs témoignages authentiques.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="group relative p-6 lg:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] hover:border-gold/20 transition-all duration-500 hover:bg-white/[0.07]"
            >
              {/* Quote icon */}
              <Quote size={24} className="text-gold/20 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-champagne-500 flex items-center justify-center text-white font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    {testimonial.verified && (
                      <span className="text-[10px] font-medium text-gold/80 bg-gold/10 px-2 py-0.5 rounded-full">
                        Vérifié
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/40">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
