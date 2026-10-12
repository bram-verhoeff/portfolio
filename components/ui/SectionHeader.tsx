import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <div
        className={cn(
          "inline-flex items-center gap-2.5 text-[0.78rem] font-bold tracking-[0.16em] uppercase mb-3",
          dark ? "text-[#00b4ff]" : "text-[#0077b6]"
        )}
      >
        <span
          className={cn(
            "w-6 h-[2px]",
            dark ? "bg-[#00b4ff]" : "bg-[#0077b6]"
          )}
        />
        {label}
      </div>
      <h2
        className={cn(
          "font-display text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-[-0.01em] leading-[1.1] mb-3 whitespace-pre-line",
          dark ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base md:text-lg leading-relaxed max-w-xl",
            dark ? "text-white/60" : "text-muted"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
