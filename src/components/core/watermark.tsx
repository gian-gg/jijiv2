import React from 'react';
import Link from 'next/link';
import ROUTES from '@/constants/ROUTES';

const MadeWith = () => {
  return (
    <div className="text-muted-foreground group text-center text-xs text-balance">
      made with{' '}
      <span className="text-primary inline-block transition-transform group-hover:scale-125">
        ♥
      </span>{' '}
      by{' '}
      <Link
        href={ROUTES.GITHUB}
        target="_blank"
        rel="noreferrer"
        className="text-foreground hover:text-primary font-medium underline underline-offset-4 transition-colors"
      >
        gian.gg
      </Link>
    </div>
  );
};

export default MadeWith;
