import React from 'react';
import { cn } from '../../../shared/lib/utils';

export function GridBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative w-full bg-[#1a1d2e] grid-backdrop',
        className,
      )}
    >
      <style>{`.grid-backdrop #about, .grid-backdrop #team { background: transparent !important; }`}</style>
      <div
        className={cn(
          'absolute inset-0 pointer-events-none',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,rgba(139,126,230,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,126,230,0.04)_1px,transparent_1px)]',
          '[mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_50%,transparent_100%)]',
          '[-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_50%,transparent_100%)]',
        )}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
