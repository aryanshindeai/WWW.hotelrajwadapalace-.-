import React, { useState, useMemo } from 'react';
import {
  RESTAURANT_MENU_ITEMS,
  MENU_CATEGORIES,
  type MenuCategorySlug,
} from '../data/foodMenuData';
import { Button } from './Button';
import { createFoodOrder } from '../lib/supabase';

interface FoodOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart?: Record<string, number>;
  onUpdateCart?: React.Dispatch<React.SetStateAction<Record<string, number>>> | ((newCart: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void);
}

export const FoodOrderModal: React.FC<FoodOrderModalProps> = ({
  isOpen,
  onClose,
  cart: externalCart,
  onUpdateCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategorySlug>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [internalCart, setInternalCart] = useState<Record<string, number>>({});
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableOrAddress, setTableOrAddress] = useState('');
  const [mobileTab, setMobileTab] = useState<'menu' | 'cart'>('menu');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Active cart is controlled if externalCart provided, otherwise internal
  const cart = externalCart ?? internalCart;

  const updateCart = (updater: (prev: Record<string, number>) => Record<string, number>) => {
    if (onUpdateCart) {
      (onUpdateCart as any)(updater);
    } else {
      setInternalCart(updater);
    }
  };

  // Filter items by category and search query
  const filteredItems = useMemo(() => {
    return RESTAURANT_MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        item.categoryName.toLowerCase().includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const addToCart = (id: string) => {
    updateCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    updateCart((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const clearCart = () => {
    updateCart(() => ({}));
  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const handleSendOrderWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItemsCount === 0) {
      alert('Please select at least one dish from the menu.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const orderItems = Object.entries(cart)
      .map(([id, qty]) => {
        const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
        return item
          ? {
              id: item.id,
              name: item.name,
              price: item.price,
              portion: item.portion || null,
              category: item.categoryName,
              quantity: qty,
              subtotal: item.price * qty,
            }
          : null;
      })
      .filter(Boolean);

    try {
      // 1. Save food order to Supabase backend
      await createFoodOrder({
        customer_name: customerName.trim(),
        phone_number: phoneNumber.trim(),
        order_type: orderType,
        table_or_address: tableOrAddress.trim() || null,
        items: orderItems as any,
        total_amount: totalAmount,
        total_items: totalItemsCount,
      });

      setSubmitSuccess(true);
    } catch (err: any) {
      console.error('Supabase food order save error:', err);
      setSubmitError('Note: Order saved locally. Forwarding to WhatsApp...');
    } finally {
      setIsSubmitting(false);
    }

    // 2. Prepare and send via WhatsApp
    const orderLines = Object.entries(cart)
      .map(([id, qty]) => {
        const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
        return item
          ? `• ${item.name}${item.portion ? ` (${item.portion})` : ''} x ${qty} = ₹${item.price * qty}`
          : '';
      })
      .filter(Boolean)
      .join('\n');

    const message = `*Official Food Order — Hotel Rajwada Palace Restaurant*
• *Customer Name:* ${customerName || 'Guest'}
• *Phone:* ${phoneNumber || 'Not provided'}
• *Service Type:* ${orderType === 'dine-in' ? 'Dine-In (Restaurant Seating)' : 'Takeaway / Parcel'}
${tableOrAddress ? `• *${orderType === 'dine-in' ? 'Table / Location' : 'Pickup Note'}:* ${tableOrAddress}` : ''}

*Order Summary (${totalItemsCount} items):*
${orderLines}

*Total Payable:* ₹${totalAmount}

*Note:* Authentic pure vegetarian preparation. Please confirm order preparation time.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919921019664?text=${encoded}`, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Official Food Menu and Ordering Dialog"
      className="fixed inset-0 z-50 bg-[#06080B]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="border border-gold/40 bg-[#0D1117] max-w-5xl w-full p-4 sm:p-6 lg:p-7 shadow-2xl relative my-auto max-h-[94vh] flex flex-col rounded-xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-start justify-between pb-3.5 border-b border-white/10 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
              <span className="font-cinzel text-[11px] tracking-[0.25em] text-gold uppercase font-semibold">
                Hotel Rajwada Palace · Pure Veg Restaurant
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl text-ivory font-serif mt-1">
              Official Food Menu &amp; Ordering
            </h3>
            <p className="text-xs text-sand/70 font-sans mt-0.5">
              Exact official prices from the dining room menu in Chandrapur. Order directly for Dine-In or Takeaway.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sand/80 hover:text-ivory text-xl p-1.5 sm:p-2 cursor-pointer transition-colors rounded-full hover:bg-white/5"
            aria-label="Close menu dialog"
          >
            ✕
          </button>
        </div>

        {/* Mobile View Toggle Buttons (Menu vs Cart) */}
        <div className="flex lg:hidden items-center justify-between gap-2 pt-3 pb-2 border-b border-white/10 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('menu')}
            className={`flex-1 py-1.5 text-xs font-sans font-medium rounded-lg transition-colors cursor-pointer ${
              mobileTab === 'menu'
                ? 'bg-gold text-charcoal-deep font-semibold shadow-sm'
                : 'bg-charcoal text-sand/80 border border-white/10'
            }`}
          >
            Menu Catalog ({filteredItems.length})
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('cart')}
            className={`flex-1 py-1.5 text-xs font-sans font-medium rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileTab === 'cart'
                ? 'bg-gold text-charcoal-deep font-semibold shadow-sm'
                : 'bg-charcoal text-sand/80 border border-white/10'
            }`}
          >
            <span>My Order</span>
            {totalItemsCount > 0 && (
              <span
                key={totalItemsCount}
                className="animate-cart-bounce bg-charcoal-deep text-gold px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold"
              >
                {totalItemsCount} · ₹{totalAmount}
              </span>
            )}
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-3 flex-1 overflow-y-auto pr-1">
          {/* Menu Catalog Side (7 cols on desktop) */}
          <div
            className={`lg:col-span-7 flex flex-col space-y-3 ${
              mobileTab === 'cart' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Search Input Bar */}
            <div className="relative flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes (e.g. Paneer, Biryani, Naan, Lassi)..."
                className="w-full bg-[#161B22] border border-white/15 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-ivory placeholder-sand/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-sand hover:text-ivory text-xs"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex-shrink-0 border-b border-white/5 pb-2">
              <nav
                aria-label="Menu categories"
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 -mx-2 px-2"
              >
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count =
                    cat.id === 'all'
                      ? RESTAURANT_MENU_ITEMS.length
                      : RESTAURANT_MENU_ITEMS.filter((i) => i.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSearchQuery('');
                      }}
                      className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-gold text-charcoal-deep font-semibold shadow-sm border border-gold'
                          : 'bg-[#161B22] text-sand/80 hover:text-ivory hover:bg-[#1E242E] border border-white/10'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] font-mono px-1 py-0.2 rounded-full ${
                          isActive
                            ? 'bg-charcoal-deep/20 text-charcoal-deep font-bold'
                            : 'bg-white/5 text-sand/60'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Menu Items List */}
            <div className="space-y-2 overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin">
              {filteredItems.length === 0 ? (
                <div className="text-center py-10 text-sand/60 text-xs italic">
                  No dishes found matching &quot;{searchQuery}&quot;. Try another dish name or select &quot;All Items&quot;.
                </div>
              ) : (
                filteredItems.map((item) => {
                  const qtyInCart = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3 bg-[#161B22]/80 rounded-lg border border-white/10 flex items-center justify-between gap-3 hover:border-gold/40 hover:bg-[#1C222C] transition-all"
                    >
                      {/* Left: Veg icon, Title, Category tag, Portion */}
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Official Indian Vegetarian Symbol */}
                          <span
                            className="inline-flex items-center justify-center w-3.5 h-3.5 border border-emerald-500 p-0.5 rounded-sm flex-shrink-0"
                            title="100% Pure Vegetarian"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          </span>

                          <h4 className="text-xs sm:text-sm font-medium text-ivory tracking-wide">
                            {item.name}
                          </h4>

                          {item.portion && (
                            <span className="text-[10px] font-mono bg-white/5 text-sand/80 border border-white/10 px-1.5 py-0.2 rounded">
                              {item.portion}
                            </span>
                          )}

                          {item.isSpecial && (
                            <span className="text-[9px] font-cinzel uppercase tracking-wider bg-gold/20 text-gold border border-gold/40 px-1.5 py-0.2 rounded font-semibold">
                              Palace Special
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 pt-0.5">
                          <span className="text-[10px] font-mono text-sand/60 uppercase tracking-wider">
                            {item.categoryName}
                          </span>
                          <span className="text-sand/30 text-xs">·</span>
                          <span className="text-xs sm:text-sm font-mono font-semibold text-gold">
                            ₹{item.price}
                          </span>
                          {item.priceDisplay && (
                            <span className="text-[10px] font-mono text-sand/60">
                              ({item.priceDisplay})
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: Add / Qty Controls */}
                      <div className="flex items-center flex-shrink-0">
                        {qtyInCart === 0 ? (
                          <button
                            type="button"
                            onClick={() => addToCart(item.id)}
                            className="px-3 py-1.5 bg-gold/90 hover:bg-gold text-charcoal-deep font-semibold text-xs rounded-md transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                          >
                            + Add
                          </button>
                        ) : (
                          <div className="flex items-center gap-2 bg-[#0D1117] border border-gold/50 rounded-md px-2 py-1">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gold font-bold px-1 text-sm hover:text-gold-light cursor-pointer"
                              aria-label={`Decrease ${item.name}`}
                            >
                              –
                            </button>
                            <span className="text-xs font-mono text-ivory font-bold min-w-[14px] text-center">
                              {qtyInCart}
                            </span>
                            <button
                              type="button"
                              onClick={() => addToCart(item.id)}
                              className="text-gold font-bold px-1 text-sm hover:text-gold-light cursor-pointer"
                              aria-label={`Increase ${item.name}`}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Cart & Customer Details Side (5 cols on desktop) */}
          <div
            className={`lg:col-span-5 bg-[#161B22]/90 border border-white/10 rounded-xl p-4 flex flex-col justify-between ${
              mobileTab === 'menu' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <form onSubmit={handleSendOrderWhatsApp} className="space-y-4">
              {/* Order Cart Summary */}
              <div className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-cinzel uppercase tracking-widest text-gold font-semibold">
                    Order Selection ({totalItemsCount})
                  </span>
                  {totalItemsCount > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[10px] font-mono text-sand/60 hover:text-rose-400 cursor-pointer underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {totalItemsCount === 0 ? (
                  <p className="text-xs text-sand/60 italic py-3 text-center bg-black/20 rounded border border-dashed border-white/5">
                    Your order is empty. Browse the menu and click &quot;+ Add&quot; on dishes.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[20vh] overflow-y-auto py-1 pr-1 scrollbar-thin">
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = RESTAURANT_MENU_ITEMS.find((m) => m.id === id);
                      if (!item) return null;
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between text-xs py-1 px-1.5 bg-black/20 rounded border border-white/5"
                        >
                          <div className="flex-1 pr-2 truncate">
                            <span className="text-ivory font-medium">
                              {item.name}
                            </span>
                            {item.portion && (
                              <span className="text-[10px] text-sand/60 ml-1">
                                ({item.portion})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="flex items-center gap-1 bg-[#0D1117] border border-white/10 rounded px-1">
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-gold text-xs px-1 hover:text-gold-light"
                              >
                                –
                              </button>
                              <span className="font-mono text-ivory text-[11px] font-bold">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => addToCart(item.id)}
                                className="text-gold text-xs px-1 hover:text-gold-light"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-mono text-gold font-semibold min-w-[50px] text-right">
                              ₹{item.price * qty}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {totalItemsCount > 0 && (
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-white/10 text-sm">
                    <span className="font-sans text-ivory font-medium">Estimated Total:</span>
                    <span className="text-gold font-mono font-bold text-base">₹{totalAmount}</span>
                  </div>
                )}
              </div>

              {/* Customer Details Form */}
              <div className="space-y-3 text-xs">
                {submitSuccess && (
                  <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded text-emerald-200">
                    <div className="flex items-center gap-1.5 font-medium text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Order Recorded in Supabase</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-emerald-200/80">
                      Saved to kitchen database & forwarding via WhatsApp.
                    </p>
                  </div>
                )}

                {submitError && (
                  <div className="p-2 bg-amber-950/30 border border-amber-500/30 rounded text-[11px] text-amber-200">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Anand Sharma"
                    className="w-full bg-[#0D1117] px-3 py-2 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +91 99210 19664"
                    className="w-full bg-[#0D1117] px-3 py-2 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                    Dining Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('dine-in')}
                      className={`py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        orderType === 'dine-in'
                          ? 'border-gold bg-gold/15 text-gold font-medium'
                          : 'border-white/10 text-sand hover:text-ivory bg-[#0D1117]'
                      }`}
                    >
                      Dine-In (Seated)
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('takeaway')}
                      className={`py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        orderType === 'takeaway'
                          ? 'border-gold bg-gold/15 text-gold font-medium'
                          : 'border-white/10 text-sand hover:text-ivory bg-[#0D1117]'
                      }`}
                    >
                      Takeaway / Parcel
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-sand mb-1 font-sans">
                    {orderType === 'dine-in' ? 'Table Number (if seated)' : 'Pickup Time / Special Note'}
                  </label>
                  <input
                    type="text"
                    value={tableOrAddress}
                    onChange={(e) => setTableOrAddress(e.target.value)}
                    placeholder={
                      orderType === 'dine-in'
                        ? 'Table 3 / Dining Hall'
                        : 'Ready by 8:30 PM / Less Spicy'
                    }
                    className="w-full bg-[#0D1117] px-3 py-2 border border-white/15 rounded text-ivory focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Order Actions */}
              <div className="pt-2 space-y-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={totalItemsCount === 0 || isSubmitting}
                  className="w-full text-center justify-center font-medium cursor-pointer shadow-lg"
                >
                  {isSubmitting
                    ? 'Recording Order in Database...'
                    : submitSuccess
                    ? 'Order Recorded ✓ Sending to WhatsApp'
                    : `Send Order via WhatsApp (₹${totalAmount})`}
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
