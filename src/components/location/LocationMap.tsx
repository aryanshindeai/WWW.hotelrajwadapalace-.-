import React, { useState } from 'react';

interface LocationMapProps {
  embedQuery: string;
  directionsUrl: string;
  className?: string;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  embedQuery,
  directionsUrl,
  className = '',
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Standard Google Maps embed
  const embedUrl = `https://maps.google.com/maps?q=${embedQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div
      className={`relative w-full h-[420px] sm:h-[480px] lg:h-full lg:min-h-[500px] bg-charcoal-deep rounded-sm border border-gold/25 overflow-hidden group shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Fallback & Loading Skeleton */}
      <div
        className={`absolute inset-0 bg-charcoal-surface flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700 z-10 ${
          iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={iframeLoaded}
      >
        <span className="font-cinzel text-xs text-gold tracking-widest uppercase mb-2 animate-pulse">
          Loading Property Map
        </span>
        <p className="text-xs text-sand font-sans max-w-xs mb-4">
          Hotel Rajwada Palace, Near Major Gate, Durgapur Road, Chandrapur
        </p>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gold hover:text-gold-light border-b border-gold/40 hover:border-gold pb-0.5 tracking-wider uppercase font-sans"
        >
          Open Directly in Google Maps ↗
        </a>
      </div>

      {/* Styled Embed iframe with lazy loading & full interaction */}
      <iframe
        title="Hotel Rajwada Palace Location Map"
        src={embedUrl}
        width="100%"
        height="100%"
        loading="lazy"
        onLoad={() => setIframeLoaded(true)}
        className="w-full h-full border-0 filter contrast-[1.03] brightness-[0.92] transition-all duration-700 group-hover:filter-none"
        aria-label="Map showing Hotel Rajwada Palace in Chandrapur"
      />

      {/* Subtle architectural frame accent */}
      <div
        className="absolute inset-0 border border-white/5 pointer-events-none transition-colors duration-500 group-hover:border-gold/30"
        aria-hidden="true"
      />

      {/* Top Left Minimal Beacon */}
      <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-charcoal-deep/90 backdrop-blur-md border border-gold/30 text-[10px] font-cinzel text-gold-light uppercase tracking-[0.2em] shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
          RAJWADA PALACE PIN
        </span>
      </div>

      {/* Clear external action button: OPEN IN GOOGLE MAPS ↗ */}
      <div className="absolute bottom-3 right-3 z-20">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn px-3.5 py-2 bg-charcoal-deep/95 hover:bg-charcoal backdrop-blur-md border border-gold/30 hover:border-gold text-ivory hover:text-gold text-[11px] font-sans tracking-wider uppercase transition-all duration-300 inline-flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.6)] cursor-pointer"
          aria-label="Open Hotel Rajwada Palace in Google Maps app"
        >
          <span>OPEN IN GOOGLE MAPS</span>
          <span className="text-gold transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
};
