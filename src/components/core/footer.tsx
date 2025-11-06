import Link from 'next/link';
import React from 'react';
import MadeWith from './made-with';

const links = [
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Privacy Policy' },
];

const Footer = () => {
  return (
    <footer className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t px-6 py-6 backdrop-blur">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <MadeWith />
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors focus:underline focus:outline-none"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
