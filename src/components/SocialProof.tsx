import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

const logos = [
  { name: 'ELLE', text: 'ELLE' },
  { name: 'VOGUE', text: 'VOGUE' },
  { name: 'HARPER\'S', text: "HARPER'S" },
  { name: 'MARIE CLAIRE', text: 'MARIE CLAIRE' },
  { name: 'COSMOPOLITAN', text: 'COSMO' },
  { name: 'GRAZIA', text: 'GRAZIA' },
];

const stats = [
  { value: '25K+', label: 'Ensembles Vendus' },
  { value: '4.9', label: 'Note Moyenne' },
  { value: '98%', label: 'Clientes Satisfaites' },
  { value: '35+', label: 'Pays Livrés' },
];

export default function SocialProof() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured In */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-dark/40 mb-8">
            Vu dans les médias
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {logos.map((logo, i) => (
              <motion.span
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-xl lg:text-2xl font-serif font-bold text-dark/15 hover:text-dark/30 transition-colors duration-500 cursor-default"
              >
                {logo.text}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent my-12" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className="text-center group"
            >
              <p className="text-3xl lg:text-4xl font-serif font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-sm text-dark/50 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
