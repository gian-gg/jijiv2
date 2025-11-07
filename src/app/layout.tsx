import { Toaster } from 'sonner';
import type { Metadata } from 'next';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'jiji',
  description: 'Yet another finance app, this time with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background flex min-h-screen min-w-screen flex-col items-center justify-center overflow-hidden antialiased">
        <>
          {/* Background effects */}
          <div className="gradient-purple-mesh pointer-events-none absolute inset-0 opacity-50" />
          <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-40" />
          <div className="to-background pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent" />

          {/* Decorative elements */}
          <div className="border-primary/10 pointer-events-none absolute top-20 left-10 h-32 w-32 border" />
          <div className="border-primary/10 pointer-events-none absolute right-10 bottom-20 h-24 w-24 border" />
        </>

        <div className="relative z-10 flex min-h-screen min-w-screen flex-col items-center justify-center overflow-hidden p-2 md:p-6">
          {children}
        </div>
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
