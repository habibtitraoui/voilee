import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-cream">
        <Navbar />
        <main>
          <Hero />
          <SocialProof />
          <Features />
          <ProductShowcase />
          <Benefits />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <CartDrawer />
        <Checkout />
      </div>
    </CartProvider>
  );
}
