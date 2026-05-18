import { GradientText } from "./GradientText";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
}

export function PageHero({ eyebrow, title, titleHighlight, description }: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {title}{" "}
          {titleHighlight && <GradientText>{titleHighlight}</GradientText>}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
