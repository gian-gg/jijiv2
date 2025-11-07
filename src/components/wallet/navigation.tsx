'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

import { Bell, Home, List, PiggyBank, PieChart } from 'lucide-react';

const NAV = [
  { name: 'Home', href: '/wallet', icon: Home },
  {
    name: 'Transactions',
    href: '/wallet/transactions',
    icon: List,
  },
  { name: 'Budget', href: '/wallet/budget', icon: PiggyBank },
  { name: 'Reminders', href: '/wallet/reminders', icon: Bell },
  {
    name: 'Analytics',
    href: '/wallet/analytics',
    icon: PieChart,
  },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="bg-background/40 border-border flex h-full w-full items-center gap-1 border p-1">
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
