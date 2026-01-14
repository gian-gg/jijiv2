import { tool } from 'ai';
import { z } from 'zod';
import { runRawQuery } from '@/lib/db/transactions';

export const queryTransactionsTool = tool({
  description: 'Execute SELECT SQL on transaction table',
  inputSchema: z.object({
    sqlQuery: z.string().describe('SELECT statement'),
  }),
  execute: async ({ sqlQuery }) => {
    return await runRawQuery(sqlQuery);
  },
});
