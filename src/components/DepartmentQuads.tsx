import { IMAGES } from '../data/catalog';
import { DepartmentId, UserAccount } from '../types/store';
import { SmartImage } from './SmartImage';

interface DepartmentQuadsProps {
  account: UserAccount;
  onSelectDepartment: (dept: DepartmentId) => void;
  onSelectProductById: (productId: string) => void;
  onOpenAccountModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenPrimeModal: () => void;
}

export function DepartmentQuads({
  account,
  onSelectDepartment,
  onSelectProductById,
  onOpenAccountModal,
  onOpenOrdersModal,
  onOpenPrimeModal,
}: DepartmentQuadsProps) {
  return (
    <section aria-label="Department highlights" className="relative z-10 -mt-28 max-w-[1440px] mx-auto px-page-margin">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-xl items-stretch">
        {/* Card 1: Electronics & Tech */}
        <article className="bg-light-surface text-light-on-surface p-5 rounded flex flex-col justify-between gap-gutter-lg border border-light-outline-variant/60 h-full">
          <header>
            <h2 className="font-headline text-headline-md text-light-on-surface">Electronics &amp; Tech</h2>
          </header>
          <div className="grid grid-cols-2 gap-gutter-md">
            <button
              type="button"
              onClick={() => onSelectProductById('audio-wearables-bundle')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.catElectronics}
                  alt="Wireless headphones and smartwatches"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Audio &amp; Wearables</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProductById('ultrabook-mech-setup')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.catComputers}
                  alt="Laptops and mechanical keyboards"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Laptops &amp; Keyboards</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProductById('lg-ultragear-27')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.dealGamingMonitor}
                  alt="QHD Gaming Monitors"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Gaming Monitors</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProductById('sony-wh-1000xm5')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.dealSonyHeadphones}
                  alt="Noise cancelling headphones"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Headphones</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => onSelectDepartment('electronics')}
              className="font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
            >
              Shop all Electronics
            </button>
          </div>
        </article>

        {/* Card 2: Amazon Fresh */}
        <article className="bg-light-surface text-light-on-surface p-5 rounded flex flex-col justify-between gap-gutter-lg border border-light-outline-variant/60 h-full">
          <header className="flex flex-col gap-1">
            <h2 className="font-headline text-headline-md text-light-on-surface">Amazon Fresh</h2>
            <p className="font-body text-body-sm text-light-on-surface-variant">
              2-hour scheduled delivery in Singapore
            </p>
          </header>
          <button
            type="button"
            onClick={() => onSelectDepartment('fresh')}
            className="bg-light-surface-container-low rounded-sm h-64 overflow-hidden cursor-pointer group block w-full"
            aria-label="Shop Amazon Fresh"
          >
            <SmartImage
              src={IMAGES.catFreshGrocery}
              alt="Fresh organic produce, sourdough bread, and orange juice"
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-state-change"
            />
          </button>
          <div>
            <button
              type="button"
              onClick={() => onSelectDepartment('fresh')}
              className="font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
            >
              Shop Amazon Fresh
            </button>
          </div>
        </article>

        {/* Card 3: Books, Toys & Baby */}
        <article className="bg-light-surface text-light-on-surface p-5 rounded flex flex-col justify-between gap-gutter-lg border border-light-outline-variant/60 h-full">
          <header>
            <h2 className="font-headline text-headline-md text-light-on-surface">Books, Toys &amp; Baby</h2>
          </header>
          <div className="grid grid-cols-2 gap-gutter-md">
            <button
              type="button"
              onClick={() => onSelectDepartment('books')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.catBooks}
                  alt="Bestselling books and Kindle"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Books &amp; DVDs</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDepartment('toys')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.catToysBaby}
                  alt="Toys, wooden blocks and baby essentials"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Toys &amp; Baby</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectProductById('kindle-paperwhite-16gb')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.dealKindleReader}
                  alt="Kindle e-readers"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Kindle E-Readers</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectDepartment('home')}
              className="flex flex-col gap-1 group text-left cursor-pointer"
            >
              <div className="bg-light-surface-container-low rounded-sm h-28 overflow-hidden p-2 flex items-center justify-center w-full">
                <SmartImage
                  src={IMAGES.dealEspressoMachine}
                  alt="Home and kitchen appliances"
                  className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-state-change"
                />
              </div>
              <span className="font-body text-body-sm text-light-on-surface">Home &amp; Kitchen</span>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => onSelectDepartment('all')}
              className="font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
            >
              Explore all departments
            </button>
          </div>
        </article>

        {/* Card 4: Sign in & Prime Spotlight */}
        <div className="flex flex-col gap-gutter-xl h-full">
          <article className="bg-light-surface text-light-on-surface p-5 rounded flex flex-col gap-gutter-md border border-light-outline-variant/60">
            {account.signedIn ? (
              <>
                <div className="flex flex-col gap-1">
                  <h2 className="font-headline text-headline-md text-light-on-surface">
                    Welcome back, {account.name.split(' ')[0]}
                  </h2>
                  <p className="font-body text-body-sm text-light-on-surface-variant truncate">
                    {account.email}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onOpenOrdersModal}
                    className="flex-1 inline-flex items-center justify-center rounded-full bg-amazon-gold text-on-amazon-gold px-4 py-2 font-label text-label-md hover:bg-amazon-orange transition-colors duration-state-change cursor-pointer"
                  >
                    Your Orders
                  </button>
                  <button
                    type="button"
                    onClick={onOpenAccountModal}
                    className="inline-flex items-center justify-center rounded-full border border-light-outline-variant bg-light-surface text-light-on-surface px-4 py-2 font-label text-label-md hover:bg-light-surface-container transition-colors duration-state-change cursor-pointer"
                  >
                    Lists
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="font-headline text-headline-md text-light-on-surface">
                  Sign in for best experience
                </h2>
                <button
                  type="button"
                  onClick={onOpenAccountModal}
                  className="w-full inline-flex items-center justify-center rounded-full bg-amazon-gold text-on-amazon-gold px-5 py-2.5 font-label text-label-lg hover:bg-amazon-orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary transition-colors duration-state-change cursor-pointer"
                >
                  <span>Sign in securely</span>
                </button>
              </>
            )}
          </article>

          <article className="bg-light-surface text-light-on-surface p-5 rounded flex flex-col justify-between gap-gutter-md border border-light-outline-variant/60 flex-1">
            <div className="flex flex-col gap-gutter-sm">
              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-headline-md text-light-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  verified
                </span>
                <span className="font-headline text-headline-sm text-light-primary-container">
                  Amazon Prime Singapore
                </span>
              </div>
              <p className="font-body text-body-md text-light-on-surface text-pretty">
                {account.isPrime
                  ? 'Your Prime Singapore trial is active. Enjoy FREE 1-day local delivery and international shipping from US & JP.'
                  : 'Enjoy FREE 1-day delivery on local items, FREE international shipping from Amazon US & JP, and Prime Video for S$4.99/month.'}
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenPrimeModal}
              className="text-left font-body text-body-sm text-light-primary-container hover:text-star-amber hover:underline cursor-pointer"
            >
              {account.isPrime ? 'Manage Prime benefits' : 'Start your 30-day free trial'}
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
