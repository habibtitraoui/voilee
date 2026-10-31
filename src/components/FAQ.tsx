import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Quels tissus utilisez-vous pour vos ensembles ?',
    answer: 'Nous utilisons exclusivement des tissus premium comme le jersey premium, le mousseline de soie, et le crêpe de haute qualité. Chaque tissu est sélectionné pour sa douceur, sa respirabilité et sa durabilité. Nos matériaux sont certifiés OEKO-TEX Standard 100.',
  },
  {
    question: 'Quelle est la taille de vos hijabs ?',
    answer: 'Nos hijabs mesurent en standard 180cm x 70cm pour une couverture optimale et un drappé élégant. Le sous-hijab est en taille unique extensible qui s\'adapte à toutes les morphologies grâce à son élasticité confortable.',
  },
  {
    question: 'Combien de temps prend la livraison ?',
    answer: 'La livraison standard prend 3-5 jours ouvrables en France métropolitaine. La livraison express est disponible en 24-48h. Pour l\'international, comptez 5-10 jours ouvrables selon la destination. Le suivi est inclus pour toutes les commandes.',
  },
  {
    question: 'Puis-je retourner mon ensemble si je ne suis pas satisfaite ?',
    answer: 'Absolument ! Nous offrons une garantie satisfaite ou remboursée de 30 jours. Si l\'ensemble ne vous convient pas, retournez-le dans son emballage d\'origine pour un remboursement complet ou un échange. Les frais de retour sont pris en charge par VOILÉE.',
  },
  {
    question: 'Comment entretenir mes hijabs ?',
    answer: 'Nos hijabs sont faciles à entretenir. Lavage en machine à 30°C en cycle délicat, pas de sèche-linge. Repassage à basse température si nécessaire. Le tissu anti-froissement réduit considérablement le besoin de repassage. Chaque ensemble est livré avec une carte d\'entretien détaillée.',
  },
  {
    question: 'Proposez-vous des ensembles personnalisés ?',
    answer: 'Oui ! Pour toute commande de plusieurs ensembles, vous pouvez demander des combinaisons de couleurs personnalisées. Contactez-nous par email ou Instagram pour discuter de vos préférences et nous créerons un ensemble unique rien que pour vous.',
  },
  {
    question: 'Offrez-vous la livraison gratuite ?',
    answer: 'Oui ! La livraison standard est offerte pour toutes les commandes de 60€ et plus en France métropolitaine. En dessous de ce montant, des frais de livraison de 4,90€ s\'appliquent. Pour l\'international, la livraison est offerte à partir de 75€ d\'achat.',
  },
];

function AccordionItem({ faq, isOpen, toggle, index }: {
  faq: typeof faqs[0];
  isOpen: boolean;
  toggle: () => void;
  index: number;
}) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`border-b border-dark/5 transition-colors duration-300 ${isOpen ? 'bg-cream/50' : ''}`}
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-6 px-2 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base lg:text-lg font-semibold text-dark pr-8 group-hover:text-gold transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={20} className={`transition-colors ${isOpen ? 'text-gold' : 'text-dark/30'}`} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-6 text-dark/55 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="faq" ref={ref} className="relative py-20 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-4"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl lg:text-5xl font-serif font-bold text-dark mb-6"
          >
            Questions{' '}
            <span className="gradient-text">Fréquentes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-dark/60 leading-relaxed"
          >
            Tout ce que vous devez savoir avant de passer commande.
          </motion.p>
        </div>

        {/* Accordion */}
        <div className="rounded-2xl border border-dark/5 overflow-hidden">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              toggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
