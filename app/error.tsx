'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl font-extralight tracking-tighter text-foreground">Error</h1>
        <div className="w-16 h-px bg-border mx-auto my-6"></div>
        <h2 className="text-3xl font-light text-foreground mb-4 tracking-wide">Something went wrong</h2>
        <p className="text-muted-foreground font-light text-lg mb-8 leading-relaxed">
          We apologize for the inconvenience. Please try again later.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 border border-input text-foreground font-light text-sm tracking-wider hover:bg-accent transition-colors duration-200"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-input text-foreground font-light text-sm tracking-wider hover:bg-accent transition-colors duration-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}