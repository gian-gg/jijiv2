# Database

Database schema, queries, and migration guide.

## Schema

### `transaction` Table

```sql
CREATE TABLE transaction (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,              -- 'income' | 'expense'
  category TEXT NOT NULL,
  amount TEXT NOT NULL,             -- Stored as text, cast for math
  description TEXT NOT NULL,
  date TEXT NOT NULL,               -- ISO 8601 (YYYY-MM-DD)
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transaction_user ON transaction(user_id);
CREATE INDEX idx_transaction_date ON transaction(date);
```

**Why amount is TEXT?**

- Avoids floating-point precision issues
- Cast to DECIMAL for calculations
- Example: `CAST(amount AS DECIMAL)`

### `user` Table (Better Auth)

Managed automatically by Better Auth. Stores Google OAuth data.

**Columns**:

- `id` - Unique user identifier
- `email` - Google email
- `name` - Display name
- `image` - Profile picture URL
- `emailVerified` - Verification status

## Common Queries

Located in `/src/lib/db/transactions.ts`:

### Get All Transactions

```typescript
await getTransactions(userId);
```

### Create Transaction

```typescript
await createTransaction({
  userId: 'user_123',
  type: 'expense',
  category: 'Food & Dining',
  amount: '25.50',
  description: 'Lunch',
  date: '2026-01-14',
  paymentMethod: 'Credit Card',
});
```

### Update Transaction

```typescript
await updateTransaction(transactionId, {
  amount: '30.00',
  description: 'Dinner',
});
```

### Delete Transaction

```typescript
await deleteTransaction(transactionId);
```

### Raw SQL Query (AI Tool)

```typescript
await runRawQuery(`
  SELECT SUM(CAST(amount AS DECIMAL)) as total
  FROM transaction
  WHERE user_id = 'user_123'
  AND type = 'expense'
`);
```

## Migrations

Using **Drizzle ORM** for schema management.

### Generate Migration

```bash
npm run db:generate
```

Creates migration file in `drizzle/` folder.

### Apply Migration

```bash
npm run db:push
```

Pushes schema changes to database.

### Drizzle Studio (GUI)

```bash
npm run db:studio
```

Opens browser interface at `https://local.drizzle.studio`

## Setup

### Local PostgreSQL

**macOS (Homebrew)**:

```bash
brew install postgresql
brew services start postgresql
createdb jijiv2
```

**Connection string**:

```
postgresql://localhost:5432/jijiv2
```

### Hosted Databases

**Neon** (Recommended, Free tier):

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add to `.env`

**Supabase**:

1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Add to `.env`

**Vercel Postgres**:

```bash
vercel postgres create
```

## Data Types

### Categories

```typescript
const CATEGORIES = [
  'Food & Dining',
  'Groceries',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Salary',
  'Freelance',
  'Investment',
  'Other',
] as const;
```

### Payment Methods

```typescript
const PAYMENT_METHODS = [
  'Cash',
  'Credit Card',
  'Debit Card',
  'Bank Transfer',
  'Digital Wallet',
  'Other',
] as const;
```

## Security

### User Isolation

All queries include `WHERE user_id = '...'`:

```typescript
// Drizzle example
db.select().from(transactions).where(eq(transactions.userId, userId));
```

### SQL Injection Prevention

- **Parameterized queries** only
- **Drizzle ORM** handles escaping
- **AI queries** validated server-side

### Read-Only AI

AI-generated queries:

- SELECT only (no INSERT/UPDATE/DELETE)
- Server validates before execution
- Limited to 10 results

## Performance

### Indexes

- `user_id` - Fast user-scoped queries
- `date` - Efficient date range queries

### Optimization Tips

1. **Limit results** (LIMIT 10)
2. **Use indexes** (user_id, date)
3. **Cast amounts** once per aggregate
4. **Avoid SELECT \*** in production

## Backup & Recovery

### Export Data

```bash
pg_dump jijiv2 > backup.sql
```

### Import Data

```bash
psql jijiv2 < backup.sql
```

### Vercel Postgres

Automatic daily backups (paid plans).

## Related Docs

- [AI System](./AI_SYSTEM.md) - How AI queries work
- [API Reference](./API.md) - API endpoints
- [Getting Started](./GETTING_STARTED.md) - Initial setup
