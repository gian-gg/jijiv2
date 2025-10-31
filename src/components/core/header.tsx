import React from 'react';
import { NotificationsPopover } from '@/components/wallet/notifications-popover';
import UserComponent from '@/components/core/user-component';

const Header = ({ user }: { user: User }) => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 flex w-full items-center justify-between border-b px-20 py-2 backdrop-blur">
      <h1 className="text-xl font-semibold">jijiv2</h1>

      <div className="flex items-center gap-2">
        <NotificationsPopover />
        <UserComponent user={user} />
      </div>
    </header>
  );
};

export default Header;
