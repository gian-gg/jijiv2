# Deployment

Complete guide to deploying jijiv2 to production.

## Vercel (Recommended)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Import Project**
3. Select your GitHub repository
4. Vercel auto-detects Next.js configuration

### 3. Configure Environment Variables

In Vercel dashboard, add:

```env
DATABASE_URL=postgresql://...
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

**Generate secret**:

```bash
openssl rand -base64 32
```

### 4. Update Google OAuth

Add Vercel URL to authorized redirect URIs:

- `https://your-app.vercel.app/api/auth/callback/google`

### 5. Deploy

Vercel auto-deploys on push to `main` branch.

## Database Hosting

### Neon (Recommended)

**Features**:

- Free tier available
- Serverless PostgreSQL
- Automatic scaling
- Built-in connection pooling

**Setup**:

1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Add as `DATABASE_URL` in Vercel

### Supabase

**Features**:

- Free tier with 500MB
- Includes auth & storage
- PostgreSQL-compatible

**Setup**:

1. Sign up at [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings → Database
4. Add to Vercel environment variables

### Vercel Postgres

**Features**:

- Integrated with Vercel
- Pay-as-you-go pricing
- Serverless

**Setup**:

```bash
vercel postgres create
vercel env pull
```

### Railway

**Features**:

- Free tier with $5 credit
- Simple deployment
- PostgreSQL included

**Setup**:

1. Sign up at [railway.app](https://railway.app)
2. Create PostgreSQL service
3. Copy connection string
4. Add to Vercel

## Custom Domain

### Vercel

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. Update `BETTER_AUTH_URL` environment variable
5. Update Google OAuth redirect URIs

### DNS Configuration

Add these records to your domain:

```
Type  Name  Value
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

## Environment Variables

### Production Checklist

- [ ] `DATABASE_URL` - Production database
- [ ] `BETTER_AUTH_SECRET` - Strong random secret
- [ ] `BETTER_AUTH_URL` - Production URL
- [ ] `GOOGLE_CLIENT_ID` - OAuth credentials
- [ ] `GOOGLE_CLIENT_SECRET` - OAuth secret
- [ ] `NODE_ENV` - Set to "production"

### Managing Secrets

**Add variable**:

```bash
vercel env add DATABASE_URL production
```

**Pull variables locally**:

```bash
vercel env pull
```

**Update variable**:

```bash
vercel env rm DATABASE_URL production
vercel env add DATABASE_URL production
```

## CI/CD

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Pushes to `main` branch
- **Preview**: Pull requests

### Manual Deployment

```bash
vercel --prod
```

### Deployment Hooks

Add webhook in Vercel dashboard:

1. Go to **Settings** → **Git**
2. Add deployment webhook
3. Trigger deployments programmatically

## Performance Optimization

### Edge Functions

Next.js API routes run on Vercel Edge Network by default.

### Image Optimization

Next.js Image component auto-optimizes images:

```tsx
import Image from 'next/image';

<Image src="/logo.png" width={100} height={100} alt="Logo" />;
```

### Caching

Configure in `next.config.ts`:

```typescript
export default {
  headers: async () => [
    {
      source: '/api/:path*',
      headers: [{ key: 'Cache-Control', value: 'no-store' }],
    },
  ],
};
```

## Monitoring

### Vercel Analytics

Enable in dashboard:

1. Go to **Analytics** tab
2. Enable Web Analytics
3. View real-time metrics

### Error Tracking

**Sentry** (recommended):

```bash
npm install @sentry/nextjs
npx @sentry/wizard nextjs
```

### Logging

Use Vercel's built-in logging:

```bash
vercel logs [deployment-url]
```

## Security

### Environment Variables

- Never commit `.env` to Git
- Use Vercel dashboard for production secrets
- Rotate credentials regularly

### HTTPS

- Automatic with Vercel
- Free SSL certificates
- Force HTTPS redirect

### Rate Limiting

Implement in API routes:

```typescript
// /src/app/api/chat/route.ts
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
});
```

## Troubleshooting

### Build Failures

**Check logs**:

```bash
vercel logs [deployment-url]
```

**Common issues**:

- Missing environment variables
- TypeScript errors
- Database connection timeout

### Runtime Errors

**Enable detailed errors** (development only):

```typescript
// next.config.ts
export default {
  reactStrictMode: true,
  // Other config...
};
```

### Database Connection Issues

**Verify connection**:

```bash
psql $DATABASE_URL -c "SELECT 1"
```

**Connection pooling**:

Use `?pgbouncer=true` for Neon:

```
postgresql://...?pgbouncer=true
```

## Rollback

### Vercel

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **⋯** → **Promote to Production**

### Database Migrations

Rollback with Drizzle:

```bash
npm run db:drop
npm run db:push
```

## Cost Estimation

### Vercel

- **Hobby**: Free (non-commercial)
- **Pro**: $20/month per user
- Includes: Unlimited deployments, analytics, team features

### Database

- **Neon**: Free tier (0.5GB)
- **Supabase**: Free tier (500MB)
- **Vercel Postgres**: Pay-as-you-go (~$0.10/GB)

### AI Costs

User pays with their own API key (BYOK model).

## Related Docs

- [Getting Started](./GETTING_STARTED.md)
- [Architecture](./ARCHITECTURE.md)
- [Development Guide](./DEVELOPMENT.md)
