import { Heart } from 'lucide-react';

const footerLinks = {
  boutique: [
    { label: 'Nouvelle Collection', href: '#collection' },
    { label: 'Best-Sellers', href: '#collection' },
    { label: 'Nos Offres', href: '#collection' },
    { label: 'Carte Cadeau', href: '#collection' },
  ],
  aide: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Guide des Tailles', href: '#' },
    { label: 'Livraison & Retours', href: '#' },
    { label: 'Nous Contacter', href: '#' },
  ],
  societe: [
    { label: 'Notre Histoire', href: '#' },
    { label: 'Engagement Éco', href: '#' },
    { label: 'Mentions Légales', href: '#' },
    { label: 'Politique de Confidentialité', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-champagne-400 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">V</span>
              </div>
              <span className="font-serif text-xl font-bold tracking-wide">VOILÉE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Des ensembles de hijab premium conçus pour sublimer votre style au quotidien.
              L'élégance redéfinie pour la femme moderne.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-[18px] h-[18px] text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-[18px] h-[18px] text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold/20 hover:border-gold/30 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-[18px] h-[18px] text-white/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Boutique
            </h4>
            <ul className="space-y-3">
              {footerLinks.boutique.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Aide */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Aide
            </h4>
            <ul className="space-y-3">
              {footerLinks.aide.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/40 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white/80 mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-white/40 mb-4">
              Recevez nos offres exclusives et nos nouveautés en avant-première.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold/40 transition-colors"
                aria-label="Email for newsletter"
              />
              <button className="px-5 py-3 rounded-full bg-gradient-to-r from-gold to-champagne-400 text-dark text-sm font-semibold hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 VOILÉE. Tous droits réservés.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Fait avec <Heart size={12} className="text-rose-400 fill-rose-400" /> pour les femmes du monde entier
          </p>
          <div className="flex gap-4">
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">VISA</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">MASTERCARD</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">PAYPAL</span>
            <span className="text-xs text-white/30 hover:text-white/50 cursor-pointer transition-colors">APPLE PAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
