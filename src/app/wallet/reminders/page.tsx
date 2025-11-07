'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/wallet/core/page-header';
import {
  FilterButtons,
  ScrollableContent,
  StatCard,
} from '@/components/wallet/ui';
import { useState } from 'react';

// Mock reminders data
const mockReminders = [
  {
    id: '1',
    title: 'Pay Credit Card Bill',
    description: 'Chase Sapphire - Minimum payment $250',
    dueDate: '2025-11-15',
    amount: 250.0,
    category: 'Bills',
    priority: 'high',
    recurring: true,
    completed: false,
  },
  {
    id: '2',
    title: 'Netflix Subscription',
    description: 'Monthly subscription renewal',
    dueDate: '2025-11-12',
    amount: 15.99,
    category: 'Subscriptions',
    priority: 'low',
    recurring: true,
    completed: false,
  },
  {
    id: '3',
    title: 'Rent Payment',
    description: 'Monthly rent due on the 1st',
    dueDate: '2025-12-01',
    amount: 1500.0,
    category: 'Bills',
    priority: 'high',
    recurring: true,
    completed: false,
  },
  {
    id: '4',
    title: 'Gym Membership',
    description: 'Monthly gym membership fee',
    dueDate: '2025-11-10',
    amount: 49.99,
    category: 'Health',
    priority: 'medium',
    recurring: true,
    completed: true,
  },
  {
    id: '5',
    title: 'Car Insurance',
    description: 'Quarterly insurance payment',
    dueDate: '2025-11-20',
    amount: 450.0,
    category: 'Insurance',
    priority: 'high',
    recurring: false,
    completed: false,
  },
  {
    id: '6',
    title: 'Spotify Premium',
    description: 'Monthly music subscription',
    dueDate: '2025-11-18',
    amount: 9.99,
    category: 'Subscriptions',
    priority: 'low',
    recurring: true,
    completed: false,
  },
];

export default function Reminders() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredReminders = mockReminders.filter((reminder) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !reminder.completed;
    if (filter === 'completed') return reminder.completed;
    return true;
  });

  const upcomingReminders = filteredReminders.filter((r) => !r.completed);
  const totalUpcoming = upcomingReminders.reduce((sum, r) => sum + r.amount, 0);

  const getDaysUntil = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <>
      <PageHeader
        title="Reminders"
        description="View and manage your reminders"
      />

      <ScrollableContent className="overflow-y-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Upcoming Payments"
            value={upcomingReminders.length}
            description={`Total: $${totalUpcoming.toFixed(2)}`}
          />
          <StatCard
            label="Next Due"
            value={
              upcomingReminders.length > 0
                ? upcomingReminders.sort(
                    (a, b) =>
                      new Date(a.dueDate).getTime() -
                      new Date(b.dueDate).getTime()
                  )[0].title
                : 'None'
            }
            description={
              upcomingReminders.length > 0
                ? `in ${getDaysUntil(
                    upcomingReminders.sort(
                      (a, b) =>
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                    )[0].dueDate
                  )} days`
                : undefined
            }
          />
        </div>

        <div className="h-full w-full flex-1 space-y-4 overflow-y-auto">
          {/* Filters */}
          <FilterButtons
            options={[
              { value: 'all', label: 'All', count: mockReminders.length },
              {
                value: 'active',
                label: 'Active',
                count: mockReminders.filter((r) => !r.completed).length,
              },
              {
                value: 'completed',
                label: 'Completed',
                count: mockReminders.filter((r) => r.completed).length,
              },
            ]}
            value={filter}
            onChange={setFilter}
          />

          {/* Reminders List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Your Reminders</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto p-0">
              <div className="divide-border divide-y">
                {filteredReminders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mb-4"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <p className="text-muted-foreground text-sm">
                      No reminders found
                    </p>
                  </div>
                ) : (
                  filteredReminders.map((reminder) => {
                    const daysUntil = getDaysUntil(reminder.dueDate);
                    const isOverdue = daysUntil < 0;
                    const isDueSoon = daysUntil >= 0 && daysUntil <= 3;

                    return (
                      <div
                        key={reminder.id}
                        className={`hover:bg-accent/5 flex items-start justify-between gap-4 p-2 px-4 transition-colors ${
                          reminder.completed ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Checkbox */}
                          <div
                            className={`border-border mt-1 flex size-5 items-center justify-center border ${
                              reminder.completed
                                ? 'bg-primary'
                                : 'bg-background'
                            }`}
                          >
                            {reminder.completed && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-primary-foreground"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex flex-col gap-2">
                            <div>
                              <h3
                                className={`text-sm font-medium ${
                                  reminder.completed ? 'line-through' : ''
                                }`}
                              >
                                {reminder.title}
                              </h3>
                              <p className="text-muted-foreground mt-1 text-xs">
                                {reminder.description}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant={getPriorityColor(reminder.priority)}
                                className="text-xs capitalize"
                              >
                                {reminder.priority}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {reminder.category}
                              </Badge>
                              {reminder.recurring && (
                                <Badge variant="secondary" className="text-xs">
                                  Recurring
                                </Badge>
                              )}
                              {!reminder.completed && (
                                <>
                                  {isOverdue && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs"
                                    >
                                      Overdue
                                    </Badge>
                                  )}
                                  {isDueSoon && !isOverdue && (
                                    <Badge
                                      variant="secondary"
                                      className="text-warning text-xs"
                                    >
                                      Due Soon
                                    </Badge>
                                  )}
                                </>
                              )}
                            </div>

                            <div className="text-muted-foreground flex items-center gap-4 text-xs">
                              <div className="flex items-center gap-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="3"
                                    y="4"
                                    width="18"
                                    height="18"
                                    rx="2"
                                    ry="2"
                                  ></rect>
                                  <line x1="16" y1="2" x2="16" y2="6"></line>
                                  <line x1="8" y1="2" x2="8" y2="6"></line>
                                  <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>{reminder.dueDate}</span>
                              </div>
                              {!reminder.completed && (
                                <span
                                  className={
                                    isOverdue
                                      ? 'text-destructive'
                                      : isDueSoon
                                        ? 'text-warning'
                                        : ''
                                  }
                                >
                                  {isOverdue
                                    ? `${Math.abs(daysUntil)} days overdue`
                                    : daysUntil === 0
                                      ? 'Due today'
                                      : `${daysUntil} days left`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-sm font-bold">
                            ${reminder.amount.toFixed(2)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="size-8 p-0"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="1"></circle>
                              <circle cx="12" cy="5" r="1"></circle>
                              <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Calendar View Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Calendar View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 flex h-64 items-center justify-center border">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground mx-auto mb-2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <p className="text-muted-foreground text-sm">
                    Calendar view coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollableContent>
    </>
  );
}
