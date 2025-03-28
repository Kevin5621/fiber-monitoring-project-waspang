export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="relative w-12 h-12 mb-8 mx-auto">
          <div className="absolute inset-0 border-2 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
        </div>
        <h2 className="text-3xl font-light text-foreground mb-4 tracking-wide">Loading</h2>
        <p className="text-muted-foreground font-light text-lg mb-8 leading-relaxed">
          Please wait while we prepare your content.
        </p>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-muted-foreground text-sm font-light tracking-wider">
          © {new Date().getFullYear()} Fiber Track Pro
        </p>
      </div>
    </div>
  );
}