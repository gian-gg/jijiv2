import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ROUTES from '@/constants/ROUTES';

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm">
            Last updated: January 2026
          </p>
        </div>

        {/* Content */}
        <div className="bg-card border-border space-y-6 border p-6 text-sm leading-relaxed">
          <section>
            <h2 className="mb-3 text-lg font-bold">Data Collection</h2>
            <p className="text-muted-foreground">
              jijiv2 is a proof of concept application. We collect minimal data
              necessary for authentication and application functionality:
            </p>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
              <li>
                Google account information (email, name) for authentication
              </li>
              <li>Transaction data you manually enter into the application</li>
              <li>AI query history to provide insights</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Data Storage</h2>
            <p className="text-muted-foreground">
              Your transaction data is stored in our database. Your API keys
              (OpenRouter or Gemini) are stored locally in your browser and
              never transmitted to our servers.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">API Keys</h2>
            <p className="text-muted-foreground">
              When you provide your own API keys (BYOK - Bring Your Own Key),
              these keys are:
            </p>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
              <li>Stored only in your browser&apos;s local storage</li>
              <li>Never sent to our servers</li>
              <li>
                Used directly to communicate with OpenRouter or Gemini APIs
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use the following third-party services:
            </p>
            <ul className="text-muted-foreground mt-2 list-inside list-disc space-y-1">
              <li>Google OAuth for authentication</li>
              <li>OpenRouter and/or Gemini APIs (using your provided keys)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Contact</h2>
            <p className="text-muted-foreground">
              For questions about this privacy policy, please contact us via{' '}
              <a
                href={ROUTES.EXTERNAL.GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              .
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
