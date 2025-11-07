'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/wallet/core';
import {
  InsightCard,
  ScrollableContent,
  StatCard,
} from '@/components/wallet/ui';

// Mock budget data
const mockBudgets = [
  {
    id: '1',
    category: 'Food & Drink',
    allocated: 500,
    spent: 342.5,
    color: 'oklch(0.78 0.14 285)',
  },
  {
    id: '2',
    category: 'Shopping',
    allocated: 300,
    spent: 245.8,
    color: 'oklch(0.72 0.12 210)',
  },
  {
    id: '3',
    category: 'Transportation',
    allocated: 200,
    spent: 156.3,
    color: 'oklch(0.70 0.12 150)',
  },
  {
    id: '4',
    category: 'Entertainment',
    allocated: 150,
    spent: 98.75,
    color: 'oklch(0.75 0.12 65)',
  },
  {
    id: '5',
    category: 'Health & Fitness',
    allocated: 100,
    spent: 49.99,
    color: 'oklch(0.73 0.14 340)',
  },
  {
    id: '6',
    category: 'Utilities',
    allocated: 250,
    spent: 250.0,
    color: 'oklch(0.68 0.14 160)',
  },
];

export default function Budget() {
  const totalAllocated = mockBudgets.reduce(
    (sum, budget) => sum + budget.allocated,
    0
  );
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalAllocated - totalSpent;

  return (
    <>
      <PageHeader
        title="Categories"
        description="View and manage your categories"
      />

      <ScrollableContent className="overflow-y-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            label="Total Allocated"
            value={`$${totalAllocated.toFixed(2)}`}
          />
          <StatCard
            label="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
            description={`${((totalSpent / totalAllocated) * 100).toFixed(1)}% of budget`}
          />
          <StatCard
            label="Remaining"
            value={`$${totalRemaining.toFixed(2)}`}
            valueClassName={
              totalRemaining < 0 ? 'text-destructive' : 'text-success'
            }
            description={`${((totalRemaining / totalAllocated) * 100).toFixed(1)}% left`}
          />
        </div>

        <div className="h-full w-full flex-1 space-y-4 overflow-y-auto">
          {/* Budget Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Budget by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockBudgets.map((budget) => {
                const percentage = (budget.spent / budget.allocated) * 100;
                const isOverBudget = budget.spent > budget.allocated;

                return (
                  <div key={budget.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-3 border"
                          style={{ backgroundColor: budget.color }}
                        />
                        <span className="text-sm font-medium">
                          {budget.category}
                        </span>
                        {isOverBudget && (
                          <Badge variant="destructive" className="text-xs">
                            Over Budget
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">
                          ${budget.spent.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          {' '}
                          / ${budget.allocated.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-muted h-2 w-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isOverBudget ? 'bg-destructive' : 'bg-primary'
                        }`}
                        style={{
                          width: `${Math.min(percentage, 100)}%`,
                          backgroundColor: isOverBudget
                            ? undefined
                            : budget.color,
                        }}
                      />
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {percentage.toFixed(1)}% used
                      </span>
                      <span
                        className={
                          isOverBudget
                            ? 'text-destructive'
                            : 'text-muted-foreground'
                        }
                      >
                        ${Math.abs(budget.allocated - budget.spent).toFixed(2)}{' '}
                        {isOverBudget ? 'over' : 'remaining'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          {/* Budget Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Budget Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <InsightCard
                variant="accent"
                title="Set Realistic Goals"
                description="Review your spending patterns and set budgets that align with your actual needs."
              />
              <InsightCard
                variant="accent"
                title="Track Regularly"
                description="Check your budget progress weekly to stay on track and make adjustments."
              />
              <InsightCard
                variant="accent"
                title="Adjust as Needed"
                description="Don't be afraid to modify your budget categories based on changing priorities."
              />
            </CardContent>
          </Card>
        </div>
      </ScrollableContent>
    </>
  );
}
