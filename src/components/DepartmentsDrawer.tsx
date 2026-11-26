import { DEPARTMENT_LABELS } from '../data/catalog';
import { DepartmentId, UserAccount } from '../types/store';

interface DepartmentsDrawerProps {
  open: boolean;
  account: UserAccount;
  onClose: () => void;
  onSelectDepartment: (dept: DepartmentId) => void;
  onOpenAccountModal: () => void;
  onOpenOrdersModal: () => void;
  onOpenHelpModal: (articleId: string) => void;
}

const MENU_DEPARTMENTS: Array<{ id: DepartmentId; icon: string }> = [
  { id: 'deals', icon: 'local_offer' },
  { id: 'fresh', icon: 'shopping_basket' },
  { id: 'electronics', icon: 'headphones' },
  { id: 'computers', icon: 'laptop_mac' },
  { id: 'home', icon: 'coffee_maker' },
  { id: 'books', icon: 'menu_book' },
  { id: 'toys', icon: 'toys' },
  { id: 'baby', icon: 'child_care' },
  { id: 'dvds', icon: 'movie' },
  { id: 'all', icon: 'apps' },
];

export function DepartmentsDrawer({
  open,
  account,
  onClose,
  onSelectDepartment,
  onOpenAccountModal,
  onOpenOrdersModal,
  onOpenHelpModal,
}: DepartmentsDrawerProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-label="Shop by department"
      onClick={onClose}
    >
      <aside
        className="bg-light-surface text-light-on-surface w-80 max-w-[85vw] h-full flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-amazon-slate text-on-amazon-slate px-5 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenAccountModal();
            }}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-lg" aria-hidden="true">
              account_circle
            </span>
            <span className="font-headline text-headline-md">
              {account.signedIn ? `Hello, ${account.name.split(' ')[0]}` : 'Hello, sign in'}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-headline-md" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-light-outline-variant/60">
          <div className="py-3">
            <h3 className="px-5 py-2 font-headline text-headline-sm text-light-on-surface">
              Shop by Department
            </h3>
            <ul>
              {MENU_DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectDepartment(dept.id);
                      onClose();
                    }}
                    className="w-full px-5 py-2.5 flex items-center justify-between hover:bg-light-surface-container text-left font-body text-body-md text-light-on-surface cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-headline-sm text-light-on-surface-variant" aria-hidden="true">
                        {dept.icon}
                      </span>
                      <span>{DEPARTMENT_LABELS[dept.id]}</span>
                    </span>
                    <span className="material-symbols-outlined text-body-md text-light-on-surface-variant" aria-hidden="true">
                      chevron_right
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="py-3">
            <h3 className="px-5 py-2 font-headline text-headline-sm text-light-on-surface">
              Help &amp; Settings
            </h3>
            <ul>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAccountModal();
                  }}
                  className="w-full px-5 py-2.5 text-left font-body text-body-md hover:bg-light-surface-container cursor-pointer"
                >
                  Your Account &amp; Saved Lists
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenOrdersModal();
                  }}
                  className="w-full px-5 py-2.5 text-left font-body text-body-md hover:bg-light-surface-container cursor-pointer"
                >
                  Returns &amp; Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenHelpModal('prime');
                  }}
                  className="w-full px-5 py-2.5 text-left font-body text-body-md hover:bg-light-surface-container cursor-pointer"
                >
                  Amazon Prime Singapore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenHelpModal('support');
                  }}
                  className="w-full px-5 py-2.5 text-left font-body text-body-md hover:bg-light-surface-container cursor-pointer"
                >
                  Customer Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
