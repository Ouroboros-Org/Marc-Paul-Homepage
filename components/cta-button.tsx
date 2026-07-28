import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type CtaButtonVariant = "primary" | "secondary";
type CtaButtonIconPosition = "start" | "end";

type SharedCtaButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: CtaButtonIconPosition;
  variant?: CtaButtonVariant;
  className?: string;
  ariaLabel?: string;
};

type CtaButtonLinkProps = SharedCtaButtonProps & {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type CtaButtonNativeProps = SharedCtaButtonProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type CtaButtonProps = CtaButtonLinkProps | CtaButtonNativeProps;

function hasExternalProtocol(href: string) {
  return href.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(href);
}

function isLinkCtaButton(props: CtaButtonProps): props is CtaButtonLinkProps {
  return typeof props.href === "string";
}

export function CtaButton(props: CtaButtonProps) {
  const {
    children,
    icon,
    iconPosition = "end",
    variant = "primary",
    className,
    ariaLabel
  } = props;
  const classes = ["cta-button", `cta-button--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="cta-button-shadow" aria-hidden="true" />
      <span className="cta-button-content">
        {icon && iconPosition === "start" ? (
          <span className="cta-button-icon cta-button-icon--start" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className="cta-button-label">{children}</span>
        {icon && iconPosition === "end" ? (
          <span className="cta-button-icon cta-button-icon--end" aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </span>
    </>
  );

  if (isLinkCtaButton(props)) {
    if (props.external || hasExternalProtocol(props.href)) {
      return (
        <a className={classes} href={props.href} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }

    return (
      <Link className={classes} href={props.href} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
