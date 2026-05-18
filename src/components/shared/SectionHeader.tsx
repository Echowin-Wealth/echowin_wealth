import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  center = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && "text-center", "space-y-4", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}{" "}
        {titleHighlight && <GradientText>{titleHighlight}</GradientText>}
      </h2>
      {description && (
        <p
          className={cn(
            "text-lg text-muted-foreground leading-relaxed",
            center && "max-w-2xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
