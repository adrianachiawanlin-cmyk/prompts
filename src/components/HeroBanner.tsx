import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/catalog';
import { DepartmentId } from '../types/store';
import { SmartImage } from './SmartImage';

interface HeroBannerProps {
  onSelectDepartment: (dept: DepartmentId) => void;
}

export function HeroBanner({ onSelectDepartment }: HeroBannerProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const currentSlide = HERO_SLIDES[slideIndex];

  const handlePrev = () => {
    setSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      aria-label="Featured promotions"
      className="relative max-w-[1440px] mx-auto overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[420px] w-full">
        <SmartImage
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover object-center transition-opacity duration-300"
        />

        {/* Gradient Scrim for Text Readability & Bottom Fade into Canvas */}
        <div className="absolute inset-0 bg-gradient-to-r from-amazon-navy/25 via-amazon-navy/45 to-amazon-navy/85" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-light-background via-light-background/70 to-transparent" />

        {/* Hero Promo Copy */}
        <div className="absolute inset-y-0 right-10 sm:right-16 flex items-center justify-end max-w-lg text-left px-6 pb-16">
          <div className="flex flex-col items-start gap-gutter-md text-on-amazon-navy">
            <span className="inline-flex items-center rounded-sm bg-deal-red text-on-deal-red px-2.5 py-1 font-label text-label-md">
              <span>{currentSlide.badge}</span>
            </span>
            <h1 className="font-display text-display-lg-mobile sm:text-display-lg text-on-amazon-navy text-balance">
              {currentSlide.title}
            </h1>
            <p className="font-body text-body-md text-on-amazon-navy/90 text-pretty">
              {currentSlide.subtitle}
            </p>
            <button
              type="button"
              onClick={() => onSelectDepartment(currentSlide.targetDepartment)}
              className="inline-flex items-center justify-center rounded-full bg-amazon-gold text-on-amazon-gold px-6 py-2.5 font-label text-label-lg hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
            >
              {currentSlide.ctaLabel}
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          type="button"
          id="hero-prev"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-28 inline-flex items-center justify-center w-10 h-16 rounded-sm bg-light-surface/20 hover:bg-light-surface/40 text-on-amazon-navy transition-colors duration-state-change cursor-pointer"
        >
          <span className="material-symbols-outlined text-headline-lg" aria-hidden="true">
            chevron_left
          </span>
        </button>

        <button
          type="button"
          id="hero-next"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-28 inline-flex items-center justify-center w-10 h-16 rounded-sm bg-light-surface/20 hover:bg-light-surface/40 text-on-amazon-navy transition-colors duration-state-change cursor-pointer"
        >
          <span className="material-symbols-outlined text-headline-lg" aria-hidden="true">
            chevron_right
          </span>
        </button>
      </div>
    </section>
  );
}
