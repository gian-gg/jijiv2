import { Sparkles } from 'lucide-react';
import { UserComponent } from '@/components/wallet/core';

const Header = ({ user }: { user: User }) => {
  return (
    <div className="border-border flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 border-primary/20 flex size-8 items-center justify-center border">
          <Sparkles className="text-primary size-4" />
        </div>
        <span className="text-sm font-semibold">Jiji</span>
      </div>

      <div className="z-10 flex items-center gap-2">
        <UserComponent user={user} />
      </div>
    </div>
  );
};

export default Header;
