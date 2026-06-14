import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  withArrow?: boolean;
};

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonProps = AnchorProps | NativeButtonProps;

const baseClassName =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-3xl)] px-5 py-3 text-[length:var(--text-body)] font-[480] tracking-[0.01em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary:
    "bg-mercury-blue text-pure-white hover:bg-[color-mix(in_srgb,var(--color-mercury-blue)_88%,var(--color-pure-white)_12%)]",
  secondary:
    "border border-lead/30 bg-graphite/35 text-starlight hover:bg-graphite/55",
  ghost: "bg-transparent text-silver hover:text-starlight",
};

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary", withArrow = false } = props;

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
    </>
  );

  const mergedClassName = cn(baseClassName, variants[variant], className);

  if ("href" in props) {
    const anchorProps = { ...props } as AnchorProps;
    delete anchorProps.children;
    delete anchorProps.className;
    delete anchorProps.variant;
    delete anchorProps.withArrow;

    return (
      <a className={mergedClassName} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = { ...props } as NativeButtonProps;
  delete buttonProps.children;
  delete buttonProps.className;
  delete buttonProps.variant;
  delete buttonProps.withArrow;

  return (
    <button {...buttonProps} className={mergedClassName} type={buttonProps.type ?? "button"}>
      {content}
    </button>
  );
}
