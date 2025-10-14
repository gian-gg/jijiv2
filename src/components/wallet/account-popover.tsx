'use client';

import { User, Settings, CreditCard, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export function AccountPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
          <span className="sr-only">Account menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-muted-foreground text-xs">john@example.com</p>
          </div>
          <Separator />
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="h-9 w-full justify-start px-2"
              size="sm"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="h-9 w-full justify-start px-2"
              size="sm"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Button>
            <Button
              variant="ghost"
              className="h-9 w-full justify-start px-2"
              size="sm"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
          <Separator />
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive h-9 w-full justify-start px-2"
            size="sm"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
