interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 mb-3.5 ${isCenter ? "justify-center" : ""}`}>
          <span className={`w-6 h-px ${light ? "bg-sand-light/50" : "bg-sand-dark/60"}`} />
          <p
            className={`text-[11px] tracking-ultra uppercase font-medium ${
              light ? "text-sand-light" : "text-sand-dark"
            }`}
          >
            {eyebrow}
          </p>
          {isCenter && (
            <span className={`w-6 h-px ${light ? "bg-sand-light/50" : "bg-sand-dark/60"}`} />
          )}
        </div>
      )}

      <h2
        className={`font-display text-3xl sm:text-4xl md:text-5xl tracking-tight leading-[1.15] text-balance ${
          light ? "text-cream" : "text-forest"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-base sm:text-lg leading-relaxed text-balance ${
            light ? "text-cream/80" : "text-charcoal/70"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
