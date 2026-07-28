import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonIconPosition = "start" | "end";

type SharedButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: ButtonIconPosition;
  variant?: ButtonVariant;
  className?: string;
  ariaLabel?: string;
  isCta?: boolean;
};

type ButtonLinkProps = SharedButtonProps & {
  href: string;
  external?: boolean;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type ButtonNativeProps = SharedButtonProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

function hasExternalProtocol(href: string) {
  return href.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(href);
}

function isLinkButton(props: ButtonProps): props is ButtonLinkProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const {
    children,
    icon,
    iconPosition = "end",
    variant = "primary",
    className,
    ariaLabel,
    isCta = false
  } = props;
  const buttonClass = isCta ? 'cta-button' : 'button';
  const classes = [buttonClass, `${buttonClass}--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className={`${buttonClass}-shadow`} aria-hidden="true" />
      <span className={`${buttonClass}-content`}>
        {icon && iconPosition === "start" ? (
          <span className={`${buttonClass}-icon ${buttonClass}-icon--start`} aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span className={`${buttonClass}-label`}>{children}</span>
        {icon && iconPosition === "end" ? (
          <span className={`${buttonClass}-icon ${buttonClass}-icon--end`} aria-hidden="true">
            {icon}
          </span>
        ) : null}
      </span>
    </>
  );

  if (isLinkButton(props)) {
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
