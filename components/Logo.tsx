import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  const mark = variant === "dark" ? "#1B3B2B" : "#FDFBF7";
  const word = variant === "dark" ? "#1B3B2B" : "#FDFBF7";
  const sub = variant === "dark" ? "#222222" : "#EFEAE0";

  return (
    <Link
      href="/"
      aria-label="Deccan Resort, home"
      className={`inline-flex items-center ${className}`}
    >
      <svg
        width="176"
        height="38"
        viewBox="0 0 180 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 5H22C27.5 5 31 8.5 31 13.5C31 18.5 27.5 22 22 22H14V35H10V5ZM14 18H21.5C25 18 27 16 27 13.5C27 11 25 9 21.5 9H14V18Z"
          fill={mark}
        />
        <path
          d="M36 24.5C36 27.5 38 29.5 41 29.5C44 29.5 45.5 27.5 45.5 25.5H49.5C49.5 29.5 46 33 41 33C35.5 33 32 29.5 32 24.5C32 19.5 35.5 16 41 16C46.5 16 49.5 19.5 49.5 24.5H36ZM45.5 22.5C45.5 20.5 44 19 41 19C38 19 36.5 20.5 36.5 22.5H45.5Z"
          fill={mark}
        />
        <text
          x="58"
          y="24"
          fontFamily="var(--font-fraunces), Georgia, serif"
          fontSize="14"
          letterSpacing="4"
          fill={word}
        >
          DECCAN
        </text>
        <text
          x="58"
          y="35"
          fontFamily="var(--font-inter), sans-serif"
          fontSize="8"
          letterSpacing="3"
          fill={sub}
        >
          RESORT
        </text>
      </svg>
    </Link>
  );
}
