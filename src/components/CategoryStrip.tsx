import { IMAGES } from '../data/catalog';
import { DepartmentId } from '../types/store';
import { SmartImage } from './SmartImage';

interface CategoryStripProps {
  onSelectDepartment: (dept: DepartmentId) => void;
}

const CATEGORIES: Array<{
  id: DepartmentId;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}> = [
  {
    id: 'electronics',
    title: 'Electronics',
    subtitle: 'Audio, cameras & smart home',
    image: IMAGES.catElectronics,
    alt: 'Electronics',
  },
  {
    id: 'computers',
    title: 'Computers',
    subtitle: 'Laptops, monitors & SSDs',
    image: IMAGES.catComputers,
    alt: 'Computers',
  },
  {
    id: 'books',
    title: 'Books & DVDs',
    subtitle: 'Bestsellers, manga & films',
    image: IMAGES.catBooks,
    alt: 'Books and DVDs',
  },
  {
    id: 'fresh',
    title: 'Grocery & Fresh',
    subtitle: 'Produce, pantry & chilled',
    image: IMAGES.catFreshGrocery,
    alt: 'Amazon Fresh Grocery',
  },
  {
    id: 'toys',
    title: 'Toys & Baby',
    subtitle: 'LEGO, nursery & care',
    image: IMAGES.catToysBaby,
    alt: 'Toys and Baby',
  },
];

export function CategoryStrip({ onSelectDepartment }: CategoryStripProps) {
  return (
    <section id="categories" aria-label="Shop by Category" className="max-w-[1440px] mx-auto px-page-margin mt-section">
      <div className="bg-light-surface rounded p-5 border border-light-outline-variant/60 flex flex-col gap-gutter-lg">
        <div className="flex items-baseline justify-between">
          <h2 className="font-headline text-headline-lg text-light-on-surface">Shop by Category</h2>
          <button
            type="button"
            onClick={() => onSelectDepartment('all')}
            className="font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
          >
            View all categories
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-gutter-lg items-stretch">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectDepartment(cat.id)}
              className="bg-light-surface text-light-on-surface p-4 rounded border border-light-outline-variant/60 flex flex-col gap-2 hover:border-light-primary-container transition-colors duration-state-change h-full text-left cursor-pointer group"
            >
              <div className="bg-light-surface-container-low rounded-sm h-32 overflow-hidden w-full">
                <SmartImage
                  src={cat.image}
                  alt={cat.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <header>
                <h3 className="font-title text-title-md text-light-on-surface">{cat.title}</h3>
                <p className="font-body text-body-sm text-light-on-surface-variant">{cat.subtitle}</p>
              </header>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
