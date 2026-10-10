import React from 'react';
import { Button } from '../Button';

interface ContactActionsProps {
  phoneDisplay: string;
  phoneRaw: string;
  directionsUrl: string;
  className?: string;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  phoneDisplay,
  phoneRaw,
  directionsUrl,
  className = '',
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ${className}`}>
      {/* Primary Action: Get Directions (Opens real Google Maps destination externally) */}
      <Button
        variant="primary"
        size="md"
        as="a"
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto text-center"
      >
        Get Directions
      </Button>

      {/* Secondary Action: Call The Hotel (tel: protocol using verified number) */}
      <Button
        variant="secondary"
        size="md"
        as="a"
        href={`tel:${phoneRaw}`}
        className="w-full sm:w-auto text-center"
        aria-label={`Call the hotel at ${phoneDisplay}`}
      >
        Call: {phoneDisplay}
      </Button>

      {/* Tertiary Action: Direct WhatsApp Chat */}
      <Button
        variant="secondary"
        size="md"
        as="a"
        href="https://wa.me/919921019664"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto text-center text-emerald-400 border-emerald-500/30 hover:border-emerald-400"
        aria-label="Chat with Hotel Rajwada Palace on WhatsApp"
      >
        WhatsApp Us
      </Button>
    </div>
  );
};
