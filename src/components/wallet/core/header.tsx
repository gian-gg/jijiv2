import {
  NotificationsPopover,
  UserComponent,
  WalletSwitcher,
} from '@/components/wallet/core';

const Header = ({ user }: { user: User }) => {
  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-2">
      <WalletSwitcher />

      <div className="z-10 flex items-center gap-2">
        <NotificationsPopover />
        <UserComponent user={user} />
      </div>
    </div>
  );
};

export default Header;
