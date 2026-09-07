import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center">
      <div className="container-content py-32 text-center">
        <p className="text-sand-dark text-sm mb-4">404</p>
        <h1 className="font-display text-4xl md:text-5xl text-forest text-balance">
          This page has wandered off the trail
        </h1>
        <p className="mt-5 text-charcoal/70 max-w-md mx-auto">
          The page you're looking for doesn't exist. Here are a few places to
          start instead.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3.5 bg-forest text-cream text-sm rounded-lg hover:bg-forest-dark transition-colors duration-200"
          >
            Return home
          </Link>
          <Link
            href="/stay"
            className="inline-flex items-center px-8 py-3.5 border border-charcoal/20 text-charcoal text-sm rounded-lg hover:border-forest hover:text-forest transition-colors duration-200"
          >
            View rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
