import React from 'react';
import {
  RajwadaDiningExperience,
  type RajwadaDiningExperienceProps,
} from './RajwadaDiningExperience';

export interface ExperienceSectionProps extends RajwadaDiningExperienceProps {
  onCheckAvailability?: () => void;
  onExploreLocation?: () => void;
}

/**
 * THE RAJWADA DINING EXPERIENCE (REPLACING THE OBSOLETE TADOBA WILDLIFE EXPERIENCE SECTION)
 * Replaces the old wildlife/culture experience section with an exceptionally premium
 * restaurant and food-ordering showcase inspired by Qissa's editorial food storytelling.
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onCheckAvailability,
  onExploreLocation: _onExploreLocation,
  onExploreMenu,
  onOrderFood,
  onReserveTable,
  cart,
  onUpdateCart,
  className = '',
}) => {
  return (
    <RajwadaDiningExperience
      onExploreMenu={onExploreMenu || onOrderFood}
      onOrderFood={onOrderFood}
      onReserveTable={onReserveTable || onCheckAvailability}
      cart={cart}
      onUpdateCart={onUpdateCart}
      className={className}
    />
  );
};
