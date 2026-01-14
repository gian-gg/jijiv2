import { UserComponent } from '@/components/wallet/core';

const Header = ({ user }: { user: User }) => {
  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">jijiv2</span>
      </div>

      <div className="z-10 flex items-center gap-2">
        <UserComponent user={user} />
      </div>
    </div>
  );
};

export default Header;
