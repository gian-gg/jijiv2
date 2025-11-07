import { NotificationsPopover, UserComponent } from '@/components/wallet/core';

const Header = ({ user }: { user: User }) => {
  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center border">
          <span className="text-primary text-sm font-bold">j</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight">jiji</h1>
      </div>

      <div className="z-10 flex items-center gap-2">
        <NotificationsPopover />
        <UserComponent user={user} />
      </div>
    </div>
  );
};

export default Header;
