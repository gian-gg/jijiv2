'use client';

import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

const notifications = [
  {
    id: 1,
    title: 'Transaction categorized',
    description: 'Your $45.00 purchase was categorized as Food & Dining',
    time: '2m ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Budget alert',
    description: "You've used 80% of your monthly dining budget",
    time: '1h ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Weekly summary ready',
    description: 'Your spending summary for this week is available',
    time: '1d ago',
    unread: false,
  },
];

export function NotificationsPopover() {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="bg-primary absolute top-1 right-1 h-2 w-2 rounded-full" />
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Notifications</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="hover:bg-accent flex cursor-pointer gap-3 rounded-lg p-3 text-sm transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <p className="leading-none font-medium">
                    {notification.title}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {notification.description}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="bg-primary mt-1 h-2 w-2 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
