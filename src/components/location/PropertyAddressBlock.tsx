import React, { useState } from 'react';
import { type PropertyAddress } from '../../data/locationData';

interface PropertyAddressProps {
  address: PropertyAddress;
  propertyName: string;
  category: string;
  className?: string;
}

export const PropertyAddressBlock: React.FC<PropertyAddressProps> = ({
  address,
  propertyName,
  category,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address.fullFormatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API not permitted
      const textarea = document.createElement('textarea');
      textarea.value = address.fullFormatted;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className={`space-y-5 ${className}`}>
      {/* 1. Header Hierarchy */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2.5">
          <span className="w-6 h-[1px] bg-gold/70" aria-hidden="true" />
          <span className="font-cinzel text-[10px] tracking-[0.24em] text-gold uppercase font-semibold">
            HOTEL LOCATION
          </span>
        </div>

        <h3 className="font-cormorant text-3xl sm:text-4xl text-ivory font-normal tracking-tight leading-tight">
          {propertyName}
        </h3>

        <div className="flex items-center gap-2 pt-0.5">
          <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold-light/90 font-medium">
            {category}
          </span>
          <span className="text-white/20 text-xs">·</span>
          <span className="font-sans text-[11px] tracking-wider text-sand">
            PIN 442401
          </span>
        </div>
      </div>

      {/* 2. Structured Address Lines */}
      <address className="not-italic p-4 rounded-sm bg-charcoal-surface/60 border border-white/5 space-y-1.5 text-sm sm:text-[15px] font-sans leading-relaxed text-ivory-warm">
        <div className="flex items-start gap-2.5">
          <svg
            className="w-4 h-4 text-gold flex-shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="space-y-0.5">
            <p className="text-ivory font-medium">{address.line1}</p>
            <p className="text-sand">{address.line2}</p>
            <p className="text-gold-light font-medium">{address.road}</p>
            <p className="text-sand">{address.area}</p>
            <p className="text-ivory pt-0.5 font-medium">{address.cityStatePin}</p>
          </div>
        </div>

        {/* Copy Address Utility Action */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[11px] font-sans text-sand/70">
            Convenient Landmark Gateway
          </span>
          <button
            type="button"
            onClick={handleCopyAddress}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans tracking-wider uppercase text-gold hover:text-gold-light bg-gold/5 hover:bg-gold/15 border border-gold/25 rounded-none transition-all duration-200 cursor-pointer"
            aria-label="Copy hotel address to clipboard"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3 text-gold/80" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy Address</span>
              </>
            )}
          </button>
        </div>
      </address>
    </div>
  );
};
