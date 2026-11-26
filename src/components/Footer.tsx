interface FooterProps {
  onOpenAccountModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenHelpModal: (articleId: string) => void;
}

export function Footer({
  onOpenAccountModal,
  onOpenOrdersModal,
  onOpenHelpModal,
}: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-amazon-slate text-on-amazon-slate mt-auto">
      <button
        type="button"
        onClick={scrollToTop}
        className="block w-full bg-amazon-slate/90 hover:bg-amazon-slate text-center py-3 border-b border-on-amazon-slate/10 font-label text-label-md text-on-amazon-slate transition-colors duration-state-change cursor-pointer"
      >
        Back to top
      </button>

      <div className="max-w-5xl mx-auto px-page-margin py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-headline text-headline-sm text-on-amazon-slate">Get to Know Us</h3>
          <button
            type="button"
            onClick={() => onOpenHelpModal('prime')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            About Amazon
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('prime')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Careers
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('shipping')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Sustainability
          </button>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-headline text-headline-sm text-on-amazon-slate">Make Money with Us</h3>
          <button
            type="button"
            onClick={() => onOpenHelpModal('support')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Sell on Amazon.sg
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('shipping')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Fulfilment by Amazon
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('support')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Advertise Your Products
          </button>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-headline text-headline-sm text-on-amazon-slate">Payment Products</h3>
          <button
            type="button"
            onClick={() => onOpenHelpModal('paynow')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Amazon Gift Cards
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('paynow')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            PayNow &amp; Local Cards
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('paynow')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            0% Instalment Plans
          </button>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <h3 className="font-headline text-headline-sm text-on-amazon-slate">Let Us Help You</h3>
          <button
            type="button"
            onClick={onOpenAccountModal}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Your Account
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('shipping')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Shipping Rates &amp; Policies
          </button>
          <button
            type="button"
            onClick={onOpenOrdersModal}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Returns &amp; Replacements
          </button>
          <button
            type="button"
            onClick={() => onOpenHelpModal('support')}
            className="font-body text-body-sm text-on-amazon-slate/80 hover:underline cursor-pointer text-left"
          >
            Help
          </button>
        </div>
      </div>

      <div className="bg-amazon-navy text-on-amazon-navy py-6 border-t border-on-amazon-navy/10">
        <div className="max-w-[1440px] mx-auto px-page-margin flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <span className="font-headline text-headline-sm text-on-amazon-navy">amazon.sg</span>
          <span className="font-body text-body-sm text-on-amazon-navy/75">Singapore · English · SGD (S$)</span>
          <span className="font-body text-body-sm text-on-amazon-navy/60">
            © 1996-2026, Amazon.com, Inc. or its affiliates
          </span>
        </div>
      </div>
    </footer>
  );
}
