import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Sorry, the page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-8xl font-extralight tracking-tighter text-foreground">404</h1>
        <div className="w-16 h-px bg-border mx-auto my-6"></div>
        <h2 className="text-3xl font-light text-muted-foreground mb-4 tracking-wide">Page not found</h2>
        <p className="text-muted-foreground font-light text-lg mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 border border-border text-foreground font-light text-sm tracking-wider hover:bg-secondary transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}