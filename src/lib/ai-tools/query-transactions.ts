import { tool } from 'ai';
import { z } from 'zod';
import { runRawQuery } from '@/lib/db/transactions';

export const queryTransactionsTool = tool({
  description:
    'Execute a read-only SQL query on the users transactions. Use table name "transaction".',
  inputSchema: z.object({
    sqlQuery: z
      .string()
      .describe('The SQL query to execute. Must be a SELECT statement.'),
  }),
  execute: async ({ sqlQuery }) => {
    return await runRawQuery(sqlQuery);
  },
});
