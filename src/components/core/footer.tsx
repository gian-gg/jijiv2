import React from 'react';

const links = [
  { href: '#', label: 'About' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Privacy Policy' },
];

const Footer = () => {
  return (
    <footer className="bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t px-6 py-4 backdrop-blur">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col md:flex-row md:items-center">
          <span className="text-base font-semibold">
            &copy; {new Date().getFullYear()} Your Company
          </span>
          <span className="ml-0 text-sm text-gray-400 md:ml-2">
            All rights reserved.
          </span>
        </div>
        <nav aria-label="Footer Navigation">
          <ul className="flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-white focus:underline focus:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
