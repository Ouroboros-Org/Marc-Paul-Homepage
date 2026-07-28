"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type MouseEventHandler,
  type ReactNode
} from "react";
import { track } from "@vercel/analytics";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  LoaderCircle,
  Send,
  X
} from "lucide-react";

type ContactModalContextValue = {
  openContactModal: (location: string) => void;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

const googleForm = {
  action: process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL?.trim() ?? "",
  fields: {
    name: process.env.NEXT_PUBLIC_GOOGLE_FORM_NAME_FIELD?.trim() ?? "",
    email: process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_FIELD?.trim() ?? "",
    organisation: process.env.NEXT_PUBLIC_GOOGLE_FORM_ORGANISATION_FIELD?.trim() ?? "",
    area: process.env.NEXT_PUBLIC_GOOGLE_FORM_AREA_FIELD?.trim() ?? "",
    message: process.env.NEXT_PUBLIC_GOOGLE_FORM_MESSAGE_FIELD?.trim() ?? "",
    timing: process.env.NEXT_PUBLIC_GOOGLE_FORM_TIMING_FIELD?.trim() ?? ""
  }
};

const fieldNames = Object.values(googleForm.fields);
const isGoogleFormConfigured =
  /^https:\/\/docs\.google\.com\/forms\/d\/e\/.+\/formResponse$/.test(googleForm.action) &&
  fieldNames.every((fieldName) => /^entry\.\d+$/.test(fieldName));

const advisoryAreas = [
  "AI strategy and feasibility",
  "Technical product direction",
  "Agentic systems and automation",
  "Emerging-technology advisory",
  "Product and production leadership",
  "Independent technical review",
  "I am not sure yet"
];

const timingOptions = [
  "As soon as practical",
  "Within the next month",
  "Within the next quarter",
  "Exploring for later"
];

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const openerRef = useRef<HTMLElement | null>(null);

  const openContactModal = useCallback((location: string) => {
    openerRef.current = document.activeElement as HTMLElement | null;
    setSource(location);
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    document.body.dataset.contactOpen = isOpen ? "true" : "false";

    if (!isOpen) {
      window.setTimeout(() => openerRef.current?.focus(), 0);
    }

    return () => {
      delete document.body.dataset.contactOpen;
    };
  }, [isOpen]);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactDialog
        isOpen={isOpen}
        source={source}
        onClose={closeContactModal}
      />
    </ContactModalContext.Provider>
  );
}

type ContactButtonProps = {
  className?: string;
  label: string;
  location: string;
  icon?: "arrow-right" | "arrow-up-right";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function ContactButton({
  className,
  label,
  location,
  icon = "arrow-up-right",
  onClick
}: ContactButtonProps) {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("ContactButton must be rendered inside ContactModalProvider.");
  }

  const Icon = icon === "arrow-right" ? ArrowRight : ArrowUpRight;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    track("Contact CTA", { location });
    context.openContactModal(location);
  };

  return (
    <button
      className={className}
      type="button"
      aria-haspopup="dialog"
      aria-controls="contact-dialog"
      onClick={handleClick}
    >
      {label}
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

type ContactDialogProps = {
  isOpen: boolean;
  source: string;
  onClose: () => void;
};

function ContactDialog({ isOpen, source, onClose }: ContactDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submittedRef = useRef(false);
  const submitTimerRef = useRef<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const frameName = useId().replace(/:/g, "");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      setSubmitState("idle");
      submittedRef.current = false;
      formRef.current?.reset();
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(
    () => () => {
      if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    },
    []
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!isGoogleFormConfigured) {
      event.preventDefault();
      setSubmitState("error");
      return;
    }

    submittedRef.current = true;
    setSubmitState("submitting");
    track("Contact Form Submit", { location: source });

    submitTimerRef.current = window.setTimeout(() => {
      if (!submittedRef.current) return;
      submittedRef.current = false;
      setSubmitState("error");
    }, 15000);
  };

  const handleFrameLoad = () => {
    if (!submittedRef.current) return;

    submittedRef.current = false;
    if (submitTimerRef.current) window.clearTimeout(submitTimerRef.current);
    setSubmitState("success");
    formRef.current?.reset();
    track("Contact Form Success", { location: source });
  };

  const resetForm = () => {
    setSubmitState("idle");
    window.requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    });
  };

  return (
    <dialog
      ref={dialogRef}
      id="contact-dialog"
      className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      aria-describedby="contact-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="contact-dialog-scroll">
        <header className="contact-dialog-header">
          <div>
            <p className="contact-dialog-kicker">
              <span aria-hidden="true" /> New enquiry
            </p>
            <h2 id="contact-dialog-title">What are you trying to decide?</h2>
            <p id="contact-dialog-description">
              A rough brief is enough. Share the situation, the difficult decision and what a useful
              next step would look like.
            </p>
          </div>
          <button
            className="contact-dialog-close"
            type="button"
            aria-label="Close contact form"
            onClick={onClose}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        {submitState === "success" ? (
          <div className="contact-form-success" role="status" aria-live="polite">
            <span className="contact-form-success-icon" aria-hidden="true">
              <Check size={28} strokeWidth={1.8} />
            </span>
            <p className="contact-dialog-kicker">Message received</p>
            <h3>Thank you. Your note is in.</h3>
            <p>
              I will read the context you sent and reply with an honest view of whether I can help.
            </p>
            <div className="contact-form-success-actions">
              <button className="button button-contact-primary" type="button" onClick={onClose}>
                Close
              </button>
              <button className="button button-contact-secondary" type="button" onClick={resetForm}>
                Send another note
              </button>
            </div>
          </div>
        ) : (
          <form
            ref={formRef}
            className="contact-form"
            action={isGoogleFormConfigured ? googleForm.action : undefined}
            method="post"
            target={frameName}
            onSubmit={handleSubmit}
          >
            <div className="contact-form-grid">
              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name={googleForm.fields.name}
                  type="text"
                  autoComplete="name"
                  maxLength={120}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Work email</label>
                <input
                  id="contact-email"
                  name={googleForm.fields.email}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={180}
                  required
                />
              </div>

              <div className="form-field form-field-wide">
                <label htmlFor="contact-organisation">
                  Organisation <span>Optional</span>
                </label>
                <input
                  id="contact-organisation"
                  name={googleForm.fields.organisation}
                  type="text"
                  autoComplete="organization"
                  maxLength={160}
                />
              </div>

              <div className="form-field form-field-wide">
                <label htmlFor="contact-area">What would you like help with?</label>
                <select id="contact-area" name={googleForm.fields.area} defaultValue="" required>
                  <option value="" disabled>
                    Choose the closest fit
                  </option>
                  {advisoryAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field form-field-wide">
                <label htmlFor="contact-message">What is the decision or challenge?</label>
                <textarea
                  id="contact-message"
                  name={googleForm.fields.message}
                  rows={5}
                  minLength={20}
                  maxLength={3000}
                  aria-describedby="contact-message-hint"
                  required
                />
                <p id="contact-message-hint" className="form-hint">
                  Include useful context, constraints and what has already been tried.
                </p>
              </div>

              <div className="form-field form-field-wide">
                <label htmlFor="contact-timing">
                  Timing <span>Optional</span>
                </label>
                <select id="contact-timing" name={googleForm.fields.timing} defaultValue="">
                  <option value="">No fixed timing</option>
                  {timingOptions.map((timing) => (
                    <option key={timing} value={timing}>
                      {timing}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {submitState === "error" && (
              <p className="contact-form-error" role="alert">
                The form could not be sent just now. Please close this window and use the direct
                email in the contact section.
              </p>
            )}

            <div className="contact-form-footer">
              <p>Submitted securely via Google Forms. Your details are used only to reply.</p>
              <button
                className="button button-contact-primary"
                type="submit"
                disabled={submitState === "submitting"}
              >
                {submitState === "submitting" ? (
                  <>
                    Sending
                    <LoaderCircle className="form-spinner" size={18} aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send project note
                    <Send size={17} aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        <iframe
          className="contact-form-target"
          name={frameName}
          title="Contact form submission"
          aria-hidden="true"
          tabIndex={-1}
          onLoad={handleFrameLoad}
        />
      </div>
    </dialog>
  );
}
