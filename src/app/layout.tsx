import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'jijiv2',
  description: 'Yet another finance app, this time with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background min-h-screen antialiased">
        {children}
        <Toaster
          theme="dark"
          richColors
          toastOptions={{
            style: {
              background: 'oklch(0.2 0 0)',
              border: '1px solid oklch(0.3 0 0)',
              borderRadius: '0',
              color: 'oklch(0.98 0.01 270)',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '0.875rem',
            },
            className: 'toast-brutalist',
          }}
          position="bottom-right"
        />
      </body>
    </html>
  );
}
