'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/wallet/core';
import {
  FilterButtons,
  InsightCard,
  ScrollableContent,
  StatCard,
} from '@/components/wallet/ui';
import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Mock data for charts
const monthlyData = [
  { month: 'Jun', income: 3200, expenses: 2400 },
  { month: 'Jul', income: 3500, expenses: 2800 },
  { month: 'Aug', income: 3400, expenses: 2600 },
  { month: 'Sep', income: 3800, expenses: 2900 },
  { month: 'Oct', income: 3600, expenses: 3100 },
  { month: 'Nov', income: 4200, expenses: 2700 },
];

const categoryData = [
  { name: 'Food & Drink', value: 342.5, color: 'oklch(0.78 0.14 285)' },
  { name: 'Shopping', value: 245.8, color: 'oklch(0.72 0.12 210)' },
  { name: 'Transportation', value: 156.3, color: 'oklch(0.70 0.12 150)' },
  { name: 'Entertainment', value: 98.75, color: 'oklch(0.75 0.12 65)' },
  { name: 'Health & Fitness', value: 49.99, color: 'oklch(0.73 0.14 340)' },
  { name: 'Utilities', value: 250.0, color: 'oklch(0.68 0.14 160)' },
];

const weeklySpending = [
  { day: 'Mon', amount: 45.2 },
  { day: 'Tue', amount: 78.5 },
  { day: 'Wed', amount: 32.1 },
  { day: 'Thu', amount: 91.3 },
  { day: 'Fri', amount: 125.8 },
  { day: 'Sat', amount: 210.4 },
  { day: 'Sun', amount: 67.9 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>(
    'month'
  );

  const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = monthlyData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );
  const savingsRate = ((totalIncome - totalExpenses) / totalIncome) * 100;

  return (
    <>
      <PageHeader
        title="Analytics"
        description="View and manage your analytics data"
      />

      <ScrollableContent>
        {/* Time Range Selector */}
        <FilterButtons
          options={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          value={timeRange}
          onChange={setTimeRange}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            label="Avg. Monthly Income"
            value={`$${(totalIncome / monthlyData.length).toFixed(2)}`}
            badge={{ text: '+12.5%', className: 'text-success' }}
          />
          <StatCard
            label="Avg. Monthly Expenses"
            value={`$${(totalExpenses / monthlyData.length).toFixed(2)}`}
            badge={{ text: '+8.3%', className: 'text-destructive' }}
          />
          <StatCard
            label="Savings Rate"
            value={`${savingsRate.toFixed(1)}%`}
            badge={{ text: '+4.2%', className: 'text-success' }}
          />
        </div>

        {/* Income vs Expenses Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.26 0 0)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="oklch(0.72 0.01 270)"
                  style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                />
                <YAxis
                  stroke="oklch(0.72 0.01 270)"
                  style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'oklch(0.20 0 0)',
                    border: '1px solid oklch(0.26 0 0)',
                    borderRadius: '0',
                    fontFamily: 'JetBrains Mono',
                  }}
                  labelStyle={{ color: 'oklch(0.98 0.01 270)' }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="oklch(0.68 0.14 160)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.68 0.14 160)', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="oklch(0.78 0.14 285)"
                  strokeWidth={2}
                  dot={{ fill: 'oklch(0.78 0.14 285)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown and Weekly Spending */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${((percent as number) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.20 0 0)',
                      border: '1px solid oklch(0.26 0 0)',
                      borderRadius: '0',
                      fontFamily: 'JetBrains Mono',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Category Legend */}
              <div className="mt-4 space-y-2">
                {categoryData.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="size-3 border"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                    <span className="font-bold">
                      ${category.value.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Spending */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Weekly Spending Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklySpending}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.26 0 0)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="oklch(0.72 0.01 270)"
                    style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                  />
                  <YAxis
                    stroke="oklch(0.72 0.01 270)"
                    style={{ fontSize: '12px', fontFamily: 'JetBrains Mono' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.20 0 0)',
                      border: '1px solid oklch(0.26 0 0)',
                      borderRadius: '0',
                      fontFamily: 'JetBrains Mono',
                    }}
                  />
                  <Bar dataKey="amount" fill="oklch(0.78 0.14 285)" />
                </BarChart>
              </ResponsiveContainer>

              <div className="text-muted-foreground mt-4 text-xs">
                <p>
                  <span className="font-bold">Avg. daily spending:</span> $
                  {(
                    weeklySpending.reduce((sum, day) => sum + day.amount, 0) /
                    weeklySpending.length
                  ).toFixed(2)}
                </p>
                <p className="mt-1">
                  <span className="font-bold">Highest spending day:</span>{' '}
                  Saturday ($210.40)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Financial Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <InsightCard
              variant="success"
              title="Great Savings Rate!"
              description={`You're saving ${savingsRate.toFixed(1)}% of your income, which is above the recommended 20%.`}
            />
            <InsightCard
              variant="warning"
              title="Weekend Spending Alert"
              description="Your weekend spending is 45% higher than weekdays. Consider setting a weekend budget."
            />
            <InsightCard
              variant="accent"
              title="Top Category: Food & Drink"
              description="Food & Drink represents 30% of your expenses. Look for opportunities to cook at home more often."
            />
          </CardContent>
        </Card>
      </ScrollableContent>
    </>
  );
}
