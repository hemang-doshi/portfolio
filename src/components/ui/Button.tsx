import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

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
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-[length:var(--text-body)] font-semibold tracking-[var(--tracking-body)] transition-[background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5";

const variants: Record<Variant, string> = {
  primary:
    "bg-fuchsia-signal text-canvas shadow-subtle-2 hover:bg-[color-mix(in_srgb,var(--color-fuchsia-signal)_90%,var(--color-aubergine)_10%)]",
  secondary:
    "border border-heather bg-transparent text-aubergine hover:bg-aubergine/[0.05]",
  ghost: "bg-transparent px-2 text-heather hover:text-aubergine",
};

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    withArrow = false,
  } = props;

  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRightIcon size={17} weight="bold" aria-hidden="true" />
      ) : null}
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
    <button
      {...buttonProps}
      className={mergedClassName}
      type={buttonProps.type ?? "button"}
    >
      {content}
    </button>
  );
}
