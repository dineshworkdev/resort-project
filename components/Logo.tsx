import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /**
   * - "wordmark": DR monogram icon on left + "DECCAN RESORT" hotel wordmark on right (used for Header)
   * - "footer": Full stacked logo housed inside an elegant warm off-white/cream badge with subtle padding
   * - "full": Bare full logo image
   * - "icon": DR crest monogram icon only
   */
  variant?: "wordmark" | "footer" | "full" | "icon";
  /**
   * "light": Over dark backgrounds (e.g. transparent hero header)
   * "dark": Over light/cream backgrounds (e.g. scrolled navbar)
   */
  theme?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "wordmark",
  theme = "dark",
  className = "",
  priority = false,
}: LogoProps) {
  const isLight = theme === "light";

  return (
    <Link
      href="/"
      aria-label="Deccan Resort — Return to Home"
      className={`inline-flex items-center transition-opacity hover:opacity-95 group ${className}`}
    >
      {/* 1. Header Wordmark: DR monogram on left + DECCAN RESORT text on right */}
      {variant === "wordmark" && (
        <div className="flex items-center gap-3 sm:gap-3.5">
          {/* DR Monogram Icon */}
          <div className="relative h-10 sm:h-11 w-auto aspect-[1351/1164] shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo/logo-icon.png"
              alt="Deccan Resort Monogram"
              width={1351}
              height={1164}
              priority={priority}
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Premium Hotel Wordmark */}
          <div className="flex flex-col justify-center text-left select-none">
            <span
              className={`font-display text-lg sm:text-xl font-medium tracking-[0.22em] leading-none transition-colors duration-300 ${
                isLight ? "text-cream" : "text-forest"
              }`}
            >
              DECCAN
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`font-body text-[8.5px] sm:text-[9.5px] font-medium tracking-[0.38em] uppercase leading-none transition-colors duration-300 ${
                  isLight ? "text-sand-light" : "text-sand-dark"
                }`}
              >
                RESORT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Footer Badge: Full logo inside a refined subtle warm off-white/cream container */}
      {variant === "footer" && (
        <div className="inline-flex items-center justify-center bg-[#FDFBF7] p-3 sm:p-3.5 rounded-xl border border-sand/30 shadow-md transition-transform duration-300 group-hover:shadow-lg group-hover:scale-[1.02]">
          <div className="relative h-14 sm:h-16 w-auto aspect-[3/2] flex items-center">
            <Image
              src="/images/logo/logo.png"
              alt="Deccan Resort"
              width={1536}
              height={1024}
              priority={priority}
              className="h-full w-auto object-contain"
            />
          </div>
        </div>
      )}

      {/* 3. Bare Full Logo */}
      {variant === "full" && (
        <div className="relative h-14 sm:h-16 w-auto aspect-[3/2] flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="Deccan Resort"
            width={1536}
            height={1024}
            priority={priority}
            className="h-full w-auto object-contain"
          />
        </div>
      )}

      {/* 4. Icon only */}
      {variant === "icon" && (
        <div className="relative h-10 w-auto aspect-[1351/1164] flex items-center">
          <Image
            src="/images/logo/logo-icon.png"
            alt="Deccan Resort Monogram"
            width={1351}
            height={1164}
            priority={priority}
            className="h-full w-auto object-contain"
          />
        </div>
      )}
    </Link>
  );
}
