import React from 'react';
import { NotificationsPopover } from '@/components/wallet/notifications-popover';
import UserComponent from '@/components/core/user-component';

const Header = ({ user }: { user: User }) => {
  return (
    <div className="z-10 flex items-center gap-2">
      <NotificationsPopover />
      <UserComponent user={user} />
    </div>
  );
};

export default Header;
