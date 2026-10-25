import React from 'react';
import { getWhatsAppGeneralInquiryUrl } from '../../lib/whatsapp';

interface ContactActionsProps {
  phoneDisplay: string;
  phoneRaw: string;
  directionsUrl: string;
  whatsappUrl?: string;
  className?: string;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  phoneDisplay: _phoneDisplay,
  phoneRaw,
  directionsUrl,
  whatsappUrl = getWhatsAppGeneralInquiryUrl(),
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch gap-3 ${className}`}>
      {/* 1. Primary Action: GET DIRECTIONS ↗ */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-gold hover:bg-gold-light active:bg-gold-muted text-charcoal-deep font-sans text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_4px_20px_rgba(199,166,107,0.3)] hover:shadow-[0_6px_28px_rgba(199,166,107,0.45)] cursor-pointer text-center whitespace-nowrap rounded-none"
        aria-label="Get directions to Hotel Rajwada Palace on Google Maps"
      >
        <span>GET DIRECTIONS</span>
        <span aria-hidden="true" className="font-bold text-sm">↗</span>
      </a>

      {/* 2. Secondary Action: CALL THE HOTEL */}
      <a
        href={`tel:${phoneRaw}`}
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-transparent hover:bg-white/[0.06] text-ivory hover:text-gold border border-white/20 hover:border-gold font-sans text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer text-center whitespace-nowrap rounded-none"
        aria-label="Call Hotel Rajwada Palace reception"
      >
        <svg
          className="w-3.5 h-3.5 text-gold flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <span>CALL THE HOTEL</span>
      </a>

      {/* 3. Tertiary Action: WHATSAPP US */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 font-sans text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer text-center whitespace-nowrap rounded-none"
        aria-label="Chat with Hotel Rajwada Palace on WhatsApp"
      >
        <svg
          className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.187-2.59-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.073.043.419-.101.824z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.309A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.155-.494-4.425-1.344l-.317-.212-2.967.78.792-2.894-.233-.37A8.22 8.22 0 013.75 12c0-4.549 3.701-8.25 8.25-8.25 4.548 0 8.25 3.701 8.25 8.25 0 4.548-3.702 8.25-8.25 8.25z" />
        </svg>
        <span>WHATSAPP US</span>
      </a>
    </div>
  );
};
