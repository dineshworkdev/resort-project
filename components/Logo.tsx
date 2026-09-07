import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /**
   * - "full": Full DECCAN RESORT logo asset (logo.png)
   * - "icon": DR crest mark icon asset (logo-icon.png)
   * - "mark-text": DR crest icon followed by styled editorial resort name text
   * - "responsive": Full logo on desktop (lg+), icon + editorial text on compact/mobile screens
   */
  variant?: "full" | "icon" | "mark-text" | "responsive";
  /**
   * "light": Over dark backgrounds (e.g. hero overlay, footer)
   * "dark": Over light/cream backgrounds (e.g. solid scrolled navbar)
   * "auto": Inherits context or adapts naturally
   */
  theme?: "light" | "dark" | "auto";
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "responsive",
  theme = "dark",
  className = "",
  priority = false,
}: LogoProps) {
  const isLight = theme === "light";

  // Filter adjustment for dark backgrounds so the deep forest green lettering maintains crisp contrast
  const logoFilter = isLight
    ? "brightness-[1.25] contrast-[1.05] drop-shadow-[0_2px_8px_rgba(200,162,123,0.25)]"
    : "";

  return (
    <Link
      href="/"
      aria-label="Deccan Resort — Return to Home"
      className={`inline-flex items-center transition-opacity hover:opacity-95 ${className}`}
    >
      {variant === "full" && (
        <div className="relative h-14 sm:h-16 w-auto aspect-[3/2] flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Deccan Resort"
            width={1536}
            height={1024}
            priority={priority}
            className={`h-full w-auto object-contain transition-all duration-300 ${logoFilter}`}
          />
        </div>
      )}

      {variant === "icon" && (
        <div className="relative h-10 w-auto aspect-[1351/1164] flex items-center">
          <Image
            src="/images/logo/logo-icon.png"
            alt="Deccan Resort Crest"
            width={1351}
            height={1164}
            priority={priority}
            className="h-full w-auto object-contain"
          />
        </div>
      )}

      {variant === "mark-text" && (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-auto aspect-[1351/1164] shrink-0">
            <Image
              src="/images/logo/logo-icon.png"
              alt="Deccan Resort Icon"
              width={1351}
              height={1164}
              priority={priority}
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span
              className={`font-display text-base tracking-[0.22em] font-medium transition-colors ${
                isLight ? "text-cream" : "text-forest"
              }`}
            >
              DECCAN
            </span>
            <span
              className={`font-body text-[8.5px] tracking-[0.32em] font-normal mt-1 transition-colors ${
                isLight ? "text-sand-light" : "text-sand-dark"
              }`}
            >
              RESORT
            </span>
          </div>
        </div>
      )}

      {variant === "responsive" && (
        <>
          {/* Desktop view: Full official logo */}
          <div className="hidden lg:flex items-center h-14 xl:h-16 w-auto aspect-[3/2]">
            <Image
              src="/images/logo/logo.png"
              alt="Deccan Resort"
              width={1536}
              height={1024}
              priority={priority}
              className={`h-full w-auto object-contain transition-all duration-300 ${logoFilter}`}
            />
          </div>

          {/* Compact / Mobile view: Official Logo Icon + DECCAN RESORT editorial text */}
          <div className="flex lg:hidden items-center gap-2.5">
            <div className="relative h-9 w-auto aspect-[1351/1164] shrink-0">
              <Image
                src="/images/logo/logo-icon.png"
                alt="Deccan Resort Icon"
                width={1351}
                height={1164}
                priority={priority}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span
                className={`font-display text-sm tracking-[0.22em] font-medium transition-colors ${
                  isLight ? "text-cream" : "text-forest"
                }`}
              >
                DECCAN
              </span>
              <span
                className={`font-body text-[8px] tracking-[0.32em] font-normal mt-1 transition-colors ${
                  isLight ? "text-sand-light" : "text-sand-dark"
                }`}
              >
                RESORT
              </span>
            </div>
          </div>
        </>
      )}
    </Link>
  );
}
