import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ROUTES from '@/constants/ROUTES';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            About jijiv2
          </h1>
          <p className="text-muted-foreground text-sm">
            Your AI-powered financial co-pilot
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border-border space-y-6 border p-6 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-lg font-bold">What is jijiv2?</h2>
            <p className="text-muted-foreground">
              jijiv2 is a proof of concept application that demonstrates
              AI-powered financial tracking and analysis. Query your expenses
              using natural language and get instant insights from your
              transaction history.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Why Login is Required</h2>
            <p className="text-muted-foreground mb-2">
              Authentication is required to:
            </p>
            <ul className="text-muted-foreground list-inside list-disc space-y-1">
              <li>Associate your transaction data with your account</li>
              <li>Provide a personalized experience across devices</li>
              <li>Ensure data security and privacy</li>
              <li>Enable AI features that require user context</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">
              What Happens When You Login
            </h2>
            <p className="text-muted-foreground mb-2">
              When you sign in with Google:
            </p>
            <ol className="text-muted-foreground list-inside list-decimal space-y-1">
              <li>We receive your basic profile information (name, email)</li>
              <li>A user account is created in our database</li>
              <li>You can start adding transactions and querying with AI</li>
              <li>Your data persists across sessions</li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">
              Bring Your Own Key (BYOK)
            </h2>
            <p className="text-muted-foreground">
              To use AI features, you&apos;ll need to provide your own API key
              from OpenRouter or Gemini. This ensures:
            </p>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
              <li>You control and pay for your own AI usage</li>
              <li>
                Your API keys remain private (stored only in your browser)
              </li>
              <li>Full transparency over AI costs</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Open Source</h2>
            <p className="text-muted-foreground">
              jijiv2 is 100% open source and available on{' '}
              <a
                href={ROUTES.EXTERNAL.GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              . You can inspect the code, contribute, or deploy your own
              instance.
            </p>
          </section>
        </div>

        {/* Back button */}
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href={ROUTES.ROOT}>← Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
