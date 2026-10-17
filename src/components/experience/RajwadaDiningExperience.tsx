import React, { useState, useMemo } from 'react';
import { Container } from '../Container';
import { Section } from '../Section';
import { ScrollReveal } from '../motion/ScrollReveal';
import {
  SIGNATURE_DISHES,
  DINING_CATEGORY_FILTERS,
  type SignatureDishItem,
} from '../../data/diningExperienceData';

export interface RajwadaDiningExperienceProps {
  onExploreMenu?: () => void;
  onOrderFood?: () => void;
  onReserveTable?: () => void;
  cart?: Record<string, number>;
  onUpdateCart?: React.Dispatch<React.SetStateAction<Record<string, number>>> | ((newCart: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)) => void);
  className?: string;
}

/**
 * THE RAJWADA DINING EXPERIENCE
 *
 * Inspired by Qissa's food-focused visual storytelling, confident editorial typography,
 * authentic dish photography, and clear menu/reservation actions — crafted uniquely
 * for Hotel Rajwada Palace's royal pure-vegetarian culinary heritage in Chandrapur.
 */
export const RajwadaDiningExperience: React.FC<RajwadaDiningExperienceProps> = ({
  onExploreMenu,
  onOrderFood,
  onReserveTable,
  cart: externalCart,
  onUpdateCart,
  className = '',
}) => {
  // Category filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'tandoor' | 'mains' | 'biryani-breads' | 'desserts'>('all');

  // Internal fallback cart state if not controlled externally
  const [internalCart, setInternalCart] = useState<Record<string, number>>({});
  const activeCart = externalCart ?? internalCart;

  const updateCartState = (updater: (prev: Record<string, number>) => Record<string, number>) => {
    if (onUpdateCart) {
      if (typeof onUpdateCart === 'function') {
        (onUpdateCart as any)(updater);
      }
    } else {
      setInternalCart(updater);
    }
  };

  const handleAddDish = (id: string) => {
    updateCartState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleRemoveDish = (id: string) => {
    updateCartState((prev) => {
      const next = { ...prev };
      if (next[id] > 1) {
        next[id] -= 1;
      } else {
        delete next[id];
      }
      return next;
    });
  };

  const handleClearCart = () => {
    updateCartState(() => ({}));
  };

  // Filter dishes by active category
  const filteredDishes = useMemo(() => {
    if (activeCategory === 'all') return SIGNATURE_DISHES;
    return SIGNATURE_DISHES.filter((dish) => dish.categorySlug === activeCategory);
  }, [activeCategory]);

  // Calculate cart stats
  const totalItemCount = useMemo(() => {
    return Object.values(activeCart).reduce((sum, count) => sum + count, 0);
  }, [activeCart]);

  const totalCartAmount = useMemo(() => {
    return Object.entries(activeCart).reduce((sum, [id, qty]) => {
      const dish = SIGNATURE_DISHES.find((d) => d.id === id);
      return sum + (dish ? dish.price * qty : 0);
    }, 0);
  }, [activeCart]);

  // Selected dishes list for the summary drawer
  const selectedDishesList = useMemo(() => {
    return Object.entries(activeCart)
      .map(([id, qty]) => {
        const dish = SIGNATURE_DISHES.find((d) => d.id === id);
        return dish ? { ...dish, qty } : null;
      })
      .filter((item): item is (SignatureDishItem & { qty: number }) => item !== null && item.qty > 0);
  }, [activeCart]);

  return (
    <Section
      id="experience"
      variant="surface"
      spacing="lg"
      className={`relative overflow-hidden bg-charcoal-deep text-ivory border-t border-b border-gold/15 ${className}`}
    >
      {/* Background Ambience Layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(199,166,107,0.12),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom_right,rgba(199,166,107,0.15),transparent_70%)]"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        {/* =========================================================================
            1. EDITORIAL SECTION HEADER (Inspired by Qissa's Food-Focused Visual Storytelling)
        ========================================================================= */}
        <div className="mb-12 lg:mb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 pb-8 border-b border-white/5">
            <ScrollReveal variant="fade-up" durationMs={700} className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 sm:w-12 h-[1px] bg-gold/70 origin-left" aria-hidden="true" />
                <span className="font-cinzel text-xs uppercase tracking-[0.28em] text-gold font-medium">
                  THE ART OF DINING
                </span>
                <span className="w-8 sm:w-12 h-[1px] bg-gold/70 origin-right" aria-hidden="true" />
              </div>

              {/* Confident Editorial Headline with Intentional Line Break */}
              <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-ivory tracking-tight leading-[1.08] mb-5">
                A Feast for <br className="hidden sm:inline" />
                <span className="italic font-normal text-gold-light">the Senses.</span>
              </h2>

              {/* Supporting Text matching Elite Master Prompt */}
              <p className="font-sans text-sand text-base sm:text-lg max-w-2xl leading-relaxed">
                Explore the menu at Hotel Rajwada Palace, Chandrapur, and discover your next favourite dish.
              </p>
            </ScrollReveal>

            {/* Quick Action Navigation Cluster */}
            <ScrollReveal variant="fade-up" delayMs={150} durationMs={700} className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreMenu || onOrderFood}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gold text-charcoal-deep font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_4px_24px_rgba(199,166,107,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>EXPLORE THE MENU</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>

              <button
                type="button"
                onClick={onOrderFood}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-transparent text-gold border border-gold/40 font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light active:scale-[0.98] cursor-pointer"
              >
                <span>ORDER FOOD</span>
                <span aria-hidden="true">→</span>
              </button>

              {onReserveTable && (
                <button
                  type="button"
                  onClick={onReserveTable}
                  className="inline-flex items-center justify-center gap-2 px-3 py-3.5 text-sand hover:text-ivory font-sans text-xs uppercase tracking-[0.18em] transition-colors duration-300 cursor-pointer"
                >
                  <span>RESERVE A TABLE</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </ScrollReveal>
          </div>
        </div>

        {/* =========================================================================
            2. ASYMMETRICAL EDITORIAL COMPOSITION:
               LEFT: Dominant Food Visual (~58% Width)
               RIGHT: The Signature Selection & Interactive Ordering (~42% Width)
        ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* -----------------------------------------------------------------------
              LEFT COLUMN: ~58% DESKTOP WIDTH — THE MAIN FOOD VISUAL
          ----------------------------------------------------------------------- */}
          <ScrollReveal
            variant="fade-up"
            delayMs={100}
            durationMs={800}
            className="lg:col-span-7 flex flex-col space-y-6"
          >
            {/* The Main Food Visual Container — Food is the Hero, Clean & Unobstructed */}
            <div className="relative group overflow-hidden rounded-sm border border-gold/25 bg-charcoal-surface shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Primary Image Frame */}
              <div className="relative aspect-[16/11] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="/images/dining/rajwada-dining-feast-hero.jpg"
                  alt="Hotel Rajwada Palace authentic royal vegetarian feast featuring Paneer Tikka, Kadhai Paneer, saffron Veg Biryani, and butter garlic naan"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />

                {/* Minimal Luxury Corner Caption Badge */}
                <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#101317]/85 backdrop-blur-md border border-gold/30 text-[11px] font-cinzel text-gold-light uppercase tracking-[0.2em] shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
                    FROM OUR KITCHEN · RAJWADA PALACE
                  </span>
                </div>

                {/* Fine Frame Border Accent */}
                <div
                  className="absolute inset-0 border border-white/5 pointer-events-none transition-colors duration-500 group-hover:border-gold/30"
                  aria-hidden="true"
                />
              </div>

              {/* Editorial Under-Photo Bar: Pure Vegetarian Assurance */}
              <div className="p-4 sm:p-5 bg-charcoal-surface/90 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  {/* Authentic FSSAI Pure Veg Emblem */}
                  <span className="w-4 h-4 border border-emerald-500 flex items-center justify-center p-0.5 bg-charcoal-deep flex-shrink-0" title="100% Pure Vegetarian">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-cinzel text-xs text-ivory tracking-[0.16em] uppercase font-medium">
                    100% Pure Vegetarian Heritage
                  </span>
                </div>

                <div className="text-xs font-sans text-sand/80 flex items-center gap-3">
                  <span>Clay Tandoor</span>
                  <span className="text-gold/40">·</span>
                  <span>Dum Pukht Basmati</span>
                  <span className="text-gold/40">·</span>
                  <span>Vidarbha Spices</span>
                </div>
              </div>
            </div>

            {/* Editorial Secondary Photographic Vignettes (Inspired by Qissa & Luxury Culinary Magazines) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Supporting Vignette 1: Tandoor Skewers */}
              <div className="group relative overflow-hidden rounded-sm border border-white/10 bg-charcoal-surface/60 hover:border-gold/30 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/dining/dish-paneer-tikka.jpg"
                    alt="Char-grilled Paneer Tikka cubes with roasted bell peppers in clay tandoor"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 bg-[#101317]/85 backdrop-blur-md text-[9px] font-cinzel text-gold-light uppercase tracking-widest border border-gold/20">
                      TANDOOR ROASTED
                    </span>
                  </div>
                </div>
                <div className="p-3.5">
                  <h4 className="font-cormorant text-lg text-ivory font-normal leading-tight">
                    Clay Tandoor Mastercraft
                  </h4>
                  <p className="font-sans text-xs text-sand/80 mt-1 leading-relaxed">
                    Fresh cottage cheese cubes marinated in spiced hung curd, char-grilled to smoky perfection.
                  </p>
                </div>
              </div>

              {/* Supporting Vignette 2: Dum Pukht Saffron Basmati */}
              <div className="group relative overflow-hidden rounded-sm border border-white/10 bg-charcoal-surface/60 hover:border-gold/30 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src="/images/dining/dish-veg-biryani.jpg"
                    alt="Royal Dum Pukht Veg Biryani layered with saffron, caramelized onions, and spices"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 bg-[#101317]/85 backdrop-blur-md text-[9px] font-cinzel text-gold-light uppercase tracking-widest border border-gold/20">
                      ROYAL DUM PUKHT
                    </span>
                  </div>
                </div>
                <div className="p-3.5">
                  <h4 className="font-cormorant text-lg text-ivory font-normal leading-tight">
                    Aromatic Saffron Basmati
                  </h4>
                  <p className="font-sans text-xs text-sand/80 mt-1 leading-relaxed">
                    Slow-cooked royal basmati rice infused with whole cardamom, cinnamon, and farm vegetables.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* -----------------------------------------------------------------------
              RIGHT COLUMN: ~42% DESKTOP WIDTH — THE SIGNATURE DISHES & INTERACTIVE PANEL
          ----------------------------------------------------------------------- */}
          <ScrollReveal
            variant="fade-up"
            delayMs={200}
            durationMs={800}
            className="lg:col-span-5 flex flex-col"
          >
            {/* Panel Title & Context */}
            <div className="mb-6">
              <span className="font-cinzel text-xs text-gold tracking-[0.22em] uppercase block mb-1.5">
                CURATED SELECTION
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl text-ivory font-normal tracking-wide">
                The Signature Selection
              </h3>
              <p className="font-sans text-xs sm:text-sm text-sand mt-1">
                Curated highlights from the verified Rajwada Palace restaurant menu.
              </p>
            </div>

            {/* Category Selector Navigation with Smooth Active Pill */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none border-b border-white/5">
              {DINING_CATEGORY_FILTERS.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-sans tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer rounded-none border ${
                      isActive
                        ? 'bg-gold/15 text-gold-light border-gold font-medium shadow-[0_0_12px_rgba(199,166,107,0.18)]'
                        : 'bg-transparent text-sand border-transparent hover:text-ivory hover:border-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Interactive Dish List (Editorial Qissa-Inspired Presentation) */}
            <div className="space-y-3.5">
              {filteredDishes.map((dish: SignatureDishItem) => {
                const quantity = activeCart[dish.id] || 0;

                return (
                  <div
                    key={dish.id}
                    className={`group relative flex items-center justify-between gap-4 p-3.5 rounded-sm border transition-all duration-300 ${
                      quantity > 0
                        ? 'bg-charcoal-surface/90 border-gold/40 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                        : 'bg-charcoal-surface/50 border-white/5 hover:border-gold/20 hover:bg-charcoal-surface/75'
                    }`}
                  >
                    {/* Left: Thumbnail & Details */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Compact Dish Thumbnail */}
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 overflow-hidden rounded-sm border border-gold/20 bg-charcoal">
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* FSSAI Veg Dot Overlay */}
                        <div className="absolute top-1 left-1 w-3 h-3 border border-emerald-500 bg-charcoal/90 flex items-center justify-center p-[2px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                      </div>

                      {/* Text Information */}
                      <div className="min-w-0 pr-2">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <h4 className="font-cormorant text-lg sm:text-xl font-normal text-ivory tracking-wide leading-tight truncate group-hover:text-gold-light transition-colors">
                            {dish.name}
                          </h4>
                          {dish.portion && (
                            <span className="text-[10px] text-sand uppercase font-sans tracking-wider">
                              ({dish.portion})
                            </span>
                          )}
                        </div>

                        <p className="font-sans text-xs text-sand/80 line-clamp-1 mt-0.5">
                          {dish.description}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-sans text-sm font-semibold text-gold tracking-wide">
                            ₹{dish.price}
                          </span>
                          <span className="text-[10px] text-sand/60 font-sans tracking-wider uppercase">
                            · {dish.categoryLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Add / Stepper Controls */}
                    <div className="flex-shrink-0">
                      {quantity === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAddDish(dish.id)}
                          className="px-3.5 py-1.5 bg-transparent hover:bg-gold text-gold hover:text-charcoal-deep border border-gold/40 hover:border-gold font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer active:scale-95"
                          aria-label={`Add ${dish.name} to order`}
                        >
                          + ADD
                        </button>
                      ) : (
                        <div className="flex items-center border border-gold bg-charcoal-deep shadow-sm">
                          <button
                            type="button"
                            onClick={() => handleRemoveDish(dish.id)}
                            className="w-8 h-8 flex items-center justify-center text-gold hover:text-ivory hover:bg-gold/20 transition-colors duration-150 cursor-pointer font-bold text-sm"
                            aria-label={`Decrease ${dish.name} quantity`}
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-sans text-xs font-semibold text-gold-light select-none">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAddDish(dish.id)}
                            className="w-8 h-8 flex items-center justify-center text-gold hover:text-ivory hover:bg-gold/20 transition-colors duration-150 cursor-pointer font-bold text-sm"
                            aria-label={`Increase ${dish.name} quantity`}
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

            {/* ===================================================================
                ORDER SUMMARY DRAWER / DOCKED CART BAR
            =================================================================== */}
            {totalItemCount > 0 ? (
              <div className="mt-6 p-4 rounded-sm border border-gold/40 bg-gradient-to-r from-charcoal-surface via-charcoal to-charcoal-surface shadow-[0_8px_30px_rgba(199,166,107,0.12)]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-cinzel text-[11px] text-gold tracking-[0.2em] uppercase block font-semibold">
                      YOUR SELECTION
                    </span>
                    <span className="text-xs font-sans text-sand">
                      {totalItemCount} {totalItemCount === 1 ? 'dish selected' : 'dishes selected'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-sand uppercase tracking-wider block">
                      Subtotal
                    </span>
                    <span className="font-sans text-lg font-bold text-gold-light tracking-wide">
                      ₹{totalCartAmount}
                    </span>
                  </div>
                </div>

                {/* Selected Item Badges */}
                <div className="flex flex-wrap gap-1.5 py-2 mb-3 border-t border-b border-white/5">
                  {selectedDishesList.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-gold/10 border border-gold/20 text-[11px] font-sans text-ivory-warm"
                    >
                      <span>{item.name}</span>
                      <span className="text-gold font-semibold">×{item.qty}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOrderFood}
                    className="flex-1 py-3 bg-gold hover:bg-gold-light text-charcoal-deep font-sans text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 shadow-[0_4px_20px_rgba(199,166,107,0.3)] hover:shadow-[0_6px_28px_rgba(199,166,107,0.45)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>VIEW ORDER</span>
                    <span aria-hidden="true">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="px-3 py-3 text-sand hover:text-ivory text-xs font-sans uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer"
                    title="Clear selection"
                  >
                    Reset
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-3.5 rounded-sm border border-white/5 bg-charcoal-surface/40 flex items-center justify-between text-xs text-sand">
                <span className="font-sans">
                  Select dishes above or browse our complete restaurant menu.
                </span>
                <button
                  type="button"
                  onClick={onExploreMenu || onOrderFood}
                  className="text-gold hover:text-gold-light font-medium uppercase tracking-[0.14em] transition-colors duration-200 cursor-pointer ml-2 flex-shrink-0"
                >
                  Browse Menu →
                </button>
              </div>
            )}
          </ScrollReveal>
        </div>

        {/* =========================================================================
            3. TABLE RESERVATIONS & BANQUET ENQUIRY INVITATION BAR
        ========================================================================= */}
        <ScrollReveal
          variant="fade-up"
          delayMs={250}
          durationMs={700}
          className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold bg-gold/5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <span className="font-cinzel text-xs text-gold uppercase tracking-[0.2em] font-medium block">
                Table Reservations & Celebrations
              </span>
              <p className="font-sans text-xs sm:text-sm text-sand mt-0.5">
                Planning an intimate dinner, family feast, or grand celebration in Chandrapur? Reserve your table in advance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {onReserveTable && (
              <button
                type="button"
                onClick={onReserveTable}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-transparent hover:bg-gold/10 text-gold-light hover:text-ivory border border-gold/40 hover:border-gold font-sans text-xs uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer"
              >
                <span>RESERVE A TABLE</span>
                <span aria-hidden="true">→</span>
              </button>
            )}

            <a
              href="tel:+919921019664"
              className="inline-flex items-center gap-2 text-xs font-sans text-sand hover:text-gold uppercase tracking-[0.16em] transition-colors duration-200"
            >
              <span className="text-gold">Call:</span> +91 99210 19664
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
};
