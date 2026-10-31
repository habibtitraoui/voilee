import { useState, type InputHTMLAttributes, type ChangeEvent, type Dispatch, type SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  MapPin,
  CreditCard,
  Lock,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Package,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ShippingForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const initialShipping: ShippingForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  postalCode: '',
  country: 'France',
  phone: '',
};

const initialPayment: PaymentForm = {
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};

const steps = [
  { id: 1, label: 'Livraison', icon: MapPin },
  { id: 2, label: 'Paiement', icon: CreditCard },
  { id: 3, label: 'Récapitulatif', icon: Package },
];

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function Checkout() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, shipping, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [shippingForm, setShippingForm] = useState<ShippingForm>(initialShipping);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(initialPayment);
  const [orderNumber, setOrderNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const resetAndClose = () => {
    closeCheckout();
    setTimeout(() => {
      setStep(1);
      setShippingForm(initialShipping);
      setPaymentForm(initialPayment);
      setIsComplete(false);
      setIsProcessing(false);
    }, 400);
  };

  const isShippingValid =
    shippingForm.email.includes('@') &&
    shippingForm.firstName.trim() !== '' &&
    shippingForm.lastName.trim() !== '' &&
    shippingForm.address.trim() !== '' &&
    shippingForm.city.trim() !== '' &&
    shippingForm.postalCode.trim() !== '';

  const isPaymentValid =
    paymentForm.cardName.trim() !== '' &&
    paymentForm.cardNumber.replace(/\s/g, '').length >= 15 &&
    paymentForm.expiry.length === 5 &&
    paymentForm.cvc.length >= 3;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generated = `VL-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generated);
      setIsProcessing(false);
      setIsComplete(true);
    }, 1800);
  };

  const handleFinish = () => {
    clearCart();
    resetAndClose();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-dark/60 backdrop-blur-sm"
            onClick={!isProcessing ? resetAndClose : undefined}
          />

          <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl my-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Commande"
            >
              {/* Close button */}
              {!isProcessing && (
                <button
                  onClick={resetAndClose}
                  className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-dark/5 hover:bg-dark/10 flex items-center justify-center transition-colors"
                  aria-label="Fermer"
                >
                  <X size={18} className="text-dark/60" />
                </button>
              )}

              {isComplete ? (
                <OrderConfirmation orderNumber={orderNumber} onFinish={handleFinish} total={total} />
              ) : (
                <div className="grid lg:grid-cols-[1.3fr_1fr]">
                  {/* Left: Steps */}
                  <div className="p-6 sm:p-10">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-dark mb-1">
                      Finaliser la commande
                    </h2>
                    <p className="text-sm text-dark/50 mb-8">
                      Paiement 100% sécurisé — vos données sont protégées.
                    </p>

                    {/* Step indicator */}
                    <div className="flex items-center mb-10">
                      {steps.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = step === s.id;
                        const isDone = step > s.id;
                        return (
                          <div key={s.id} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-2">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                  isDone
                                    ? 'bg-gold text-white'
                                    : isActive
                                    ? 'bg-dark text-white'
                                    : 'bg-dark/5 text-dark/30'
                                }`}
                              >
                                {isDone ? <CheckCircle2 size={18} /> : <Icon size={16} />}
                              </div>
                              <span
                                className={`text-[11px] font-medium hidden sm:block ${
                                  isActive || isDone ? 'text-dark' : 'text-dark/30'
                                }`}
                              >
                                {s.label}
                              </span>
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className={`flex-1 h-[2px] mx-2 rounded transition-colors duration-300 ${
                                  step > s.id ? 'bg-gold' : 'bg-dark/5'
                                }`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ShippingStep form={shippingForm} setForm={setShippingForm} />
                          <button
                            disabled={!isShippingValid}
                            onClick={() => setStep(2)}
                            className="w-full mt-8 py-4 bg-dark text-white font-semibold rounded-full hover:bg-dark-light transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-dark"
                          >
                            Continuer vers le Paiement
                          </button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <PaymentStep form={paymentForm} setForm={setPaymentForm} />
                          <div className="flex gap-3 mt-8">
                            <button
                              onClick={() => setStep(1)}
                              className="px-5 py-4 border border-dark/10 rounded-full text-dark/60 hover:text-dark hover:border-dark/30 transition-colors flex items-center gap-1"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              disabled={!isPaymentValid}
                              onClick={() => setStep(3)}
                              className="flex-1 py-4 bg-dark text-white font-semibold rounded-full hover:bg-dark-light transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-dark"
                            >
                              Vérifier la Commande
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ReviewStep shipping={shippingForm} payment={paymentForm} />
                          <div className="flex gap-3 mt-8">
                            <button
                              onClick={() => setStep(2)}
                              disabled={isProcessing}
                              className="px-5 py-4 border border-dark/10 rounded-full text-dark/60 hover:text-dark hover:border-dark/30 transition-colors flex items-center gap-1 disabled:opacity-30"
                            >
                              <ChevronLeft size={18} />
                            </button>
                            <button
                              onClick={handlePlaceOrder}
                              disabled={isProcessing}
                              className="flex-1 py-4 bg-gradient-to-r from-gold to-champagne-400 text-dark font-semibold rounded-full hover:shadow-lg hover:shadow-gold/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                              {isProcessing ? (
                                <>
                                  <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full"
                                  />
                                  Traitement en cours...
                                </>
                              ) : (
                                <>
                                  <Lock size={16} />
                                  Confirmer la Commande — {total.toFixed(2)}€
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Right: Order summary */}
                  <div className="bg-cream p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-dark/5">
                    <h3 className="font-semibold text-dark mb-6">Résumé de la commande</h3>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                      {items.map((item) => (
                        <div key={item.key} className="flex gap-3">
                          <div className="relative flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-14 h-16 object-cover rounded-lg"
                            />
                            <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-dark text-white text-[10px] font-bold flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-dark truncate">
                              {item.product.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span
                                className="w-3 h-3 rounded-full border border-dark/10"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-dark">
                            {(item.product.price * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 border-t border-dark/10 mb-6">
                      <div className="flex justify-between text-sm text-dark/60">
                        <span>Sous-total</span>
                        <span>{subtotal.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between text-sm text-dark/60">
                        <span className="flex items-center gap-1.5">
                          <Truck size={14} /> Livraison
                        </span>
                        <span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)}€`}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-dark pt-2 border-t border-dark/10">
                        <span>Total</span>
                        <span className="gradient-text">{total.toFixed(2)}€</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-dark/40">
                      <ShieldCheck size={16} className="text-gold flex-shrink-0" />
                      Paiement crypté SSL 256-bit. Vos informations sont en sécurité.
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function InputField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-dark/50 mb-1.5 block">{label}</span>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-white text-sm text-dark placeholder-dark/25 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
      />
    </label>
  );
}

function ShippingStep({
  form,
  setForm,
}: {
  form: ShippingForm;
  setForm: Dispatch<SetStateAction<ShippingForm>>;
}) {
  const update = (key: keyof ShippingForm) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <div className="space-y-4">
      <InputField label="Adresse email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={update('email')} />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Prénom" placeholder="Amira" value={form.firstName} onChange={update('firstName')} />
        <InputField label="Nom" placeholder="Khalil" value={form.lastName} onChange={update('lastName')} />
      </div>
      <InputField label="Adresse" placeholder="12 rue des Lilas" value={form.address} onChange={update('address')} />
      <InputField label="Appartement, étage (optionnel)" placeholder="Apt 4B" value={form.apartment} onChange={update('apartment')} />
      <div className="grid grid-cols-2 gap-4">
        <InputField label="Ville" placeholder="Paris" value={form.city} onChange={update('city')} />
        <InputField label="Code postal" placeholder="75001" value={form.postalCode} onChange={update('postalCode')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-medium text-dark/50 mb-1.5 block">Pays</span>
          <select
            value={form.country}
            onChange={(e) => setForm((prev) => ({ ...prev, country: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-white text-sm text-dark focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
          >
            <option>France</option>
            <option>Belgique</option>
            <option>Suisse</option>
            <option>Canada</option>
            <option>Maroc</option>
          </select>
        </label>
        <InputField label="Téléphone (optionnel)" type="tel" placeholder="06 12 34 56 78" value={form.phone} onChange={update('phone')} />
      </div>
    </div>
  );
}

function PaymentStep({
  form,
  setForm,
}: {
  form: PaymentForm;
  setForm: Dispatch<SetStateAction<PaymentForm>>;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 rounded-xl bg-champagne-50 border border-gold/10 mb-2">
        <Lock size={16} className="text-gold flex-shrink-0" />
        <p className="text-xs text-dark/60">
          Vos informations de paiement sont chiffrées et sécurisées.
        </p>
      </div>
      <InputField
        label="Nom sur la carte"
        placeholder="Amira Khalil"
        value={form.cardName}
        onChange={(e) => setForm((prev) => ({ ...prev, cardName: e.target.value }))}
      />
      <label className="block">
        <span className="text-xs font-medium text-dark/50 mb-1.5 block">Numéro de carte</span>
        <div className="relative">
          <input
            value={form.cardNumber}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))
            }
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            className="w-full px-4 py-3 pr-12 rounded-xl border border-dark/10 bg-white text-sm text-dark placeholder-dark/25 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
          />
          <CreditCard size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/25" />
        </div>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-medium text-dark/50 mb-1.5 block">Date d'expiration</span>
          <input
            value={form.expiry}
            onChange={(e) => setForm((prev) => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
            placeholder="MM/AA"
            inputMode="numeric"
            className="w-full px-4 py-3 rounded-xl border border-dark/10 bg-white text-sm text-dark placeholder-dark/25 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
          />
        </label>
        <InputField
          label="CVC"
          placeholder="123"
          inputMode="numeric"
          maxLength={4}
          value={form.cvc}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) }))
          }
        />
      </div>
      <div className="flex items-center gap-3 pt-2 opacity-50">
        <span className="text-[10px] font-bold tracking-wider">VISA</span>
        <span className="text-[10px] font-bold tracking-wider">MASTERCARD</span>
        <span className="text-[10px] font-bold tracking-wider">AMEX</span>
        <span className="text-[10px] font-bold tracking-wider">APPLE PAY</span>
      </div>
    </div>
  );
}

function ReviewStep({ shipping, payment }: { shipping: ShippingForm; payment: PaymentForm }) {
  return (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl border border-dark/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-dark flex items-center gap-2">
            <MapPin size={15} className="text-gold" /> Adresse de livraison
          </h4>
        </div>
        <p className="text-sm text-dark/60 leading-relaxed">
          {shipping.firstName} {shipping.lastName}
          <br />
          {shipping.address} {shipping.apartment && `, ${shipping.apartment}`}
          <br />
          {shipping.postalCode} {shipping.city}, {shipping.country}
          <br />
          {shipping.email}
          {shipping.phone && <> · {shipping.phone}</>}
        </p>
      </div>

      <div className="p-5 rounded-2xl border border-dark/10">
        <h4 className="text-sm font-semibold text-dark flex items-center gap-2 mb-3">
          <CreditCard size={15} className="text-gold" /> Mode de paiement
        </h4>
        <p className="text-sm text-dark/60">
          Carte se terminant par{' '}
          <span className="font-semibold text-dark">
            {payment.cardNumber.slice(-4) || '••••'}
          </span>
          <br />
          Titulaire : {payment.cardName}
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-champagne-50 border border-gold/10 flex items-start gap-3">
        <Truck size={18} className="text-gold flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-dark">Livraison estimée</p>
          <p className="text-xs text-dark/50">3 à 5 jours ouvrables après confirmation</p>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmation({
  orderNumber,
  onFinish,
  total,
}: {
  orderNumber: string;
  onFinish: () => void;
  total: number;
}) {
  return (
    <div className="p-8 sm:p-16 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-champagne-400 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 size={40} className="text-white" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-serif text-3xl font-bold text-dark mb-3"
      >
        Merci pour votre commande !
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-dark/60 mb-8 max-w-md mx-auto leading-relaxed"
      >
        Votre commande a été confirmée avec succès. Un email de confirmation
        vient de vous être envoyé avec tous les détails.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="inline-flex flex-col items-center gap-1 px-8 py-5 rounded-2xl bg-cream border border-dark/5 mb-8"
      >
        <span className="text-xs text-dark/40 uppercase tracking-wider">Numéro de commande</span>
        <span className="text-2xl font-serif font-bold gradient-text">{orderNumber}</span>
        <span className="text-sm text-dark/50 mt-2">
          Total payé : <span className="font-semibold text-dark">{total.toFixed(2)}€</span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <button
          onClick={onFinish}
          className="px-8 py-4 bg-dark text-white font-semibold rounded-full hover:bg-dark-light transition-all"
        >
          Continuer mes Achats
        </button>
      </motion.div>
    </div>
  );
}
