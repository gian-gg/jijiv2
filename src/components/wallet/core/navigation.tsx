'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

import { List, MessageSquare } from 'lucide-react';

const NAV = [
  { name: 'Chat', href: '/wallet', icon: MessageSquare },
  { name: 'Transactions', href: '/wallet/transactions', icon: List },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="bg-background/40 border-border flex w-full items-center gap-1 border-t p-1">
      {NAV.map((item) => {
        const Icon = item.icon;

        return (
          <Link key={item.name} href={item.href} className="flex-1">
            <Button
              className="w-full"
              variant={pathname === item.href ? 'default' : 'ghost'}
              size="sm"
            >
              <Icon className="mr-2 h-4 w-4" />
              <span className="hidden md:block">{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;
