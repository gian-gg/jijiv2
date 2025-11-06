import React from 'react';
import Link from 'next/link';
import ROUTES from '@/constants/ROUTES';

const MadeWith = () => {
  return (
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
      made with <span className="text-primary">♥</span> by{' '}
      <Link href={ROUTES.GITHUB} target="_blank" rel="noreferrer">
        gian.gg
      </Link>
    </div>
  );
};

export default MadeWith;
