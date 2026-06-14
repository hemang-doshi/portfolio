import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="display-heading text-[length:clamp(2.25rem,6vw,var(--text-heading-lg))] leading-[var(--leading-heading-lg)] tracking-[var(--tracking-heading-lg)] text-aubergine">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[length:var(--text-subheading)] leading-[var(--leading-subheading)] tracking-[var(--tracking-subheading)] text-heather",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
