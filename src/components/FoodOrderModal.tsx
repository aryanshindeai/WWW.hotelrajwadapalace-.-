import React, { useState } from 'react';
import { RESTAURANT_MENU_ITEMS } from '../data/foodMenuData';
import { Button } from './Button';

interface FoodOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodOrderModal: React.FC<FoodOrderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrAddress, setTableOrAddress] = useState('');

  if (!isOpen) return null;

  const filteredItems =
    selectedCategory === 'all'
      ? RESTAURANT_MENU_ITEMS
      : RESTAURANT_MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleSendOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItemsCount === 0) {
      alert('Please add at least one item to your order.');
      return;
    }

    const orderLines = Object.entries(cart)
      .map(([id, qty]) => {
        const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
        return item ? `• ${item.name} x ${qty} = ₹${item.price * qty}` : '';
      })
      .filter(Boolean)
      .join('\n');

    const message = `*Food Order Enquiry — Hotel Rajwada Palace Restaurant*
• *Customer Name:* ${customerName || 'Customer'}
• *Phone:* ${phoneNumber || 'Not provided'}
• *Order Type:* ${orderType === 'dine-in' ? 'Dine-In at Restaurant' : 'Takeaway / Parcel'}
${tableOrAddress ? `• *Table / Note:* ${tableOrAddress}` : ''}

*Order Summary:*
${orderLines}

*Estimated Total:* ₹${totalAmount}

Please confirm preparation time and order acceptance.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919921019664?text=${encoded}`, '_blank');
  };

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Main Course' },
    { id: 'breads', label: 'Tandoori Breads' },
    { id: 'rice', label: 'Biryani & Rice' },
    { id: 'desserts', label: 'Desserts & Drinks' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-charcoal-deep/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn"
    >
      <div className="border border-gold/40 bg-charcoal-surface max-w-4xl w-full p-4 sm:p-6 lg:p-8 shadow-2xl relative my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <span className="font-cinzel text-xs tracking-[0.25em] text-gold uppercase block">
              Hotel Rajwada Palace Restaurant
            </span>
            <h3 className="text-xl sm:text-2xl text-ivory-light font-serif mt-0.5">
              Food Menu &amp; Ordering
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sand/80 hover:text-ivory text-xl p-2 cursor-pointer transition-colors"
            aria-label="Close menu dialog"
          >
            ✕
          </button>
        </div>

        {/* Content grid: Menu list (left) + Order Summary (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 flex-1 overflow-y-auto pr-1">
          {/* Menu items side (8 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-gold text-charcoal-deep font-semibold shadow-sm'
                      : 'bg-charcoal text-sand/80 hover:text-ivory border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu List */}
            <div className="space-y-3 overflow-y-auto max-h-[48vh] pr-2">
              {filteredItems.map((item) => {
                const qtyInCart = cart[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className="p-3 bg-charcoal/70 border border-white/5 flex items-start justify-between gap-4 hover:border-gold/30 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" title="Pure Veg" />
                        <h4 className="text-sm font-medium text-ivory">{item.name}</h4>
                        {item.isPopular && (
                          <span className="text-[10px] bg-gold/20 text-gold-light px-1.5 py-0.5 rounded uppercase font-mono">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-sand/70 font-light leading-relaxed">
                        {item.description}
                      </p>
                      <span className="text-xs font-mono font-medium text-gold block pt-0.5">
                        ₹{item.price}
                      </span>
                    </div>

                    {/* Add / Qty buttons */}
                    <div className="flex items-center flex-shrink-0 pt-1">
                      {qtyInCart === 0 ? (
                        <button
                          type="button"
                          onClick={() => addToCart(item.id)}
                          className="px-3 py-1.5 bg-gold/90 hover:bg-gold text-charcoal-deep font-medium text-xs rounded transition-colors"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-charcoal-surface border border-gold/40 rounded px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-gold font-bold px-1.5 text-xs hover:text-gold-light"
                          >
                            –
                          </button>
                          <span className="text-xs font-mono text-ivory font-bold">{qtyInCart}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item.id)}
                            className="text-gold font-bold px-1.5 text-xs hover:text-gold-light"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart & Customer details side (5 cols on desktop) */}
          <div className="lg:col-span-5 bg-charcoal/90 border border-white/10 p-4 flex flex-col justify-between">
            <form onSubmit={handleSendOrderWhatsApp} className="space-y-4">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-cinzel uppercase tracking-widest text-gold block mb-1">
                  Your Order Selection
                </span>
                {totalItemsCount === 0 ? (
                  <p className="text-xs text-sand/60 italic py-2">
                    No items selected yet. Click &quot;+ Add&quot; on dishes to start.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[18vh] overflow-y-auto py-1">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between text-xs text-ivory-warm">
                          <span>
                            {item.name} × {qty}
                          </span>
                          <span className="font-mono text-gold">₹{item.price * qty}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {totalItemsCount > 0 && (
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/10 font-bold text-sm text-ivory">
                    <span>Total:</span>
                    <span className="text-gold font-mono">₹{totalAmount}</span>
                  </div>
                )}
              </div>

              {/* Customer inputs */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-charcoal-deep px-3 py-2 border border-white/15 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +91 99210 19664"
                    className="w-full bg-charcoal-deep px-3 py-2 border border-white/15 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                    Service Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`py-1.5 text-xs rounded border transition-colors ${
                        orderType === 'dine-in'
                          ? 'border-gold bg-gold/15 text-gold font-medium'
                          : 'border-white/10 text-sand hover:text-ivory'
                      }`}
                    >
                      Dine-In
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-1.5 text-xs rounded border transition-colors ${
                        orderType === 'takeaway'
                          ? 'border-gold bg-gold/15 text-gold font-medium'
                          : 'border-white/10 text-sand hover:text-ivory'
                      }`}
                    >
                      Takeaway / Parcel
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1">
                    {orderType === 'dine-in' ? 'Table Number (if seated)' : 'Pickup Time Note'}
                  </label>
                  <input
                    type="text"
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    placeholder={orderType === 'dine-in' ? 'Table 4 / Dining Hall' : 'Ready by 8:30 PM'}
                    className="w-full bg-charcoal-deep px-3 py-2 border border-white/15 text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={totalItemsCount === 0}
                  className="w-full text-center justify-center font-medium"
                >
                  Send Order via WhatsApp (₹{totalAmount})
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  as="a"
                  href="tel:+919921019664"
                  className="w-full text-center justify-center text-xs"
                >
                  Call Restaurant Desk: 099210 19664
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
